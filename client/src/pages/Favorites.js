import React, { useEffect, useState } from "react";
import Movies from "../components/Movies";

const Favorites = () => {
    const [favoriteIDs, setFavoriteIDs] = useState([]);         // liste des favoris
    const [favoriteMovies, setFavoriteMovies] = useState([]);   // liste des résultats issus de la boucle OMDb
    const favoritesURL = "/api/favorites";                      // grâce au proxy dans package.json; sinon "http://localhost:3002/api/favorites"
    const omdbAPI = "https://www.omdbapi.com/?apikey=ffe9f21a";

    const fetchFavorites = async () => {
        try {
            const response = await fetch(favoritesURL);   // demande sur le serveur Express pour récupérer le contenu du fichier favorites.json
            const data = await response.json();
            console.log(data);
            if (data.favorites) {                         // si des données ont été récupérées
                setFavoriteIDs(data.favorites);           // elles sont transférées dans le tableau des ID favoris (favoriteIDs)
            }
        } catch (error) {
            console.log("erreur favoris: " + error);
        }
    }

    const fetchMovies = async () => {
        const movies = [];
        // utilisation d'une boucle "forOf" pour être sûr que chaque tour de boucle soit achevé
        // avant de passer au suivant (ce qui n'était pas le cas avec "forEach" et pouvait poser problème)
        try {
            for (const item of favoriteIDs) {
                const response = await fetch(omdbAPI + "&i" + item.movie);
                const data = await response.json();
                movies.push([{ imdbID: data.imdbID, Title: data.Title, Poster: data.Poster }]);
                console.log(movies);
            }
            if (movies.length > 0) {        // si le tableau n'est pas vide
                setFavoriteMovies(movies);  // il est transféré dans le tableau des films favoris (favoriteMovies)
            }
        } catch (error) {
                console.log("erreur OMDb: " + error);
        }
    }

    useEffect(() => {  // récupération des ID des films favoris
    //  Version initiale:
    /*  fetch('http://localhost:3002/api/favorites')
            .then(res => res.json())                        // fetch sur le serveur Express pour récupérer le contenu du fichier favorites.json
            .then(data => setFavoriteIDs(data.favorites));  // les données récupérées sont stockées dans le tableau des favoris (favoriteIDs)
        
        favoriteIDs.forEach(movie => {     // boucle sur le tableau des favoris
            favoriteIDs.forEach(item => {
                fetch(omdbAPI + "&i" + item.movie)
                    .then(res => res.json())  // fetch dans l'API OMDb pour récupérer les données JSON
                    .then(data => setMovies([{ id: data.imdbID,
                                               movie: data.Title,
                                               poster: data.Poster }]));
            })
        });
    */
        fetchFavorites()
    }, []);   // ATTENTION: si le tableau vide n'est pas mentionné, le fetch est réitéré indéfiniment !!!

    useEffect(() => {    // constitution de la liste des films favoris
        fetchMovies()
    }, [favoriteIDs]);   // attend que favoriteIDs soit rempli avant de lancer la recherche dans OMDb

    return (
        <>
            <h1>Favoris</h1>
        {/* <ul> { favoriteIDs.map((favorite) => ( <li key={favorite.id}> {favorite.movie} </li> )) } </ul>   // pour test */}
            <div>
                <Movies movies={favoriteMovies} />
            </div>
        </>
    )
};

export default Favorites;