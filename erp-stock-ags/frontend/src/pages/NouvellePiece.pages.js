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
        axios.post('http://localhost:3001/piece/addPiece/', piece)
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

    // Contient les différentes possibilités de finition existante dans la DB
    const [choixFinition, setChoixFinition] = useState([])
    console.log("choixFinition")
    console.log(choixFinition)
    // Contient les différentes possibilités de catégorie existante dans la DB
    const [choixCategorie, setChoixCategorie] = useState([])
    // Contient les différentes possibilités de famille existante dans la DB
    const [choixFamille, setChoixFamille] = useState([])

    useEffect(() => {
        axios.get(window.url + "/listeFinitions")
            .then((res) => setChoixFinition(res.data))
    }, [])

    return (

        <div>
            <Navigation />
            <form>
                <div>
                    <label>
                        Ref (ADD100) :
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
                    <select name="choixFinition" id="choixFinition">
                        {choixFinition.map(({ id_finition, nom_finition, effet_finition }) => (
                            <option value={id_finition}>{nom_finition + " - " + effet_finition}</option>
                        ))}
                    </select>
                    {/* <label>
                        id finition (1) :
                        <input
                            type="text"
                            name='finition'
                            pattern="[0-9]*"
                            value={finition}
                            onChange={(e) =>
                                setFinition((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label> */}
                </div>
                <div>
                    <label>
                        id catégorie (1) :
                        <input
                            type="text"
                            name='categorie'
                            pattern="[0-9]*"
                            value={categorie}
                            onChange={(e) =>
                                setCategorie((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        id famille (1) :
                        <input
                            type="text"
                            name='famille'
                            pattern="[0-9]*"
                            value={famille}
                            onChange={(e) =>
                                setFamille((v) => (e.target.validity.valid ? e.target.value : v))
                            }
                        />
                    </label>
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