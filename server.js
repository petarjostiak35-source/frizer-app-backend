const express = require('express');
const multer = require('multer'); 
const path = require('path');
const { HfInference } = require('@huggingface/inference'); 
const app = express();

// =========================================================
// 1. KONFIGURACIJA
// =========================================================

const PORT = process.env.PORT || 3000; 
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// 🚨 ČISTA INICIJALIZACIJA: Neka klijent sam odredi Router API putanju 🚨
if (!HF_TOKEN) {
    console.warn("Upozorenje: HF_TOKEN nije postavljen.");
}
const hf = new HfInference(HF_TOKEN); // Nema endpointUrl!

const upload = multer(); 
// ... (ostatak koda je isti: middleware) ...

// =========================================================
// 3. API RUTA: Procesiranje Teksta (Sentiment Analiza)
// =========================================================

app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    // ... (provjera Tokena i textInput su isti) ...

    try {
        // Koristimo službenu funkciju textClassification
        const hfResponse = await hf.textClassification({
            model: 'distilbert-base-uncased-finetuned-sst-2-english',
            inputs: textInput,
        });

        // ... (parsiranje rezultata je isto) ...
        
        res.json({
            status: "Analiza uspješna!",
            rezultat_tekst: `Sentiment: ${sentimentLabel} (Pouzdanost: ${(score * 100).toFixed(2)}%)`
        });

    } catch (error) {
        let errorDetails = error.message || "Nepoznata greška";
        
        // Greška će sada biti jasnija ako je vezana za providera
        console.error("HF Client Error:", error.response || error.message);
        
        res.status(500).json({ 
            error: 'Greška pri analizi sentimenta (HF klijent).',
            detalji: errorDetails
        });
    }
});

// ... (ostatak koda je isti) ...
