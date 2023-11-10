import React from "react";
import { Link } from "react-router-dom";
import cinemaxLogo from "../assets/cinemax-lg.png";

// A faire: ajouter une indication de la page où l'on se trouve

const Nav = () => {
    return (
        <nav>
            <Link to="/"> <img src={cinemaxLogo} alt="" height="26" /> </Link>
            <ul className="nav">
                <li className="nav-item">
                    <Link to="/"> Recherche </Link>
                </li>
                <li className="nav-item">
                    <Link to="/favorites"> Mes favoris </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
