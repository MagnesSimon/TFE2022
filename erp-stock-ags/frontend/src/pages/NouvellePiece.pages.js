import React, { useState } from 'react';
import Navigation from '../components/Navigation.components';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const NouvellePiece = () => {

    const [ref, setRef] = useState([])
    const [seuil, setSeuil] = useState([])
    const [quantite, setQuantite] = useState([])
    const [finition, setFinition] = useState([])
    const [categorie, setCategorie] = useState([])
    const [famille, setFamille] = useState([])

    let piece = {
        ref,
        seuil,
        quantite,
        finition,
        categorie,
        famille
    }

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
    }

    const navigate = useNavigate();

    const GoToHome = () => {
        navigate('/listePiece');
    }

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
                    </label>
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
                    <button className="annuler" onClick={GoToHome}>Annuler </button>
                </div>
            </form>
        </div>
    );
};

export default NouvellePiece;