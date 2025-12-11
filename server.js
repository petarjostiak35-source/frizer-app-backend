// ... (sav kod prije app.post ostaje isti) ...

app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    if (!HF_TOKEN) {
        return res.status(500).json({ error: 'HF_TOKEN nije postavljen na serveru.' });
    }

    const textInput = req.body.text_input;
    
    if (!textInput || textInput.length === 0) {
        return res.status(400).json({ error: 'Potreban je tekst za analizu.' });
    }

    try {
        // 🚨 ISPRAVLJENA FUNKCIJA: Koristimo textClassification
        const hfResponse = await hf.textClassification({
            model: 'distilbert-base-uncased-finetuned-sst-2-english',
            inputs: textInput,
        });

        // Parsiranje rezultata od službenog klijenta
        // Format je čist, vraća niz objekata: [{"label": "POSITIVE", "score": 0.999}]
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
        
        console.error("HF Client Error:", error.response || error.message);
        
        res.status(500).json({ 
            error: 'Greška pri analizi sentimenta (HF klijent).',
            detalji: errorDetails
        });
    }
});

// ... (ostatak koda je isti) ...
