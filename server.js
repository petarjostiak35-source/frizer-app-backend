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

// KLJUČNO: Token se čita iz Environment Variables (postavljeno na Renderu)
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// URL vašeg Wan2.2 I2V Gradio Space API endpointa
const HF_API_URL = "https://obsxrver-wan2-2-i2v-lora-demo.hf.space/run/generate_video"; 

// Konfiguracija Multera za privremeno spremanje u folder 'uploads'
const upload = multer({ dest: 'uploads/' });

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

// Posluživanje statičnih datoteka iz 'public' mape (za HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware za pariranje JSON body-a (ako zatreba)
app.use(express.json()); 

// =========================================================
// 3. API RUTE
// =========================================================

// RUTA 1: Procesiranje videa (Proxy za Hugging Face)
app.post('/procesiraj-video', upload.single('slika'), async (req, res) => {
    
    // Provjera autorizacije
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru. Neophodan je za pristup API-ju.' });
    }

    const fajl = req.file;   
    const prompt = req.body.prompt; // Tekstualni opis iz forme

    if (!fajl || !prompt) {
        // Ako nedostaju podaci, šaljemo 400 Bad Request
        return res.status(400).json({ error: 'Potrebna je slika i prompt za generiranje videa.' });
    }

    try {
        // 1. Čitanje i konverzija slike u Base64 (Format koji Gradio API očekuje)
        const fileContent = fs.readFileSync(fajl.path).toString('base64');
        const mimeType = fajl.mimetype;
        const base64Image = `data:${mimeType};base64,${fileContent}`;
        
        // 2. PRIPREMA JSON PAYLOAD-A (Gradio Format)
        // Redoslijed u nizu 'data' mora pratiti redoslijed inputa u 'generate_video' funkciji!
        const gradioPayload = {
            data: [
                base64Image,                        // 1. input_image (Base64)
                prompt,                             // 2. prompt
                6,                                  // 3. steps (Default)
                "",                                 // 4. negative_prompt (Prazno ili s default vrijednošću ako je želite poslati)
                4.0,                                // 5. duration_seconds
                1,                                  // 6. guidance_scale
                1,                                  // 7. guidance_scale_2
                42,                                 // 8. seed
                true,                               // 9. randomize_seed
            ]
        };
        
        // 3. SLANJE NA HUGGING FACE GRADIO API
        const hfResponse = await axios.post(HF_API_URL, gradioPayload, {
            headers: {
                // 🚨 KLJUČNO: Autorizacija s vašim tokenom (za Rate Limit)
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            timeout: 180000 // 3 minute timeout zbog složenosti generiranja videa
        });

        // 4. PRIMANJE REZULTATA
        // Gradio vraća JSON. data[0] je URL do videa, data[1] je seed.
        const video_url = hfResponse.data.data[0];
        const seed_used = hfResponse.data.data[1];
        
        // 5. VRAĆANJE REZULTATA KLIJENTU
        res.json({
            status: "Uspješno generirano! Video je spreman.",
            video_url: video_url, // URL na kojem je video hostan
            seed: seed_used
        });

    } catch (error) {
        // Logiranje greške
        console.error("HF Error:", error.response ? error.response.data : error.message);
        
        // Slanje poruke o grešci natrag klijentu
        res.status(500).json({ 
            error: 'Generiranje videa nije uspjelo.',
            detalji: (error.response && error.response.data) ? error.response.data.error || JSON.stringify(error.response.data) : error.message 
        });
        
    } finally {
        // 6. ČIŠĆENJE: Brisanje privremene slike
        try {
            fs.unlinkSync(fajl.path); 
        } catch (e) {
             console.error("Greška pri brisanju fajla:", e);
        }
    }
});


// RUTA 2: Glavna ruta - Poslužuje HTML
app.get('/', (req, res) => {
    // Poslužuje index.html iz mape 'public'
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =========================================================
// 4. POKRETANJE SERVERA
// =========================================================
app.listen(PORT, () => {
    console.log(`Server sluša na portu ${PORT}`);
});
