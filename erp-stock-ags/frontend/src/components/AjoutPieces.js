import React, { useEffect, useState } from 'react';

const AjoutPieces = (piece) => {

    // console.log(piece.reference)

    const [value, setValue] = useState([])
    const Ajouter = () => {
        console.log(value + " pour " + piece.reference);
    }

    function getValue() {
        return value;
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