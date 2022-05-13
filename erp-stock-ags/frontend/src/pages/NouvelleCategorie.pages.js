import React, { useState } from 'react';
import Navigation from '../components/Navigation.components';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const NouvelleCategorie = () => {

    const navigate = useNavigate();

    // Variables qui vont être récupérées depuis les inputs
    const [nom_categorie, setNom_categorie] = useState([])
    const [pole, set_pole] = useState([])

    // Objet qui va être envoyé au backend
    let categorie = {
        nom_categorie,
        pole
    }

    // Fonction pour retourner vers la liste des pièce
    const GoToListeCategorie = () => {
        navigate('/categorie/');
    }

    const Envoyer = () => {
        axios.post(window.url + '/listeCategories/addCategorie', categorie)
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ", err)
            });

        GoToListeCategorie();
    }

    return (
        <div>
            <Navigation />
            <div>
                <form>
                    <div>
                        <label>
                            Nom de la catégorie
                            <input type="text"
                                name='nom_categorie'
                                value={nom_categorie}
                                onChange={(e) => setNom_categorie((v) => (e.target.validity.valid ? e.target.value : v))} />
                        </label>
                    </div>
                    <div>
                        <label >
                            Pole
                            <input type="text"
                                name='pole'
                                value={pole}
                                onChange={(e) => set_pole((v) => (e.target.validity.valid ? e.target.value : v))} />
                        </label>
                    </div>
                    <div>
                        <button onClick={Envoyer} >Envoyer </button>
                        <button className="annuler" onClick={GoToListeCategorie}>Annuler </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NouvelleCategorie;