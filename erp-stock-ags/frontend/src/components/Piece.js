import React, { useEffect, useState } from 'react';
import axios from "axios"

const Piece = () => {
    const [data, setData] = useState([])

    // Le useEffect se joue quand le composant est monté 
    useEffect(() => {
        axios.get("http://localhost:3001/listePieces")
            .then((res) => setData(res.data))
    }, [])

    return (
        <div>
            <p>Ceci est une pièce</p>
            <table>
                <thead>
                    <tr>
                        <th>Référence</th>
                        <th>Famille</th>
                        <th>Valeur seuil</th>
                        <th>Quantité en stock</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ reference, nom_famille, valeur_seuil, quantite_en_stock }) => (
                        <tr key={reference}>
                            <td>{reference}</td>
                            <td>{nom_famille}</td>
                            <td>{valeur_seuil}</td>
                            <td>{quantite_en_stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Piece;