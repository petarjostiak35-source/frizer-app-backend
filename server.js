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

// 🚨 NOVI, SLUŽBENI HUGGING FACE ROUTER ENDPOINT 🚨
// Promijenjen api-inference.huggingface.co u router.huggingface.co
const HF_API_URL = "https://router.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"; 

// Budući da ne šaljemo slike, koristimo jednostavan upload middleware za tekst
const upload = multer(); 

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

// =========================================================
// 3. API RUTA: Procesiranje Teksta
// =========================================================

// RUTA se zove /procesiraj-frizuru radi kompatibilnosti, ali obrađuje tekst
app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    // Serverless Inference API zahtijeva HF_TOKEN!
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru. Postavite ga kao okolišnu varijablu.' });
    }

    const textInput = req.body.text_input;
    
    if (!textInput || textInput.length === 0) {
        return res.status(400).json({ error: 'Potreban je tekst za analizu.' });
    }

    try {
        // Kreiranje payloada - Inference API očekuje 'inputs' ključ
        const inferencePayload = {
            "inputs": textInput,
            "parameters": {
                "wait_for_model": true 
            }
        };
        
        const hfResponse = await axios.post(HF_API_URL, inferencePayload, {
            headers: {
                // TOKEN je ovdje obavezan!
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            timeout: 60000 
        });

        // Vađenje rezultata iz JSON odgovora
        // Standardni Inference API vraća niz s poljem rezultata:
        // [[{"label": "POSITIVE", "score": 0.999}]]
        const resultList = hfResponse.data[0];
        const positiveResult = resultList.find(r => r.label === "POSITIVE");
        const negativeResult = resultList.find(r => r.label === "NEGATIVE");
        
        // Određivanje finalnog sentimenta
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
        if (error.response && error.response.data) {
             try {
                errorDetails = JSON.stringify(error.response.data);
             } catch (e) {
                errorDetails = error.response.data.toString();
             }
        }

        console.error("HF Error:", errorDetails);
        
        res.status(500).json({ 
            error: 'Greška pri analizi sentimenta na Hugging Face API-ju.',
            detalji: errorDetails
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
