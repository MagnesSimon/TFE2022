import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation.components';
import axios from 'axios';

const NouvelleFamille = () => {

    const navigate = useNavigate();

    // Variable que l'on récupère dans les inputs
    const [nom_famille, setNom_famille] = useState([])
    const [materiaux, setMateriaux] = useState([])
    const [id_fournisseur, setId_fournisseur] = useState([])

    // Contient les différentes possibilitées des localités
    const [choixFournisseur, setChoixFournisseur] = useState([])

    // Création de l'objet
    let famille = {
        nom_famille,
        materiaux,
        id_fournisseur
    }

    // Fonction pour envoyer une nouvelle pièces vers la DB
    const Envoyer = () => {
        axios.post('http://localhost:3001/listeFamilles/addFamille/', famille)
            .then(function (res) {
                console.log('Succes ajout de famille', res.data)
            })
            .catch(function (err) {
                console.log("Error: ", err)
            });
        GoToListeFamille();
    }
    // Fonction pour retourner vers la liste des fournisseurs
    const GoToListeFamille = () => {
        navigate('/familles');
    }

    /*
    Récupération de la liste des localite
    */
    useEffect(() => {
        axios.get(window.url + "/fournisseur/")
            .then((res) => setChoixFournisseur(res.data))
    }, [])

    // Fonction pour récupérer la valeur dans la liste déroulante
    const fournisseurHandleChange = (e) => {
        setId_fournisseur((v) => (e.target.validity.valid ? e.target.value : v))
    }

    return (
        <div>
            <Navigation />
            <form >
                <div>
                    <label >
                        Nom de la famille
                        <input type="text"
                            name='nom_famille'
                            value={nom_famille}
                            onChange={(e) => setNom_famille((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Matériaux
                        <input type="text"
                            name='matériaux'
                            value={materiaux}
                            onChange={(e) => setMateriaux((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label>
                        Localité
                    </label>
                    <select name="choixFournisseur"
                        id="selectChoixFournisseur"
                        value={id_fournisseur}
                        onChange={fournisseurHandleChange}>
                        {choixFournisseur.map(({ id_fournisseur,
                            nom_fournisseur,
                            mail_fournisseur,
                            tel_fournisseur,
                            adresse_fournisseur,
                            id_localite }) => (
                            <option value={id_fournisseur}>
                                {nom_fournisseur}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={Envoyer} >Envoyer </button>
                    <button className="annuler" onClick={GoToListeFamille}>Annuler </button>
                </div>
            </form>
        </div>

    );
};
export default NouvelleFamille;