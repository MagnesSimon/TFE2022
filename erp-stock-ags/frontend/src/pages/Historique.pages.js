import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';
import moment from "moment";


const Historique = () => {

    // Variable qui reprend la liste des fiche historiques
    const [historique, setHistorique] = useState([])
    const [date, setDate] = useState()
    console.log(historique)

    // Permet de récupérer la liste des fournisseur depuis l'API
    useEffect(() => {
        axios.get(window.url + "/historique/")
            .then((res) => setHistorique(res.data))

    }, [])

    // Variable pour faire la recherche
    const [recherche, setRecherche] = useState("")
    // Fonction pour récupérer les éléments de la recherche
    const search = () => {
        if (recherche === "") {
            axios.get(window.url + "/historique/")
                .then((res) => setHistorique(res.data))
        } else {
            axios.get(window.url + "/historique/search/" + recherche)
                .then((res) => setHistorique(res.data))
        }
    }

    // Pour choisir l'historique d'un utilisateur particulier
    const [choixUtilisateur, setChoixUtilisateur] = useState([])
    useEffect(() => {
        axios.get(window.url + "/listeUtilisateur/")
            .then((res) => setChoixUtilisateur(res.data))
    }, [])
    // Pour choisir l'historique en fonction de la réference
    const [choixreference, setChoixReference] = useState([])
    useEffect(() => {
        axios.get(window.url + "/listePieces/")
            .then((res) => setChoixReference(res.data))
    }, [])

    // Variable pour l'historique en fonction de la ref et du user
    const [id_utilisateurToSend, setId_utilisateurToSend] = useState("Tous")
    const [referenceToSend, setReferenceToSend] = useState("Tous")
    // Objet qui sera envoyé à la DB
    let filtre = {
        id_utilisateurToSend,
        referenceToSend
    }
    // Fonctions pour récupérer la valeur des choix déroulants sélectionnés
    // et les appliquer au attributs de la pièces
    const utilisateurHandleChange = (e) => {
        setId_utilisateurToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }

    const referenceHandleChange = (e) => {
        setReferenceToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }

    const filtrage = () => {
        // Si on selectione "Tous" pour les deux
        if (id_utilisateurToSend === "Tous" && referenceToSend === "Tous") {
            axios.get(window.url + "/historique/")
                .then((res) => setHistorique(res.data))
        }
        // Si tous les utilisateur
        else if (id_utilisateurToSend === "Tous" && referenceToSend !== "Tous") {
            axios.get(window.url + "/historique/byRef/" + referenceToSend)
                .then((res) => setHistorique(res.data))
        }
        // Si toutes les ref
        else if (referenceToSend === "Tous" && id_utilisateurToSend !== "Tous") {
            axios.get(window.url + "/historique/byUser/" + id_utilisateurToSend)
                .then((res) => setHistorique(res.data))
        } else {
            axios.get(window.url + "/historique/byUserAndRef/" + referenceToSend + "/" + id_utilisateurToSend)
                .then((res) => setHistorique(res.data))
        }
    }

    return (
        <div>
            <Navigation></Navigation>
            <h1>Historique</h1>
            {/* Module de recherche */}
            <input type="text"
                value={recherche}
                placeholder='Recherche'
                onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
            />
            <button onClick={search}>Rechercher</button>
            <span>    </span>
            {/* Module pour le choix de l'utilisateur */}
            <select name="choixUtilisateur"
                id="selectChoixUtilisateur"
                value={id_utilisateurToSend}
                onChange={utilisateurHandleChange}>
                <option value="Tous">Tous</option>
                {choixUtilisateur.map(({ id_utilisateur, nom_utilisateur }) => (
                    <option value={id_utilisateur}>
                        {nom_utilisateur}
                    </option>
                ))}
            </select>
            {/* Module pour le choix de l'utilisateur */}
            <select name="choixReference"
                id="selectChoixReference"
                value={referenceToSend}
                onChange={referenceHandleChange}>
                <option value="Tous">Toutes</option>
                {choixreference.map(({ reference }) => (
                    <option value={reference}>
                        {reference}
                    </option>
                ))}
            </select>
            <button onClick={filtrage}>Filtrer</button>
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
                            <td>{moment(date_heure).format('DD-MM-YY - HH:mm')}</td>
                            <td>{quantite_modifie}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Historique;