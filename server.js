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

// URL za HairFastGAN Space
const HF_API_URL = "https://airi-institute-hairfastgan.hf.space/api/predict"; 

// Konfiguracija Multera za prihvat VIŠE FAJLOVA
const imageFields = [
    { name: 'source', maxCount: 1 }, 
    { name: 'shape', maxCount: 1 },  
    { name: 'color', maxCount: 1 }   
];
const upload = multer({ dest: 'uploads/' });

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

// 🚨 ISPRAVKA 1: Vraća "" umjesto null za nepostojeće fajlove
const fileToBase64 = (file) => {
    if (!file || !file.path) return ""; 
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
    
    if (!source || source.length === 0 || (!shape && !color)) {
        return res.status(400).json({ error: 'Potrebna je slika lica (Source) i barem slika oblika (Shape) ili slika boje (Color).' });
    }

    // Pretvorba fajlova u Base64 (koristeći ispravljenu funkciju koja vraća "")
    const faceBase64 = fileToBase64(source[0]);
    const shapeBase64 = shape && shape.length > 0 ? fileToBase64(shape[0]) : "";
    const colorBase64 = color && color.length > 0 ? fileToBase64(color[0]) : "";

    // Polje privremenih fajlova za čišćenje
    const tempFilesToClean = [source[0].path];
    if (shape && shape.length > 0) tempFilesToClean.push(shape[0].path);
    if (color && color.length > 0) tempFilesToClean.push(color[0].path);

    try {
        const gradioPayload = {
            "fn_name": "swap_hair", 
            "data": [
                faceBase64,
                shapeBase64,
                colorBase64,
                'Article',  
                0,          
                15,         
            ],
            "session_hash": "gradio_session_" + Math.random().toString(36).substring(2, 10) 
        };
        
        // 3. SLANJE NA HUGGING FACE GRADIO API
        const hfResponse = await axios.post(HF_API_URL, gradioPayload, {
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            // responseType: 'arraybuffer' je UKLONJEN jer očekujemo JSON
            timeout: 60000 
        });

        // 🚨 ISPRAVKA 2: Vađenje Base64 stringa iz JSON odgovora
        // Gradio API vraća Base64 string unutar JSON objekta
        const resultData = hfResponse.data.data[0];
        // Base64 slika je u "data" polju, a Gradio je već formatirao (data:image/...)
        const finalImageBase64 = resultData && resultData.data ? resultData.data : null; 

        if (!finalImageBase64) {
            throw new Error('Gradio API nije vratio Base64 sliku u očekivanom formatu.');
        }
        
        // 5. VRAĆANJE REZULTATA KLIJENTU
        res.json({
            status: "Uspješno generirano!",
            slika_base64: finalImageBase64 
        });

    } catch (error) {
        // Detaljnije logiranje za 500 grešku
        let errorDetails = "Internal Server Error";
        if (error.response && error.response.data) {
             // Ako je error.response.data JSON (npr. Gradio greška), prikaži ga
             errorDetails = JSON.stringify(error.response.data);
        } else if (error.message) {
            errorDetails = error.message;
        }

        console.error("HF Error:", errorDetails);
        
        res.status(500).json({ 
            error: 'Greška pri obradi frizure na Hugging Face API-ju.',
            detalji: errorDetails
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
