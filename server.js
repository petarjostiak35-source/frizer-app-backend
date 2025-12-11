const express = require('express');
const multer = require('multer'); 
const axios = require('axios');
const path = require('path');
const app = express();

// =========================================================
// 1. KONFIGURACIJA
// =========================================================

const PORT = process.env.PORT || 3000; 
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// 🚨 NOVI, STABILNI FALLBACK: GPT2 text-generation model 🚨
const HF_API_URL = "https://api-inference.huggingface.co/models/gpt2"; 

// ... (ostatak koda je isti: upload = multer(), middleware, itd.) ...

// =========================================================
// 3. API RUTA: Procesiranje Teksta
// =========================================================

app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    // Provjera TOKEN-a je ključna za Inference API!
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru. Ako je token neispravan, API će često vratiti "Not Found" ili 401/403.' });
    }

    const textInput = req.body.text_input;
    
    if (!textInput || textInput.length === 0) {
        return res.status(400).json({ error: 'Potreban je tekst za generiranje.' });
    }

    try {
        // Kreiranje payloada za Text Generation
        const inferencePayload = {
            "inputs": textInput,
            "parameters": {
                "max_new_tokens": 50, // Ograničimo duljinu generiranog teksta
                "wait_for_model": true 
            }
        };
        
        const hfResponse = await axios.post(HF_API_URL, inferencePayload, {
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            timeout: 60000 
        });

        // Vađenje rezultata iz JSON odgovora
        // Text Generation vraća: [{"generated_text": "..."}]
        const generatedText = hfResponse.data[0].generated_text;
        
        if (!generatedText) {
            throw new Error('API nije vratio generirani tekst.');
        }
        
        // VRAĆANJE TEKSTUALNOG REZULTATA KLIJENTU
        res.json({
            status: "Generiranje uspješno!",
            rezultat_tekst: `Vaš prompt: "${textInput}". Generirani nastavak: ${generatedText.substring(textInput.length).trim()}`
        });

    } catch (error) {
        let errorDetails = error.message;
        if (error.response && error.response.data) {
             try {
                errorDetails = JSON.stringify(error.response.data);
             } catch (e) {
                errorDetails = error.response.data.toString();
             }
        }
        
        // 🚨 Dodatna provjera za TOKEN
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            errorDetails = "Token (HF_TOKEN) je nevažeći ili mu nedostaju dozvole za ovaj API."
        }

        console.error("HF Error:", errorDetails);
        
        res.status(500).json({ 
            error: 'Greška pri generiranju teksta na Hugging Face API-ju.',
            detalji: errorDetails
        });
    }
});


// ... (ostatak koda: app.get('/', ... i app.listen(PORT, ... su isti) ...
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server sluša na portu ${PORT}`);
});
