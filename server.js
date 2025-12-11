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

// 🚨 NOVI, STABILNI URL ZA TEKSTUALNU ANALIZU SENTIMENTA 🚨
const HF_API_URL = "https://huggingface-api-predict-demo.hf.space/api/predict"; 

// Budući da ne šaljemo slike, možemo koristiti jednostavan upload middleware za tekst
const upload = multer(); // Bez dest: 'uploads/', jer ne spremamo fajlove

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
    
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru.' });
    }

    // Očekujemo 'text_input' iz frontend forme (formData)
    const textInput = req.body.text_input;
    
    if (!textInput || textInput.length === 0) {
        return res.status(400).json({ error: 'Potreban je tekst za analizu.' });
    }

    try {
        // Kreiranje payloada - šaljemo samo jedan tekstualni input
        const gradioPayload = {
            "fn_name": "predict", // Generička funkcija
            "data": [
                textInput, // Jedini input
            ], 
            "session_hash": "gradio_session_" + Math.random().toString(36).substring(2, 10) 
        };
        
        const hfResponse = await axios.post(HF_API_URL, gradioPayload, {
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`, 
                'Content-Type': 'application/json',
            },
            timeout: 30000 // 30 sekundi (ovo je brže)
        });

        // Vađenje rezultata iz JSON odgovora
        // Gradio za text-to-text vraća: [ ["LABEL_1", 0.99] ]
        const result = hfResponse.data.data[0];
        
        if (!result || !result.label) {
            throw new Error('API nije vratio tekstualni rezultat u očekivanom formatu.');
        }

        // VRAĆANJE TEKSTUALNOG REZULTATA KLIJENTU
        const sentimentLabel = result.label === "LABEL_1" ? "Positive" : "Negative";
        const score = (result.conf * 100).toFixed(2);

        res.json({
            status: "Analiza uspješna!",
            rezultat_tekst: `Sentiment: ${sentimentLabel} (Confidence: ${score}%)`
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
