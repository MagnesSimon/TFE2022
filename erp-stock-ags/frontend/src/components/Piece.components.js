import React, { useEffect, useState } from 'react';
import axios from "axios"
import AjoutPieces from './AjoutPieces.components';
import '../GlobalData'

const Piece = () => {

    // function refreshPage() {
    //     window.location.reload();
    // }

    // data contient la liste des pièces récupérée depuis la db
    const [data, setData] = useState([])
    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des pièces
    useEffect(() => {
        axios.get(window.url + "/listePieces")
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
                                <AjoutPieces key={reference}
                                    reference={reference}
                                    qte={quantite_en_stock} />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Piece;