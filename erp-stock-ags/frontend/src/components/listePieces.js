import '../styles/listePieces.css'

const data =[
    {
        reference:"TST101",
        nom_famille:"famille test",
        valeur_seuil:12,
        quantite_en_stock:55
    },    {
        reference:"TST102",
        nom_famille:"famille test",
        valeur_seuil:12,
        quantite_en_stock:55
    }
]

function ListePieces(){ 
    return( 
        <table className='lmj-tableauListe'>
            <thead>
                <tr>
                    <th>Référence</th>
                    <th>Famille</th>
                    <th>Valeur seuil</th>
                    <th>Quantité en stock</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({reference, nom_famille, valeur_seuil, quantite_en_stock}) =>(
                    <tr key={reference}>
                        <td>{reference}</td>
                        <td>{nom_famille}</td>
                        <td>{valeur_seuil}</td>
                        <td>{quantite_en_stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
       );
    /* 
    return(
        <div>
            <h1 className="lmj-listePieces">Liste des pieces en stock</h1>
            <table className='lmj-element'>
                array.forEach(element => {
                });
                <tr>
                {data.map((el)=>(
                    <td>{"el.reference"}</td>,
                    <td>{"el.nom_famille"}</td>,
                    <td>{"el.valeur_seuil"}</td>,
                    <td>{"el.quantite_en_stock"}</td>
                ))}
                </tr>
            </table>
        </div>
    );
    */
    /*
    return(
        <div>
            <h1 className="lmj-listePieces">Liste des pieces en stock</h1>
            <ul className='lmj-element'>
                {data.map((el)=>(
                    <li>{el.reference}</li>,
                    <li>{el.nom_famille}</li>
                ))}
            </ul>
        </div>
    );
    */
}

export default ListePieces;