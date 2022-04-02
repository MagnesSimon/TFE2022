import './usefull'

const data = [
    {
        reference: "TST101",
        nom_famille: "famille test",
        valeur_seuil: 12,
        quantite_en_stock: 55
    }, {
        reference: "TST102",
        nom_famille: "famille test",
        valeur_seuil: 12,
        quantite_en_stock: 55
    }
]

function ListePieces() {

    return (
        <table>
            <thead>
                <tr>
                    <th>Référence</th>
                    <th>Famille</th>
                    <th>Valeur seuil</th>
                    <th>Quantité en stock</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ reference, nom_famille, valeur_seuil, quantite_en_stock }) => (
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
}

export default ListePieces;