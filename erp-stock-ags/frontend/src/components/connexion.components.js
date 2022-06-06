import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';
import axios from 'axios';
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import { Navigate } from 'react-router-dom';


const Connexion = () => {

    // Constient la liste des utilisateurs
    const [listeUtilisateur, setListeUtilisateur] = useState([])
    // Contient les infos que l'utilisateur encode
    const [nom_utilisateur, setNom_utilisateur] = useState('')
    const [mot_de_passe, setMot_de_passe] = useState('')
    // Contient l'état de connexion
    const [connecte, setConnecte] = useState();
    // définit sur false au chargement

    // Permet de récupérer la liste des utilisateurs depuis l'API
    useEffect(() => {
        axios.get(window.url + "/listeUtilisateur")
            .then((res) => setListeUtilisateur(res.data))
    }, [])

    const bounce = cssTransition({
        enter: "animate__animated animate__bounceIn",
        exit: "animate__animated animate__bounceOut"
    });

    const seConnecter = () => {
        setConnecte(false)
        // Remise à false partout
        localStorage.setItem("isOuvrier", false)
        localStorage.setItem("isEtudiant", false)
        localStorage.setItem("isEmploye", false)
        localStorage.setItem("isAdmin", false)

        listeUtilisateur.find((user) => {
            if (nom_utilisateur === user.nom_utilisateur && mot_de_passe === user.mot_de_passe) {
                if (user.id_profil === '5') {
                    window.alert('Votre profil est archivé, vous ne pouvez pas vous connecter')
                } else {
                    setConnecte(true)
                    localStorage.setItem("utilisateur", user.id_utilisateur);
                    localStorage.setItem("profil", user.id_profil);
                }
                if (user.id_profil === '4') {
                    localStorage.setItem("isOuvrier", true)
                    localStorage.setItem("isEtudiant", false)
                    localStorage.setItem("isEmploye", false)
                    localStorage.setItem("isAdmin", false)
                } else if (user.id_profil === '3') {
                    localStorage.setItem("isOuvrier", true)
                    localStorage.setItem("isEtudiant", true)
                    localStorage.setItem("isEmploye", false)
                    localStorage.setItem("isAdmin", false)
                } else if (user.id_profil === '2') {
                    localStorage.setItem("isOuvrier", true)
                    localStorage.setItem("isEtudiant", true)
                    localStorage.setItem("isEmploye", true)
                    localStorage.setItem("isAdmin", false)
                } else if (user.id_profil === '1') {
                    localStorage.setItem("isOuvrier", true)
                    localStorage.setItem("isEtudiant", true)
                    localStorage.setItem("isEmploye", true)
                    localStorage.setItem("isAdmin", true)
                }
                toast.dark("Vous êtes connecté", {
                    transition: bounce
                });
            }
        })
        if (connecte === false) {
            alert("Identifiants incorrects")
        }
        window.location.reload(true)
        // Navigate('/listePieces')
    }

    return (
        <div>
            <Navigation />
            <ToastContainer />
            <h1>Connexion</h1>
            <div id="contact-form">
                <label >Nom d'utilisateur :</label>
                <input
                    type="texte"
                    placeholder='username'
                    id="username"
                    name="username"
                    value={nom_utilisateur}
                    onChange={(e) =>
                        setNom_utilisateur((v) =>
                            (e.target.validity.valid ? e.target.value : v))}
                    required />
            </div>
            <div>
                <label htmlFor="mot_de_passe">Mot de passe :</label>
                <input
                    type="password"
                    placeholder='Password'
                    id="mot_de_passe"
                    name="mot_de_passe"
                    value={mot_de_passe}
                    onChange={(e) =>
                        setMot_de_passe((v) =>
                            (e.target.validity.valid ? e.target.value : v))}
                    required />
            </div>
            <div>
                <button
                    className='btn btn-primary'
                    id="connection"
                    name="connection"
                    onClick={seConnecter}>Se connecter</button>
            </div>

        </div>
    );
};

export default Connexion