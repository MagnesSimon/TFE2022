import React, { useEffect, useState } from 'react';
import axios from "axios"
import AjoutPieces from './AjoutPieces';

const Piece = () => {
    const [data, setData] = useState([])
    const [value, setValue] = useState(0)

    const Ajouter = () => {
        console.log(AjoutPieces.getValue());
    }

    // Le useEffect se joue quand le composant est monté 
    useEffect(() => {
        axios.get("http://localhost:3001/listePieces")
            .then((res) => setData(res.data))
    }, [])

    return (
        <div>
            {/* Création du tableau des pièces */}
            <table className='tableau'>
                <thead>
                    {/* Colonne faisant office de titre */}
                    <tr>
                        <th>Référence</th>
                        <th>Famille</th>
                        <th>Valeur seuil</th>
                        <th>Quantité en stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                    {data.map(({ reference, nom_famille, valeur_seuil, quantite_en_stock }) => (
                        <tr key={reference}>
                            <td>{reference}</td>
                            <td>{nom_famille}</td>
                            <td>{valeur_seuil}</td>
                            <td>{quantite_en_stock}</td>
                            <td>
                                <AjoutPieces key={reference} reference={reference} />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Piece;