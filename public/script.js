document.getElementById('forma-frizura').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const formElement = e.target;
    const formData = new FormData(formElement);
    
    const button = document.getElementById('generateButton');
    const rezultatDiv = document.getElementById('rezultat');
    
    // Dohvaćanje tekstualnog inputa
    const textInput = formData.get('text_input');
    
    if (!textInput) {
        rezultatDiv.innerHTML = '<p class="error">⚠️ Molimo unesite tekst za analizu.</p>';
        return;
    }
    
    button.textContent = 'Analiziram sentiment...';
    button.disabled = true;
    rezultatDiv.innerHTML = '<p>Molimo pričekajte...</p>';
    
    try {
        // Slanje zahtjeva na VAŠ Render Backend
        const response = await fetch('/procesiraj-frizuru', {
            method: 'POST',
            body: formData 
        });

        const data = await response.json();

        if (response.ok) {
            // Uspješno primljen tekstualni rezultat
            rezultatDiv.innerHTML = `
                <p>Status: Analiza završena!</p>
                <p>Rezultat: <strong>${data.rezultat_tekst}</strong></p>
            `;
        } else {
            // Greška 
            rezultatDiv.innerHTML = `<p class="error">Greška: ${data.error || 'Nepoznata greška'}</p>`;
            if (data.detalji) {
                 rezultatDiv.innerHTML += `<p>Detalji: ${data.detalji}</p>`;
            }
        }

    } catch (error) {
        rezultatDiv.innerHTML = `<p class="error">Greška u komunikaciji: Server je nedostupan.</p>`;
    } finally {
        button.textContent = 'Analiziraj Tekst';
        button.disabled = false;
    }
});
