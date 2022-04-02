import React, { useEffect } from 'react';
import axios from "axios"

const Piece = () => {

    // Le useEffect se joue quand le composant est monté 
    useEffect(() => {
        axios.get("http://localhost:3001/listePieces").then((res) => console.log(res.data))
    }, [])

    return (
        <div>
            <p>Ceci est une pièce</p>
        </div>
    );
};

export default Piece;