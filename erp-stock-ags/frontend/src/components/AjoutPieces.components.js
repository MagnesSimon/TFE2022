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
    // Contient l'id du profil 
    const [id_utilisateur, setId_utilisateur] = useState(localStorage.getItem("utilisateur"))
    // date et heure
    // const [date_heure, setDate_heure] = useState(Date)

    // Variable qui contient les données à modifier
    // @reference la récérence de la pièce à modifier
    // @quantite_en_stock la quantité qui doit être mise
    let aModifier = {
        reference: piece.reference,
        quantite_en_stock: parseInt(value) + piece.qte
    }
    // Variable qui contient les données à ajouter dans l'hitorique
    let AEnvoyerHistorique = {
        quantite_modifie: parseInt(value),
        reference: piece.reference,
        id_utilisateur: id_utilisateur,
        date_heure: Date.now
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
        axios.post(window.url + "/historique/addhistorique", AEnvoyerHistorique)
            .then(function (res) {
                console.log('Succes Création fiche Historique')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });
        // refresh de la page après l'envoi de données
        window.location.reload(false);
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