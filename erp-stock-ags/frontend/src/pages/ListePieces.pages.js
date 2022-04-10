import React from 'react';
import Navigation from '../components/Navigation.components';
import Piece from '../components/Piece.components';

const ListePieces = () => {
    return (
        <div>
            <Navigation />
            <h1>Liste des pièces dans le stock</h1>
            <Piece />
        </div>
    );
};

export default ListePieces;