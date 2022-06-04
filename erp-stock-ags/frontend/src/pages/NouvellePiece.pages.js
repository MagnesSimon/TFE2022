import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation.components';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const NouvellePiece = () => {

    // utiliser  pour changer de page
    const navigate = useNavigate();

    // Variable récupérée dans les inputs
    const [ref = "/", setRef] = useState([])
    const [seuil = 0, setSeuil] = useState([])
    const [quantite = 0, setQuantite] = useState([])
    const [longueur = 0, setLongueur] = useState([])
    const [largeur = 0, setLargeur] = useState([])
    const [hauteur = 0, setHauteur] = useState([])
    const [rayon = 0, setRayon] = useState([])
    const [poids = 0, setPoids] = useState([])
    //Clé étrangère depuis les choix
    const [finition, setFinition] = useState(1)
    const [famille, setFamille] = useState(1)
    // Contient les différentes possibilités de finition existante dans la DB
    const [choixFinition, setChoixFinition] = useState([])
    // Contient les différentes possibilités de famille existante dans la DB
    const [choixFamille, setChoixFamille] = useState([])

    // Création de l'objet avec les variables récupérées depuis les inputs
    let piece = {
        ref,
        seuil,
        quantite,
        longueur,
        largeur,
        hauteur,
        rayon,
        poids,
        finition,
        famille
    }

    const Remplissage = () => {
        console.log("piece", piece)
        if (seuil == "") {
            piece.seuil = 0
        }
        if (quantite == "") {
            piece.quantite = 0
        }
        if (longueur == "") {
            piece.longueur = 0
        }
        if (largeur == "") {
            piece.largeur = 0
        }
        if (hauteur == "") {
            piece.hauteur = 0
        }
        if (rayon == "") {
            piece.rayon = 0
        }
        if (poids == "") {
            piece.poids = 0
        }
        Envoyer();
    }
    // Fonction pour envoyer une nouvelle pièces vers la DB
    const Envoyer = () => {
        console.log(piece)
        axios.post(window.url + '/listePieces/addpiece', piece)
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
                        Longueur :
                        <input
                            type="text"
                            name='longueur'
                            pattern="[0-9]*"
                            value={longueur}
                            onChange={(e) =>
                                setLongueur((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Largeur :
                        <input
                            type="text"
                            name='largeur'
                            pattern="[0-9]*"
                            value={largeur}
                            onChange={(e) =>
                                setLargeur((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Hauteur :
                        <input
                            type="text"
                            name='hauteur'
                            pattern="[0-9]*"
                            value={hauteur}
                            onChange={(e) =>
                                setHauteur((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Rayon :
                        <input
                            type="text"
                            name='rayon'
                            pattern="[0-9]*"
                            value={rayon}
                            onChange={(e) =>
                                setRayon((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Poids :
                        <input
                            type="text"
                            name='poids'
                            pattern="[0-9]*"
                            value={poids}
                            onChange={(e) =>
                                setPoids((v) => (e.target.validity.valid ? e.target.value : v))
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
                    <button onClick={Remplissage} >Envoyer </button>
                    <button className="annuler" onClick={GoToListePiece}>Annuler </button>
                </div>
            </form>
        </div>
    );
};

export default NouvellePiece;