import React, { useState } from 'react';
import Navigation from '../components/Navigation.components';
import Piece from '../components/Piece.components';
import { NavLink } from 'react-router-dom';

const ListePieces = () => {

    // Variable permettant de savoir si l'utilisateur a les droits pour faire un ajout
    const [peutAjouter, setPeutAjouter] = useState(localStorage.getItem("isEmploye"))

    console.log("Peut ajouter ?: ", peutAjouter)

    if (peutAjouter == 'true') {
        console.log("NavLink")
        return (
            <div>
                <Navigation />
                <h1>Liste des pièces dans le stock</h1>
                <div>
                    <NavLink to='/nouvellePiece' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ajouter une pièce</li>
                    </NavLink>
                </div>
                <Piece />
            </div>
        );
    } else {
        console.log("No NavLink")
        return (
            <div>
                <Navigation />
                <h1>Liste des pièces dans le stock</h1>
                <Piece />
            </div>
        );
    }

};

export default ListePieces;