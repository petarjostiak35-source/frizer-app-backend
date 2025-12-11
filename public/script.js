document.getElementById('forma-frizura').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const formElement = e.target;
    const formData = new FormData(formElement);
    
    const button = document.getElementById('generateButton');
    const rezultatDiv = document.getElementById('rezultat');
    
    // Provjera minimalnog uvjeta na frontendu prije slanja (za bolji UX)
    const sourceFile = document.getElementById('inputSource').files.length > 0;
    const shapeFile = document.getElementById('inputShape').files.length > 0;
    const colorFile = document.getElementById('inputColor').files.length > 0;

    if (!sourceFile || (!shapeFile && !colorFile)) {
        rezultatDiv.innerHTML = '<p class="error">⚠️ Molimo uploadajte sliku lica i barem jednu sliku za oblik ili boju.</p>';
        return;
    }
    
    button.textContent = 'Obrada u tijeku...';
    button.disabled = true;
    rezultatDiv.innerHTML = '<p>Molimo pričekajte...</p>';
    
    try {
        // 1. Slanje zahtjeva na VAŠ Render Backend
        const response = await fetch('/procesiraj-frizuru', {
            method: 'POST',
            body: formData 
        });

        const data = await response.json();

        if (response.ok) {
            // Uspješno primljena Base64 slika
            rezultatDiv.innerHTML = `
                <p>Status: Uspješno generirano!</p>
                <img id="generated-image" src="${data.slika_base64}" alt="Generirana frizura" />
            `;
        } else {
            // Greška (npr. 400 ili 500)
            rezultatDiv.innerHTML = `<p class="error">Greška: ${data.error || 'Nepoznata greška'}</p>`;
            if (data.detalji) {
                 rezultatDiv.innerHTML += `<p>Detalji: ${data.detalji}</p>`;
            }
        }

    } catch (error) {
        rezultatDiv.innerHTML = `<p class="error">Greška u komunikaciji: Server je nedostupan.</p>`;
    } finally {
        button.textContent = 'Zamijeni Frizuru/Boju';
        button.disabled = false;
    }
});
