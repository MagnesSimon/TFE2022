import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation.components';
import axios from 'axios';
import '../GlobalData'

const NouveauFournisseur = () => {

    const navigate = useNavigate();

    // Variable que l'on récupère dans les inputs
    const [nom_fournisseur, setNom_fournisseur] = useState([])
    const [mail_fournisseur, setMail_fournisseur] = useState([])
    const [tel_fournisseur, setTel_fournisseur] = useState([])
    const [adresse_fournisseur, setAdresse_fournisseur] = useState([])
    const [id_localite, setId_localite] = useState([])

    // Contient les différentes possibilitées des localités
    const [choixLocalite, setChoixLocalite] = useState([])

    // Création de l'objet
    let fournisseur = {
        nom_fournisseur,
        mail_fournisseur,
        tel_fournisseur,
        adresse_fournisseur,
        id_localite
    }

    // Fonction pour envoyer une nouvelle pièces vers la DB
    const Envoyer = () => {
        axios.post(window.url + '/fournisseur/addFournisseur/', fournisseur)
            .then(function (res) {
                console.log('Succes ajout de fournisseur', res.data)
            })
            .catch(function (err) {
                console.log("Error: ", err)
            });
        GoToListeFournisseur();
    }
    // Fonction pour retourner vers la liste des fournisseurs
    const GoToListeFournisseur = () => {
        navigate('/fournisseur');
    }

    /*
    Récupération de la liste des localite
    */
    useEffect(() => {
        axios.get(window.url + "/localite/")
            .then((res) => setChoixLocalite(res.data))
    }, [])

    // Fonction pour récupérer la valeur dans la liste déroulante
    const localiteHandleChange = (e) => {
        setId_localite((v) => (e.target.validity.valid ? e.target.value : v))
    }


    return (
        <div>
            <Navigation />
            <form >
                <div>
                    <label >
                        Nom du fournisseur
                        <input type="text"
                            name='nom_fournisseur'
                            value={nom_fournisseur}
                            onChange={(e) => setNom_fournisseur((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Mail du fournisseur
                        <input type="text"
                            name='mail_fournisseur'
                            value={mail_fournisseur}
                            onChange={(e) => setMail_fournisseur((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Téléphone du fournisseur
                        <input type="text"
                            name='tel_fournisseur'
                            value={tel_fournisseur}
                            onChange={(e) => setTel_fournisseur((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse du fournisseur
                        <input type="text"
                            name='adresse_fournisseur'
                            value={adresse_fournisseur}
                            onChange={(e) => setAdresse_fournisseur((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label>
                        Localité
                    </label>
                    <select name="choixLocalite"
                        id="selectChoixLocalite"
                        value={id_localite}
                        onChange={localiteHandleChange}>
                        {choixLocalite.map(({ id_localite, code_postal, nom_localite }) => (
                            <option value={id_localite}>
                                {code_postal + " - " + nom_localite}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={Envoyer} >Envoyer </button>
                    <button className="annuler" onClick={GoToListeFournisseur}>Annuler </button>
                </div>
            </form>
        </div>

    );
};

export default NouveauFournisseur;