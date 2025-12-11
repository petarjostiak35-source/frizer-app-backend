const express = require('express');
const multer = require('multer'); 
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();

// =========================================================
// 1. KONFIGURACIJA
// =========================================================

const PORT = process.env.PORT || 3000; 
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// 🚨 NOVI ISPRAVLJENI URL: Za HairFastGAN Space
const HF_API_URL = "https://airi-institute-hairfastgan.hf.space/api/predict"; 

// Konfiguracija Multera za prihvat VIŠE FAJLOVA
const imageFields = [
    { name: 'source', maxCount: 1 }, // Glavna slika lica (OBAVEZNA)
    { name: 'shape', maxCount: 1 },  // Slika za oblik frizure (OPCIONALNA)
    { name: 'color', maxCount: 1 }   // Slika za boju kose (OPCIONALNA)
];
const upload = multer({ dest: 'uploads/' });

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

// Funkcija za konverziju fajla u Base64 (potrebno za Gradio API)
const fileToBase64 = (file) => {
    if (!file || !file.path) return null;
    const fileContent = fs.readFileSync(file.path);
    const mimeType = file.mimetype;
    return `data:${mimeType};base64,${fileContent.toString('base64')}`;
};

// =========================================================
// 3. API RUTA: Procesiranje frizure
// =========================================================

app.post('/procesiraj-frizuru', upload.fields(imageFields), async (req, res) => {
    
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru.' });
    }

    const { source, shape, color } = req.files;
    
    // Provjera MINIMALNOG uvjeta: Potrebno je LICE i BAREM JEDNA od frizura/boja.
    if (!source || source.length === 0 || (!shape && !color)) {
        return res.status(400).json({ error: 'Potrebna je slika lica (Source) i barem slika oblika (Shape) ili slika boje (Color).' });
    }

    // Pretvorba fajlova u Base64 (ako postoje)
    const faceBase64 = fileToBase64(source[0]);
    const shapeBase64 = shape && shape.length > 0 ? fileToBase64(shape[0]) : null;
    const colorBase64 = color && color.length > 0 ? fileToBase64(color[0]) : null;

    // Polje privremenih fajlova za čišćenje
    const tempFilesToClean = [source[0].path];
    if (shape && shape.length > 0) tempFilesToClean.push(shape[0].path);
    if (color && color.length > 0) tempFilesToClean.push(color[0].path);

    try {
        // 2. PRIPREMA JSON PAYLOAD-A (Gradio Format za funkciju swap_hair)
        const gradioPayload = {
            "fn_name": "swap_hair", // 👈 NOVA FUNKCIJA
            "data": [
                faceBase64,
                shapeBase64,
                colorBase64,
                'Article',  // 4. blending (Default)
                0,          // 5. poisson_iters (Default)
                15,         // 6. poisson_erosion (Default)
            ],
            "session_hash": "gradio_session_" + Math.random().toString(36).substring(2, 10) 
        };
        
        // 3. SLANJE NA HUGGING FACE GRADIO API
        const hfResponse = await axios.post(HF_API_URL, gradioPayload, {
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer', // API vraća sliku, ne JSON!
            timeout: 60000 // 60 sekundi za procesiranje slike
        });

        // 4. PRIMANJE REZULTATA (slika, ne video)
        const mimeType = hfResponse.headers['content-type'] || 'image/png';
        const base64Image = Buffer.from(hfResponse.data, 'binary').toString('base64');
        
        // 5. VRAĆANJE REZULTATA KLIJENTU
        res.json({
            status: "Uspješno generirano!",
            slika_base64: `data:${mimeType};base64,${base64Image}` // Format za prikaz
        });

    } catch (error) {
        console.error("HF Error:", error.response ? error.response.data.toString() : error.message);
        res.status(500).json({ 
            error: 'Greška pri obradi frizure na Hugging Face API-ju.',
            detalji: error.response ? error.response.data.toString() : error.message 
        });
        
    } finally {
        // 6. ČIŠĆENJE: Brisanje svih privremenih fajlova
        tempFilesToClean.forEach(fPath => {
             try { fs.unlinkSync(fPath); } catch (e) {}
        });
    }
});


// RUTA: Glavna ruta - Poslužuje HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =========================================================
// 4. POKRETANJE SERVERA
// =========================================================
app.listen(PORT, () => {
    console.log(`Server sluša na portu ${PORT}`);
});
