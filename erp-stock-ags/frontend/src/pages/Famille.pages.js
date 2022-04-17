import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';

const Famille = () => {

    const [famille, setFamilles] = useState([])

    useEffect(() => {
        axios.get(window.url + "/listeFamilles/")
            .then((res) => setFamilles(res.data))
    }, [])

    return (
        <div>
            <Navigation />
            <div>
                {/* Création du tableau des pièces */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id famille</th>
                            <th>Nom famille</th>
                            <th>Matériaux</th>
                            <th>Fournisseur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {famille.map(({ id_famille, nom_famille, materiaux, nom_fournisseur }) => (
                            <tr key={id_famille}>
                                <td>{id_famille}</td>
                                <td>{nom_famille}</td>
                                <td>{materiaux}</td>
                                <td>{nom_fournisseur}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Famille;