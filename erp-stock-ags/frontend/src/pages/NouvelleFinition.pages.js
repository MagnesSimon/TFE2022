import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation.components';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const NouvelleFinition = () => {

    const navigate = useNavigate();

    // Variables qui vont être récupérées depuis les inputs
    const [nom_finition, setNom_finition] = useState([])
    const [effet_finition, setEffet_finition] = useState([])

    // Objet qui va être envoyé au backend
    let finition = {
        nom_finition,
        effet_finition
    }

    // Fonction pour retourner vers la liste des pièce
    const GoToListeFinition = () => {
        navigate('/finitions/');
    }

    const Envoyer = () => {
        // axios.post('http://localhost:3001/piece/addPiece/', piece)
        //     //axios.post(GlobalData.URL + '/piece/addPiece/', piece)
        //     .then(function (res) {
        //         console.log('Succes ajout de pièce')
        //         console.log(res.data)
        //     })
        //     .catch(function (err) {
        //         console.log("Error: ")
        //         console.log(err)
        //     });

        //navigate('/listePiece');
        GoToListeFinition();
    }

    return (
        <div>
            <Navigation />
            <div>
                <form action="onSubmit">
                    <div>
                        <label>
                            Nom de la finition
                            <input type="text"
                                name='nom_finition'
                                value={nom_finition}
                                onChange={(e) => setNom_finition((v) => (e.target.validity.valid ? e.target.value : v))} />
                        </label>
                    </div>
                    <div>
                        <label >
                            Effet de la finition
                            <input type="text"
                                name='effet_finition'
                                value={effet_finition}
                                onChange={(e) => setEffet_finition((v) => (e.target.validity.valid ? e.target.value : v))} />
                        </label>
                    </div>
                    <div>
                        <button onClick={Envoyer} >Envoyer </button>
                        <button className="annuler" onClick={GoToListeFinition}>Annuler </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NouvelleFinition;