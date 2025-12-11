const express = require('express');
const multer = require('multer'); 
const axios = require('axios');
const path = require('path');
const app = express();

// =========================================================
// 1. KONFIGURACIJA
// =========================================================

const PORT = process.env.PORT || 3000; 
// Ključni dio: prihvaća HF_TOKEN ili HF_API_TOKEN
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// FINALNI URL: Sentiment Model na OBAVEZNOM Router API-ju
const HF_API_URL = "https://router.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"; 

// Konfiguracija za multer
const upload = multer(); 

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

// Poslužuje sve iz 'public' foldera
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

// =========================================================
// 3. API RUTA: Procesiranje Teksta
// =========================================================

// Koristi upload.none() jer ne šaljemo fajlove, već samo tekst iz forme
app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    // Provjera Tokena
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru. Postavite ga kao okolišnu varijablu.' });
    }

    const textInput = req.body.text_input;
    
    if (!textInput || textInput.length === 0) {
        return res.status(400).json({ error: 'Potreban je tekst za analizu.' });
    }

    try {
        // Kreiranje payloada za Sentiment Analizu
        const inferencePayload = {
            "inputs": textInput,
            "parameters": {
                "wait_for_model": true 
            }
        };
        
        // Slanje zahtjeva na Hugging Face Router API
        const hfResponse = await axios.post(HF_API_URL, inferencePayload, {
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            timeout: 60000 // 60 sekundi timeout
        });

        // Parsiranje rezultata (očekuje se [[{"label": "POSITIVE", "score": 0.999}]] format)
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
                // Pokušaj parsiranja Hugging Face JSON greške
                errorDetails = JSON.stringify(error.response.data);
             } catch (e) {
                errorDetails = error.response.data.toString();
             }
        }
        
        // Detektira grešku autorizacije
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            errorDetails = "Token (HF_TOKEN) je nevažeći ili mu nedostaju dozvole za ovaj API."
        }
        
        // Detektira 404 grešku
        if (error.response && error.response.status === 404) {
            errorDetails = "Model nije pronađen na router.huggingface.co. Token je nevažeći ili je putanja kriva."
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
    // Poslužuje index.html iz public foldera (potvrđeno da je ispravno)
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =========================================================
// 4. POKRETANJE SERVERA
// =========================================================
// Sluša na portu koji je odredio Render
app.listen(PORT, () => {
    console.log(`Server sluša na portu ${PORT}`);
});
