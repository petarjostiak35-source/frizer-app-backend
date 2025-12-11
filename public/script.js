document.getElementById('forma-video').addEventListener('submit', async function(e) {
    e.preventDefault(); // Spriječi standardno osvježavanje stranice
    
    const formElement = e.target;
    const formData = new FormData(formElement); // Ključ za slanje fajlova!
    
    const button = document.getElementById('generateButton');
    const rezultatDiv = document.getElementById('rezultat');
    
    // Vizualna povratna informacija
    button.textContent = 'Obrada u tijeku... Može trajati do 3 minute!';
    button.disabled = true;
    rezultatDiv.innerHTML = '<p>Molimo pričekajte dok GPU generira video...</p>';
    
    try {
        // 1. Slanje zahtjeva na VAŠ Render Backend
        const response = await fetch('/procesiraj-video', {
            method: 'POST',
            // formData automatski postavlja Content-Type: multipart/form-data
            body: formData 
        });

        const data = await response.json();

        if (response.ok) {
            // Uspješno primljen video URL
            rezultatDiv.innerHTML = `
                <p>Status: Uspješno generirano! (Seed: ${data.seed})</p>
                <video controls autoplay loop style="max-width: 100%; border: 1px solid #ddd; margin-top: 15px;">
                    <source src="${data.video_url}" type="video/mp4">
                    Vaš preglednik ne podržava video tag.
                </video>
            `;
        } else {
            // Greška (npr. 400 ili 500)
            rezultatDiv.innerHTML = `<p class="error">Greška: ${data.error || 'Nepoznata greška'}</p>`;
            if (data.detalji) {
                 rezultatDiv.innerHTML += `<p>Detalji: ${data.detalji}</p>`;
            }
        }

    } catch (error) {
        rezultatDiv.innerHTML = `<p class="error">Greška u komunikaciji: Server je nedostupan ili je predugo čekanje.</p>`;
    } finally {
        button.textContent = '🎬 Generiraj Video';
        button.disabled = false;
    }
});
