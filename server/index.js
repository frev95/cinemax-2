// Chargement des utilities de l'application
const express = require("express");
const app = express();
const PORT = 3002;
const fs = require("fs");
// import Save from './functions/Save.js'

// Middleware pour gérer les requêtes POST
app.use(express.urlencoded({ extended: true }));

// Route post pour ajouter un film en favoris
app.post("/api/save", (req, res) => {
  // Ici on récupere le contenu de la requête POST
  const imdbValue = req.body.imdbID;
  const imdbID = `{ ${imdbValue} : '${imdbValue}' }`
  
  // Avec fs.readFile on va lire le contenu du fichier data.json
  fs.readFile("./data.json", "utf8", (err, data) => {
    // SI le fichier n'est pas disponible on renvoie une erreur
    if (err) {
      // res.status(500).send('Une erreur s\'est produite avec le serveur');
        console.log("Une erreur s'est produite avec le serveur");
    }

    // Ici on parse le contenu JSON pour le copier
    let jsonData = JSON.parse(data);
    console.log(jsonData);

    jsonData.push(imdbID);
    console.log(jsonData);

    // // Ici on ajoute le film dans le tableau
    // jsonData.push = imdbID;
    // console.log(jsonData);

    fs.writeFile("./data.json", JSON.stringify(jsonData), (err) => {
        if (err) {
            console.log("Une erreur s'est produite avec le serveur");
        } else {
            console.log("Le film a bien été ajouté aux favoris");
        }
    });

    // console.log(imdbID);
    });
});

app.listen(PORT, () => console.log("Le serveur est lancé sur le port " + PORT));
