const express = require('express');
const multer = require('multer'); 
const path = require('path');
// 🚨 NOVI MODUL: Službeni Hugging Face Inference Klijent
const { HfInference } = require('@huggingface/inference'); 
const app = express();

// =========================================================
// 1. KONFIGURACIJA
// =========================================================

const PORT = process.env.PORT || 3000; 
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// Inicijalizacija klijenta s Tokenom
if (!HF_TOKEN) {
    console.error("FATAL: HF_TOKEN nije postavljen. Ne mogu pokrenuti HF klijent.");
}
// Klijent automatski zna koje API-je koristiti
const hf = new HfInference(HF_TOKEN);

const upload = multer(); 

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

// =========================================================
// 3. API RUTA: Procesiranje Teksta
// =========================================================

app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    // Provjera Tokena (ponovno)
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru.' });
    }

    const textInput = req.body.text_input;
    
    if (!textInput || textInput.length === 0) {
        return res.status(400).json({ error: 'Potreban je tekst za analizu.' });
    }

    try {
        // Koristimo SLUŽBENU funkciju za Sentiment Analizu
        const hfResponse = await hf.sentimentAnalysis({
            model: 'distilbert-base-uncased-finetuned-sst-2-english',
            inputs: textInput,
        });

        // Parsiranje rezultata od službenog klijenta (Format je drugačiji, ali čist)
        const positiveResult = hfResponse.find(r => r.label === "POSITIVE");
        const negativeResult = hfResponse.find(r => r.label === "NEGATIVE");
        
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
            status: "Analiza uspješna! (Koristeći službeni klijent)",
            rezultat_tekst: `Sentiment: ${sentimentLabel} (Pouzdanost: ${(score * 100).toFixed(2)}%)`
        });

    } catch (error) {
        let errorDetails = error.message || "Nepoznata greška";
        
        // U službenom klijentu greška će biti jasnija
        console.error("HF Client Error:", error.response || error.message);
        
        res.status(500).json({ 
            error: 'Greška pri analizi sentimenta (HF klijent).',
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
