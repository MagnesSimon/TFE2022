import axios from 'axios';
import React, { useState } from 'react';

const AjoutPieces = (piece) => {

    // Contient la valeur encodée dans l'input quantité de pièce
    const [value, setValue] = useState([])
    const [axiosData, setAxiosData] = useState([])

    let aModifier = {
        reference: piece.reference,
        quantite_en_stock: value
    }

    const Ajouter = () => {
        console.log(value + " pour " + piece.reference);
        axios.post("http://localhost:3001/listePieces/updateOne", aModifier)
            .then(function (res) {
                console.log('Succes Modification quantite')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });
    }

    // Input avec un champ ou il est possible d'encoder que des nombre
    // Et bouton qui permet d'ajouter la valeur reprise dans l'input à la quantité
    return (
        <div className='ajoutPieceForm'>
            <input
                type="text"
                pattern="[0-9]*"
                value={value}
                onChange={(e) =>
                    setValue((value) => (e.target.validity.valid ? e.target.value : value))
                }
            />
            <button onClick={Ajouter}>Add</button>
        </div>
    );

}
export default AjoutPieces;