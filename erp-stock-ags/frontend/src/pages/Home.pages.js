import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';
import axios from 'axios';

const Home = () => {

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

    const seConnecter = () => {
        setConnecte(false)
        console.log("Liste: ", listeUtilisateur)
        console.log("Username:", nom_utilisateur)
        console.log("Mdp :", mot_de_passe)

        listeUtilisateur.find((user) => {
            if (nom_utilisateur == user.nom_utilisateur && mot_de_passe == user.mot_de_passe) {
                setConnecte(true)
                alert("Connecté")
            }
        })

        if (connecte == false) {
            alert("Identifiants incorrects")
        }
    }



    return (
        <div>
            <Navigation />
            <h1>Home</h1>
            <h2>Se connecter</h2>
            <div id="contact-form">
                <label >Nom d'utilisateur :</label>
                <input
                    type="texte"
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

export default Home;