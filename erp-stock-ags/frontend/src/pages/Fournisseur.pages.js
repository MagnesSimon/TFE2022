import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';
import { NavLink } from 'react-router-dom';

const Fournisseur = () => {

    const [fournisseur, setFournisseur] = useState([])

    useEffect(() => {
        axios.get(window.url + "/fournisseur/")
            .then((res) => setFournisseur(res.data))
    }, [])

    return (
        <div>
            <Navigation />
            <div>
                <NavLink to='/nouveauFournisseur' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Ajouter un fournisseur</li>
                </NavLink>
            </div>
            <div>
                {/* Création du tableau des pièces */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id fournisseur</th>
                            <th>Nom fournisseur</th>
                            <th>mail </th>
                            <th>telephone</th>
                            <th>adresse</th>
                            <th>Localite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseur.map(({ id_fournisseur,
                            nom_fournisseur,
                            mail_fournisseur,
                            tel_fournisseur,
                            adresse_fournisseur,
                            code_postal,
                            nom_localite }) => (
                            <tr key={id_fournisseur}>
                                <td>{id_fournisseur}</td>
                                <td>{nom_fournisseur}</td>
                                <td>{mail_fournisseur}</td>
                                <td>{tel_fournisseur}</td>
                                <td>{adresse_fournisseur}</td>
                                <td>{code_postal + ' - ' + nom_localite}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Fournisseur;