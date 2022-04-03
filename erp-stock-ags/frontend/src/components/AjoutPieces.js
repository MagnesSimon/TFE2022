import React, { useState } from 'react';

const AjoutPieces = (piece) => {

    const [value, setValue] = useState([])
    const Ajouter = () => {
        console.log(value + " pour " + piece.reference);
    }

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