/**
 * Serveur NodeJS avec Express pour gérer les requêtes HTTP
 * Application : Cinemax
 * Description : Application d'inspiration pour trouver des films et les ajouter à une liste de favoris
 * Auteur : Jensone
 */

// ------------------------- IMPORTS ------------------------- //
const express = require("express"); // Framework pour NodeJS
const app = express(); // Création de l'application
const cors = require("cors"); // pour forcer le chargement de CORS
const fs = require("fs"); // Module pour gérer les fichiers
const PORT = 3002; // Définition du port d'écoute du serveur (Express)
const Save = require("./functions/Save"); // Importation de la fonction Save
const Delete = require("./functions/Delete"); // Importation de la fonction Delete

// ------------------------- ROUTES ------------------------- //

/**
 * Middleware
 * Le middleware est une fonction qui va être exécutée à chaque requête
 * elle va permettre de traiter les données avant de les envoyer au serveur
 * cela agit comme un filtre pour éviter les erreurs et définir des règles.
 * 
 * Dans notre cas, on va utiliser le middleware express.urlencoded qui va
 * nous permettre de récupérer les données envoyées par le formulaire.
 * 
 * Le paramètre extended à true permet de récupérer les données envoyées
 * par le formulaire sous la forme d'un objet.
 * 
 * Par la même occasion nous allons aussi mettre à dispositon le CORS
 * sur notre serveur après l'avoir installé. On utilisera encore la méthode .use,
 * cela donnera l'accès à toutes les routes de notre serveur.
 */
app.use(express.urlencoded({ extended: true }), cors());

app.get("/", (req, res) => { res.redirect("/"); });

// Route permettant de traiter l'enregistrement d'un film dans la liste des favoris
app.post("/api/save", (req, res) => {  // "/api/save" est l'URL du POST
  const imdbID = req.body.imdbID // On récupère les données envoyées par le formulaire
   // Vérification du statut de la fonction Save
  if (Save(imdbID)) {  // On appelle la fonction Save en lui envoyant les données
    res.redirect("/favoris");
//    res.status(200).send(`Le film ${imdbID} a été ajouté à vos favoris.`);
//  } else {
//    res.status(500).send("Une erreur est survenue lors de l'ajout du film à vos favoris.");
  }
});

// Route permettant de traiter la suppression d'un film dans la liste des favoris
app.post("/api/delete", (req, res) => {  // "/api/delete" est l'URL du POST
  const imdbID = req.body // On récupère les données envoyées par le formulaire
  Delete(imdbID); // On appelle la fonction Delete en lui envoyant les données
  // Vérification du statut de la fonction Delete
  if (Delete(imdbID)) {
    res.status(200).send("Le film a été retiré de vos favoris.");
  } else {
    res.status(500).send("Une erreur est survenue lors de la suppression du favori.");
  }
});

// Route d'accès aux données du fichier favorites.json
app.get("/api/favorites", (req, res) => {  // "/api/favorites" est l'URL du GET
  res.sendFile(__dirname + "/favorites.json");
});


/** Lancement du serveur
* La méthode listen permet de lancer le serveur sur le port défini
* dans la constante PORT
*/
app.listen(PORT, () => console.log("Le serveur est lancé sur le port " + PORT));
