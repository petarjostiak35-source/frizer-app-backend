const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; 

// 1. Postojeća Hello World ruta (https://.../ )
app.get('/', (req, res) => {
  res.send('Backend Frizer App je pokrenut! Dodajte /klijenti u URL.');
});

// 2. NOVA RUTA: /klijenti (https://.../klijenti)
app.get('/klijenti', (req, res) => {
  // Ovdje će kasnije ići upit u SQL bazu
  const listaKlijenata = [
    { id: 1, ime: 'Ana', telefon: '091-123-456' },
    { id: 2, ime: 'Marko', telefon: '098-765-432' }
  ];

  // Server vraća JSON podatke
  res.json(listaKlijenata); 
});

app.listen(PORT, () => {
  console.log(`Server sluša na portu ${PORT}`);
});
