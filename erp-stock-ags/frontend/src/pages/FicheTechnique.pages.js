import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation.components';


const FicheTechnique = () => {

    const [piece, setPiece] = useState

    const navigate = useNavigate();
    // Revenir à la liste des pièces
    const GoToListePiece = () => {
        navigate('/listePieces');
    }

    return (
        <div>
            <button onClick={GoToListePiece}>Retour</button>
            <div>
                <p>{piece}</p>
            </div>
        </div>
    );
};

export default FicheTechnique;