import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';


const Historique = () => {

    // Variable qui reprend la liste des fiche historiques
    const [historique, setHistorique] = useState([])

    // Permet de récupérer la liste des fournisseur depuis l'API
    useEffect(() => {
        axios.get(window.url + "/historique/")
            .then((res) => setHistorique(res.data))
    }, [])

    return (
        <div>
            <Navigation></Navigation>
            <h1>Historique</h1>
            {/* Création du tableau des fiche historique */}
            <table className='tableau'>
                <thead>
                    {/* Colonne faisant office de titre */}
                    <tr>
                        <th>Référence</th>
                        <th>Utilisateur</th>
                        <th>Date </th>
                        <th>Modification</th>
                    </tr>
                </thead>
                <tbody>
                    {historique.map(({ id_fiche_historique,
                        quantite_modifie,
                        date_heure,
                        reference,
                        id_utilisateur,
                        nom_utilisateur, }) => (
                        <tr key={id_fiche_historique}>
                            <td >{reference}</td>
                            <td>{nom_utilisateur}</td>
                            <td>{date_heure}</td>
                            <td>{quantite_modifie}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Historique;