import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation.components';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const NouvellePiece = () => {

    // utiliser  pour changer de page
    const navigate = useNavigate();

    // Variable récupérée dans les inputs
    const [ref, setRef] = useState([])
    const [seuil, setSeuil] = useState([])
    const [quantite, setQuantite] = useState([])
    const [finition, setFinition] = useState([])
    const [categorie, setCategorie] = useState([])
    const [famille, setFamille] = useState([])
    // Contient les différentes possibilités de finition existante dans la DB
    const [choixFinition, setChoixFinition] = useState([])
    // Contient les différentes possibilités de catégorie existante dans la DB
    const [choixCategorie, setChoixCategorie] = useState([])
    // Contient les différentes possibilités de famille existante dans la DB
    const [choixFamille, setChoixFamille] = useState([])

    // Création de l'objet avec les variables récupérées depuis les inputs
    let piece = {
        ref,
        seuil,
        quantite,
        finition,
        categorie,
        famille
    }

    // Fonction pour envoyer une nouvelle pièces vers la DB
    const Envoyer = () => {
        axios.post(window.url + '/piece/addPiece/', piece)
            //axios.post(GlobalData.URL + '/piece/addPiece/', piece)
            .then(function (res) {
                console.log('Succes ajout de pièce')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });

        //navigate('/listePiece');
        GoToListePiece();
    }

    // Fonction pour retourner vers la liste des pièce
    const GoToListePiece = () => {
        navigate('/listePieces');
    }

    // Fonction pour récupérer les listes d'élément
    // Finitions
    // Famille
    // Categorie 
    // Utilisé pour la création des choix déroulant
    useEffect(() => {
        axios.get(window.url + "/listeFinitions")
            .then((res) => setChoixFinition(res.data))
    }, [])
    useEffect(() => {
        axios.get(window.url + "/listeCategories/")
            .then((res) => setChoixCategorie(res.data))
    }, [])
    useEffect(() => {
        axios.get(window.url + "/listeFamilles")
            .then((res) => setChoixFamille(res.data))
    }, [])

    // Fonctions pour récupérer la valeur des choix déroulants sélectionnés
    // et les appliquer au attributs de la pièces
    const finitionHandleChange = (e) => {
        setFinition((v) => (e.target.validity.valid ? e.target.value : v))
    }
    const familleHandleChange = (e) => {
        setFamille((v) => (e.target.validity.valid ? e.target.value : v))
    }
    const catégorieHandleChange = (e) => {
        setCategorie((v) => (e.target.validity.valid ? e.target.value : v))
    }

    return (

        <div>
            <Navigation />
            <form>
                <div>
                    <label>
                        Ref  :
                        <input type="text"
                            name="ref"
                            value={ref}
                            onChange={(e) =>
                                setRef((v) => (e.target.validity.valid ? e.target.value : v))
                            } />
                    </label>
                </div>
                <div>
                    <label>
                        Valeur seuil :
                        <input
                            type="text"
                            name='seuil'
                            pattern="[0-9]*"
                            value={seuil}
                            onChange={(e) =>
                                setSeuil((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Quantité :
                        <input
                            type="text"
                            name='quantite'
                            pattern="[0-9]*"
                            value={quantite}
                            onChange={(e) =>
                                setQuantite((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Finition :
                    </label>
                    <select name="choixFinition"
                        id="selectChoixFinition"
                        value={finition}
                        onChange={finitionHandleChange}>
                        {choixFinition.map(({ id_finition, nom_finition, effet_finition }) => (
                            <option value={id_finition}>
                                {nom_finition + " - " + effet_finition}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>
                        Famille :
                    </label>
                    <select name="choixFamille"
                        id="selectChoixFamille"
                        value={famille}
                        onChange={familleHandleChange}>
                        {choixFamille.map(({ id_famille, nom_famille, materiaux }) => (
                            <option value={id_famille}>{nom_famille + " - " + materiaux}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>
                        Catégorie :
                    </label>
                    <select name="choixCategorie"
                        id="selectChoixCategorie"
                        value={categorie}
                        onChange={catégorieHandleChange}>
                        {choixCategorie.map(({ id_categorie, nom_categorie }) => (
                            <option value={id_categorie}>{nom_categorie}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={Envoyer} >Envoyer </button>
                    <button className="annuler" onClick={GoToListePiece}>Annuler </button>
                </div>
            </form>
        </div>
    );
};

export default NouvellePiece;