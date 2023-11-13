/*
 * Serveur NodeJS avec Express pour gérer les requêtes HTTP
 * Application : Cinemax
 * Description : Application pour chercher des films à regarder et constituer une liste de favoris
 */

// ------------------------- IMPORTS ------------------------------

const express = require("express"); // framework pour NodeJS
const app = express(); // création de l'application
const cors = require("cors"); // pour forcer le chargement de CORS
const PORT = 3002; // définition du port d'écoute du serveur (Express)
// const fs = require("fs"); // module pour gérer les fichiers
const path = require("path"); // module pour gérer les chemins de fichier
const Save = require("./functions/Save"); // importation de la fonction Save
const Delete = require("./functions/Delete"); // importation de la fonction Delete

// ------------------------------------- ROUTES ----------------------------------------
/*
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
 * Par la même occasion nous allons aussi mettre à dispositon le Cross Origin Resource Sharing
 * (CORS) sur notre serveur après l'avoir installé. On utilisera encore la méthode .use,
 * cela donnera l'accès à toutes les routes de notre serveur.
 */

app.use(express.urlencoded({ extended: true }), cors());
app.use(express.json());  // extension permettant au serveur de lire et renvoyer du JSON
app.use(express.static("./client/build")); // définition du dossier build (ou dist) pour les fichiers statiques

// ------------------------------------- ROUTES API ----------------------------------------

// Route permettant d'enregistrer un film dans le fichier JSON des favoris
app.post("/api/save", (req, res) => {  // "/api/save" est l'URL du POST
  const imdbID = req.body.imdbID // on récupère les données envoyées par le formulaire
  if (Save(imdbID)) {  // appel de la fonction Save en lui envoyant les données
    res.redirect("/favorites");   //////////////////////////// précédemment: favoris
    //    res.status(200).send(`Le film ${imdbID} a été ajouté à vos favoris.`);
    //  } else {
      //    res.status(500).send("Une erreur est survenue lors de l'ajout du film à vos favoris.");
  }
});
/*
// Route permettant de supprimer un film du fichier JSON des favoris
app.post("/api/delete", (req, res) => {  // "/api/delete" est l'URL du POST
  const imdbID = req.body // on récupère les données envoyées par le formulaire
  if (Delete(imdbID)) { // appel de la fonction Delete en lui envoyant les données
    res.status(200).send(`Le film ${imdbID} a été retiré de vos favoris.`);
  } else {
    res.status(500).send("Une erreur est survenue lors de la suppression du favori.");
  }
});
*/
// Route d'accès aux données du fichier favorites.json
app.get("/api/favorites", (req, res) => {  // "/api/favorites" est l'URL du GET
  res.sendFile(__dirname + "/favorites.json");
});
  
// ------------------------------------- ROUTES CLIENT ----------------------------------------

// Route principale qui redirige vers l'app React (index.html est le point d'entrée de l'app)
  app.get("/*", (req, res) => { res.sendFile(path.join(__dirname,"./client/build/index.html")); });
  
// La méthode listen permet de lancer le serveur sur le port défini dans la constante PORT
app.listen(PORT, () => console.log("Le serveur est lancé sur le port " + PORT));
