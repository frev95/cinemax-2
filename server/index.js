// Chargement des utilities de l'application
const express = require('express');
const app = express();
const PORT = 3002;
const fs = require('fs');
// import Save from './functions/Save.js'

// Middleware pour gérer les requêtes POST
app.use(express.urlencoded({ extended: true }));

// Route post pour ajouter un film en favoris
app.post('/api/save', (req, res) => {
    // Ici on récupere le contenu de la requête POST
    const imdbID = req.body;
    console.log(imdbID);
    // Avec fs.readFile on va lire le contenu du fichier data.json
    fs.readFile('./data.json', 'utf8', (err, data) => {
        // SI le fichier n'est pas disponible on renvoie une erreur
        if(err) {
            // res.status(500).send('Une erreur s\'est produite avec le serveur');
            console.log('Une erreur s\'est produite avec le serveur');
        }
    
    // Ici on parse le contenu JSON
    let json = JSON.parse(data);

    console.log(json);

    // Ici on ajoute le film dans le tableau
    // json.push = imdbID;

    // console.log(imdbID);

    })
});

app.listen(PORT, () => console.log('Le serveur est lancé sur le port ' + PORT));