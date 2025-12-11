const express = require('express');
const multer = require('multer'); 
const path = require('path');
// Import službenog Hugging Face Inference Klijenta
const { HfInference } = require('@huggingface/inference'); 
const app = express();

// =========================================================
// 1. KONFIGURACIJA
// =========================================================

const PORT = process.env.PORT || 3000; 
// Token se čita iz okolišnih varijabli (HF_TOKEN je preferirani naziv)
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// Inicijalizacija klijenta s Tokenom
if (!HF_TOKEN) {
    console.warn("Upozorenje: HF_TOKEN nije postavljen. Klijent možda neće raditi bez autorizacije.");
}
const hf = new HfInference(HF_TOKEN); // Klijent automatski koristi ispravne Router API-je

// Middleware za obradu teksta
const upload = multer(); 

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

// Poslužuje sve datoteke iz 'public' foldera
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

// =========================================================
// 3. API RUTA: Procesiranje Teksta (Sentiment Analiza)
// =========================================================

app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    // Provjera Tokena za autorizaciju
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru. Potrebno za rad s HF API-jem.' });
    }

    const textInput = req.body.text_input;
    
    if (!textInput || textInput.length === 0) {
        return res.status(400).json({ error: 'Potreban je tekst za analizu.' });
    }

    try {
        // Koristimo službenu funkciju textClassification za Sentiment Analizu
        const hfResponse = await hf.textClassification({
            model: 'distilbert-base-uncased-finetuned-sst-2-english',
            inputs: textInput,
        });

        // Parsiranje rezultata (očekuje se niz objekata: [{"label": "POSITIVE", "score": 0.999}])
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
            status: "Analiza uspješna!",
            rezultat_tekst: `Sentiment: ${sentimentLabel} (Pouzdanost: ${(score * 100).toFixed(2)}%)`
        });

    } catch (error) {
        let errorDetails = error.message || "Nepoznata greška";
        
        // Ispis greške u konzolu
        console.error("HF Client Error:", error.response || error.message);
        
        res.status(500).json({ 
            error: 'Greška pri analizi sentimenta (HF klijent).',
            detalji: errorDetails
        });
    }
});


// RUTA: Glavna ruta - Poslužuje HTML
app.get('/', (req, res) => {
    // Poslužuje index.html iz public foldera (provjereno da je ispravno)
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =========================================================
// 4. POKRETANJE SERVERA
// =========================================================
// Sluša na portu koji je odredio Render
app.listen(PORT, () => {
    console.log(`Server sluša na portu ${PORT}`);
});
