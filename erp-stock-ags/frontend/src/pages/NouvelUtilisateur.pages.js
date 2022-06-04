import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation.components';
import axios from 'axios';
import '../GlobalData'

const NouvelUtilisateur = () => {

    const navigate = useNavigate();

    // Variable que l'on récupère dans les inputs
    const [nom_utilisateur, setNom_utilisateur] = useState([])
    const [mot_de_passe, setMot_de_passe] = useState([])
    const [confirmMot_de_passe, setConfirm_mot_de_passe] = useState([])
    const [prenom_utilisateur, setPrenom_utilisateur] = useState([])
    const [nom_famille_utilisateur, setNom_famille_utilisateur] = useState([])
    const [telephone_utilisateur, setTelephone_utilisateur] = useState([])
    const [id_profil, setId_profil] = useState([])

    // Contient les différentes possibilitées des profils
    const [choixProfil, setChoixProfil] = useState([])

    // Création de l'objet
    let utilisateur = {
        nom_utilisateur,
        mot_de_passe,
        confirmMot_de_passe,
        prenom_utilisateur,
        nom_famille_utilisateur,
        telephone_utilisateur,
        id_profil
    }
    // Fonction pour envoyer un nouvel utilisateur vers la DB
    const Envoyer = () => {
        if (mot_de_passe === confirmMot_de_passe) {
            axios.post(window.url + '/listeUtilisateur/addUtilisateur', utilisateur)
                .then(function (res) {
                    console.log('Succes ajout d utilisateur', res.data)
                })
                .catch(function (err) {
                    console.log("Error: ", err)
                });
            GoToListeUtilisateur();
        } else {
            window.alert("Mot de passe et confirmation non valide")
        }
    }

    // Fonction pour retourner vers la liste des fournisseurs
    const GoToListeUtilisateur = () => {
        navigate('/utilisateur');
    }

    /*
    Récupération de la liste des profils
    */
    useEffect(() => {
        axios.get(window.url + "/listeProfil/")
            .then((res) => setChoixProfil(res.data))
    }, [])

    // Fonction pour récupérer la valeur dans la liste déroulante
    const profilHandleChange = (e) => {
        setId_profil((v) => (e.target.validity.valid ? e.target.value : v))
    }

    return (
        <div>
            <Navigation />
            <form >
                <div>
                    <label >
                        Username
                        <input type="text"
                            name='Username'
                            value={nom_utilisateur}
                            onChange={(e) => setNom_utilisateur((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        Mot de passe
                        <input type="password"
                            name='mot_de_passe'
                            value={mot_de_passe}
                            onChange={(e) => setMot_de_passe((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                    <div>
                        <label htmlFor="">
                            Confirmer le mot de passe
                            <input type="password"
                                name='confirm_mot_de_passe'
                                value={confirmMot_de_passe}
                                onChange={(e) => setConfirm_mot_de_passe((v) => (e.target.validity.valid ? e.target.value : v))} />
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="">
                        Prénom
                        <input type="text"
                            name='prenom'
                            value={prenom_utilisateur}
                            onChange={(e) => setPrenom_utilisateur((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label>
                        Nom de famille
                        <input type="text"
                            name='nom_famille'
                            value={nom_famille_utilisateur}
                            onChange={(e) => setNom_famille_utilisateur((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label>
                        téléphone
                        <input type="text"
                            name='tel'
                            pattern="[0-9]*"
                            value={telephone_utilisateur}
                            onChange={(e) => setTelephone_utilisateur((v) => (e.target.validity.valid ? e.target.value : v))} />
                    </label>
                </div>
                <div>
                    <label>
                        Profil
                    </label>
                    <select name="choixLocalite"
                        id="selectChoixLocalite"
                        value={id_profil}
                        onChange={profilHandleChange}>
                        {choixProfil.map(({ id_profil, libelle_profil }) => (
                            <option value={id_profil}>
                                {libelle_profil}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={Envoyer} >Envoyer </button>
                    <button className="annuler" onClick={GoToListeUtilisateur}>Annuler </button>
                </div>
            </form>
        </div>
    );
};

export default NouvelUtilisateur;