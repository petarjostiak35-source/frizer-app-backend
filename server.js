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

// 🚨 FINALNI URL: Sentiment Model na OBAVEZNOM Router API-ju 🚨
// Ovo mora raditi, jer je Token ispravan.
const HF_API_URL = "https://router.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"; 

// ... (ostatak koda je isti do app.post) ...

// =========================================================
// 3. API RUTA: Procesiranje Teksta
// =========================================================

app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    // Provjera TOKEN-a i teksta... (isti kod) ...

    try {
        // Kreiranje payloada za Sentiment Analizu
        const inferencePayload = {
            "inputs": textInput,
            "parameters": {
                "wait_for_model": true 
            }
        };
        
        // Slanje na Router API
        const hfResponse = await axios.post(HF_API_URL, inferencePayload, {
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            timeout: 60000 
        });

        // ... (parsiranje rezultata za Sentiment Analizu je isti kod) ...
        const resultList = hfResponse.data[0];
        const positiveResult = resultList.find(r => r.label === "POSITIVE");
        const negativeResult = resultList.find(r => r.label === "NEGATIVE");
        
        // Određivanje finalnog sentimenta...
        let sentimentLabel = "Neutralno";
        let score = 0;

        if (positiveResult && negativeResult) {
            if (positiveResult.score > negativeResult.score) {
                sentimentLabel = "Pozitivno";
                score = positiveResult.score;
            } else {
                sentimentLabel = "Negativno";
                score = negativeResult.score;
            }
        }
        
        // VRAĆANJE TEKSTUALNOG REZULTATA KLIJENTU
        res.json({
            status: "Analiza uspješna!",
            rezultat_tekst: `Sentiment: ${sentimentLabel} (Pouzdanost: ${(score * 100).toFixed(2)}%)`
        });

    } catch (error) {
        let errorDetails = error.message;
        // 🚨 OVDJE JE KRITIČNO: Ako dobijemo 404, Token je sigurno neispravan!
        if (error.response && error.response.status === 404) {
            errorDetails = "Router API nije pronašao model. Token je neispravan ili nevažeći, iako je test u Postmanu uspio."
        }
        // ... (ostatak error handlinga je isti) ...
        
        res.status(500).json({ 
            error: 'Greška pri analizi sentimenta na Hugging Face API-ju.',
            detalji: errorDetails
        });
    }
});


// ... (ostatak server.js koda je isti) ...
