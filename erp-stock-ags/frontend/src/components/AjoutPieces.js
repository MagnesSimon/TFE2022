import React, { useState } from 'react';

const AjoutPieces = () => {

    const [value, setValue] = useState([])
    const Ajouter = () => {
        console.log(value);
    }

    return (
        <div className='ajoutPieceForm'>
            <input
                onChange={event => setValue(event.target.value)}
            ></input>
            <button onClick={Ajouter}>Add</button>
        </div>
    );

}
export default AjoutPieces;