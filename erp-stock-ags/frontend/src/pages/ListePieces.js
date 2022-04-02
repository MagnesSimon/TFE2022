import React from 'react';
import Navigation from '../components/Navigation';
import Piece from '../components/Piece';

const ListePieces = () => {
    return (
        <div>
            <Navigation />
            <h1>Futur tableau avec la liste des pièces</h1>
            <Piece />
        </div>
    );
};

export default ListePieces;