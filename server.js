const express = require('express');
const app = express();

// Render će automatski postaviti PORT varijablu
const PORT = process.env.PORT || 3000; 

app.get('/', (req, res) => {
  // Ovo je vaš API poziv!
  res.send('Hello Render World! Aplikacija za frizere uskoro stiže...');
});

app.listen(PORT, () => {
  console.log(`Server sluša na portu ${PORT}`);
});
