// Ici on charge express afin de pouvoir s'en servir dans notre application
const express = require('express');

// Ici on met express dans une constante app
const app = express();

// Ici on créer un route pour afficher un message simple
app.post('/api/save', (req, res) => {
    res.send('Votre film a bien été ajouté à vos favoris !');
    console.log('Il est arrivé !');
});

app.listen(3000, () => console.log('Le serveur est lancé sur le port 3000'));