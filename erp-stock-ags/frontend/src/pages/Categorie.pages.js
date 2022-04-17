import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';

const Categorie = () => {

    const [categorie, setCategorie] = useState([])

    useEffect(() => {
        axios.get(window.url + "/listeCategories/")
            .then((res) => setCategorie(res.data))
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
                            <th>Id catégorie</th>
                            <th>Nom catégorie</th>
                            <th>Pôle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {categorie.map(({ id_categorie, nom_categorie, pole }) => (
                            <tr key={id_categorie}>
                                <td>{id_categorie}</td>
                                <td>{nom_categorie}</td>
                                <td>{pole}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categorie;