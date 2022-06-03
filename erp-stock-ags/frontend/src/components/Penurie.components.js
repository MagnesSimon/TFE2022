import React, { useEffect, useState } from 'react';
import axios from "axios"
import '../GlobalData'

const ListePenurie = () => {

    // data contient la liste des pièces récupérée depuis la db
    const [data, setData] = useState([])

    // Le useEffect se joue quand le composant est monté 
    useEffect(() => {
        axios.get(window.url + "/listePenurie")
            .then((res) => setData(res.data))
    }, [])

    // Variable pour faire la recharche
    const [recherche, setRecherche] = useState("")
    // Fonction pour récupérer les éléments de la recherche
    const search = () => {
        if (recherche === "") {
            axios.get(window.url + "/listePenurie")
                .then((res) => setData(res.data))
        } else {
            axios.get(window.url + "/listePenurie/search/" + recherche)
                .then((res) => setData(res.data))
        }
    }

    return (
        <div>
            <input type="text"
                value={recherche}
                placeholder='Recherche'
                onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
            />
            <button onClick={search}>Rechercher</button>
            {/* Création du tableau des pièces */}
            <table className='tableau'>
                <thead>
                    {/* Colonne faisant office de titre */}
                    <tr>
                        <th>Référence</th>
                        <th>Famille</th>
                        <th>Valeur seuil</th>
                        <th>Quantité en stock</th>
                        <th>Déficit</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                    {data.map(({ reference, nom_famille, materiaux, valeur_seuil, quantite_en_stock }) => (
                        <tr key={reference}>
                            <td>{reference}</td>
                            <td>{nom_famille + " en " + materiaux}</td>
                            <td>{valeur_seuil}</td>
                            <td>{quantite_en_stock}</td>
                            <td>{valeur_seuil - quantite_en_stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default ListePenurie;