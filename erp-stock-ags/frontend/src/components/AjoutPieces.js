import axios from 'axios';
import React, { useState } from 'react';
import "../GlobalData"

const AjoutPieces = (piece) => {

    // Fonction permettant de refresh la page quand elle est appelée
    function refreshPage() {
        window.location.reload();
    }

    // Contient la valeur encodée dans l'input quantité de pièce
    const [value, setValue] = useState([])
    const [axiosData, setAxiosData] = useState([])

    // Variable qui contient les données à modifier
    // @reference la récérence de la pièce à modifier
    // @quantite_en_stock la quantité qui doit être mise
    let aModifier = {
        reference: piece.reference,
        quantite_en_stock: parseInt(value) + piece.qte
    }

    // Fonction qui permet de modifier la quantite
    // Fait une requete qui envoie les données  à l'API
    const ModifierQte = () => {
        axios.post(window.url + "/listePieces/updateOne", aModifier)
            .then(function (res) {
                console.log('Succes Modification quantite')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });

        // refresh de la page après l'envoi de données
        refreshPage();
    }

    // Input avec un champ ou il est possible d'encoder que des nombre
    // Et bouton qui permet d'ajouter la valeur reprise dans l'input à la quantité
    return (
        <div className='ajoutPieceForm'>
            <input
                type="number"
                value={value}
                onChange={(e) =>
                    setValue((value) => (e.target.validity.valid ? e.target.value : value))
                }
            />
            <button onClick={ModifierQte}>Add</button>
        </div>
    );
}

export default AjoutPieces;