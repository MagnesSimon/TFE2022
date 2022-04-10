import React, { useEffect, useState } from 'react';
import axios from "axios"
import '../GlobalData'

const Finition = () => {

    // data contient la liste des pièces récupérée depuis la db
    const [finitions, setFinitions] = useState([])
    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des pièces
    useEffect(() => {
        axios.get(window.url + "/listeFinitions")
            .then((res) => setFinitions(res.data))
    }, [])

    return (
        <div>
            {/* Création du tableau des pièces */}
            <table className='tableau'>
                <thead>
                    {/* Colonne faisant office de titre */}
                    <tr>
                        <th>Id finition</th>
                        <th>Nom finition</th>
                        <th>Effet finition</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                    {finitions.map(({ id_finition, nom_finition, effet_finition }) => (
                        <tr key={id_finition}>
                            <td>{nom_finition}</td>
                            <td>{effet_finition}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Finition;