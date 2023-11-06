// Ici on charge express afin de pouvoir s'en servir dans notre application
const express = require('express');

// Ici on met express dans une constante app
const app = express();

// Ici on créer un route pour afficher un message simple
app.get('/api/movie', (req, res) => {
    res.send('Build something amazing! 🚀');
});

app.listen(3000, () => console.log('Le serveur est lancé sur le port 3000'));