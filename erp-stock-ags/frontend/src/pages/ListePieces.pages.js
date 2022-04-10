import React from 'react';
import Navigation from '../components/Navigation.components';
import Piece from '../components/Piece.components';
import { NavLink } from 'react-router-dom';

const ListePieces = () => {

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
};

export default ListePieces;