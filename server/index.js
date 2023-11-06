// Ici on charge express afin de pouvoir s'en servir dans notre application
const express = require('express');
const app = express();
const PORT = 3002;


// Ici on créer un route pour afficher un message simple
app.post('/api/save', (req, res) => {
    res.send('Votre film a bien été ajouté à vos favoris !');
    console.log('Il est arrivé !');
});

app.listen(PORT, () => console.log('Le serveur est lancé sur le port ' + PORT));