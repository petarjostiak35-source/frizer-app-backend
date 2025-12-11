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
const HF_TOKEN = process.env.HF_TOKEN || process.env.HF_API_TOKEN; 

// 🚨 KRITIČNA INICIJALIZACIJA (Forsiranje Router API-ja) 🚨
let hf = null;
if (HF_TOKEN) {
    // Inicijaliziramo klijent s Tokenom I forsiramo Router URL
    hf = new HfInference({
        accessToken: HF_TOKEN,
        endpointUrl: 'https://router.huggingface.co/api/', // OVO FORSIRA ROUTER API
    });
    console.log("Hugging Face klijent uspješno inicijaliziran na Router API.");
} else {
    console.error("KRITIČNA GREŠKA: HF_TOKEN nije postavljen. API pozivi neće raditi.");
}

// Middleware za obradu teksta
const upload = multer(); 

// =========================================================
// 2. MIDDLEWARE & STATIČNI FIZLOVI
// =========================================================

// Poslužuje sve datoteke iz 'public' foldera
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

// =========================================================
// 3. API RUTA: Procesiranje Teksta (GENERIRANJE TEKSTA)
// =========================================================

app.post('/procesiraj-frizuru', upload.none(), async (req, res) => {
    
    // Provjera prije API poziva: Je li klijent uopće inicijaliziran?
    if (!hf) {
        return res.status(500).json({ error: 'HF klijent nije inicijaliziran. Provjerite je li HF_TOKEN postavljen na Renderu.' });
    }

    const textInput = req.body.text_input;
    
    if (!textInput || textInput.length === 0) {
        return res.status(400).json({ error: 'Potreban je tekst za generiranje.' });
    }

    try {
        // 🚨 NOVO: Koristimo Text Generation s GPT2 modelom 🚨
        const hfResponse = await hf.textGeneration({
            model: 'gpt2', 
            inputs: textInput,
            parameters: { 
                max_new_tokens: 50, // Ograničavamo generiranje na 50 novih tokena
                waitForModel: true  // Čekaj ako se model učitava
            }
        });

        // Parsiranje rezultata za Text Generation
        const generatedText = hfResponse.generated_text;
        
        // VRAĆANJE TEKSTUALNOG REZULTATA KLIJENTU
        res.json({
            status: "Generiranje uspješno!",
            rezultat_tekst: `Vaš prompt: "${textInput}". Generirani nastavak: ${generatedText.substring(textInput.length).trim()}`
        });

    } catch (error) {
        let errorDetails = error.message || "Nepoznata greška";
        
        // Ispis greške u konzolu
        console.error("HF Client Error:", error.response || error.message);
        
        // Vraćamo detalje o grešci natrag klijentu
        res.status(500).json({ 
            error: 'Greška pri generiranju teksta (HF klijent).',
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
