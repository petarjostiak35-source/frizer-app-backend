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

// Token se čita iz Environment Variables
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// 🚨 ISPRAVLJENI URL: Koristi se standardni Gradio V4 API endpoint
const HF_API_URL = "https://obsxrver-wan2-2-i2v-lora-demo.hf.space/api/predict"; 

// Konfiguracija Multera
const upload = multer({ dest: 'uploads/' });

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

// Posluživanje statičnih datoteka iz 'public' mape
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); 

// =========================================================
// 3. API RUTE
// =========================================================

// RUTA: Procesiranje videa (Proxy za Hugging Face)
app.post('/procesiraj-video', upload.single('slika'), async (req, res) => {
    
    // Provjera autorizacije
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru. Neophodan je za pristup API-ju.' });
    }

    const fajl = req.file;   
    const prompt = req.body.prompt; // Tekstualni opis iz forme

    if (!fajl || !prompt) {
        return res.status(400).json({ error: 'Potrebna je slika i prompt za generiranje videa.' });
    }

    try {
        // 1. Čitanje i konverzija slike u Base64 (Format koji Gradio API očekuje)
        const fileContent = fs.readFileSync(fajl.path).toString('base64');
        const mimeType = fajl.mimetype;
        const base64Image = `data:${mimeType};base64,${fileContent}`;
        
        // 2. PRIPREMA JSON PAYLOAD-A (Novi Gradio API Format)
        const gradioPayload = {
            // 🚨 KLJUČNO: Moramo reći Gradiju koju funkciju da pozove
            "fn_name": "generate_video", 
            "data": [
                base64Image,                        // 1. input_image (Base64)
                prompt,                             // 2. prompt
                6,                                  // 3. steps
                "",                                 // 4. negative_prompt
                4.0,                                // 5. duration_seconds
                1,                                  // 6. guidance_scale
                1,                                  // 7. guidance_scale_2
                42,                                 // 8. seed
                true,                               // 9. randomize_seed
            ],
            // Dodajemo session_hash jer ga Gradio API često zahtijeva
            "session_hash": "gradio_session_" + Math.random().toString(36).substring(2, 10) 
        };
        
        // 3. SLANJE NA HUGGING FACE GRADIO API
        const hfResponse = await axios.post(HF_API_URL, gradioPayload, {
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            timeout: 180000 // 3 minute timeout 
        });

        // 4. PRIMANJE REZULTATA
        // Gradio vraća JSON. data[0] je URL do videa, data[1] je seed.
        const video_url = hfResponse.data.data[0];
        const seed_used = hfResponse.data.data[1];
        
        // 5. VRAĆANJE REZULTATA KLIJENTU
        res.json({
            status: "Uspješno generirano! Video je spreman.",
            video_url: video_url, 
            seed: seed_used
        });

    } catch (error) {
        // Logiranje greške
        console.error("HF Error:", error.response ? error.response.data : error.message);
        
        // Slanje poruke o grešci natrag klijentu
        res.status(500).json({ 
            error: 'Generiranje videa nije uspjelo.',
            detalji: (error.response && error.response.data) 
                ? (error.response.data.error || JSON.stringify(error.response.data)) 
                : error.message 
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


// RUTA: Glavna ruta - Poslužuje HTML
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
