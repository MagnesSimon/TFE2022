const sql = require("./db.js");

// Constructor
const listePieces = function (listePieces) {
    this.reference = listePieces.reference;
    this.nom_famille = listePieces.nom_famille;
    this.valeur_seuil = listePieces.valeur_seuil;
    this.quantite_en_stock = listePieces.quantite_en_stock;
}

/* 
Permet de récupérer la liste de toutes les pièces dans le stock
reference
nom_famille
valeur_seuil
quantite_en_stock
*/
listePieces.getAll = result => {
    sql.query("SELECT piece.reference," +
        "famille.nom_famille," +
        "piece.valeur_seuil," +
        "piece.quantite_en_stock " +
        "FROM piece as piece " +
        "INNER JOIN famille as famille " +
        "ON piece.id_famille = famille.id_famille"
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

// listePieces.update = (quantite_a_ajouter, reference, result) => {
//     sql.query("UPDATE piece " +
//         "SET quantite_en_stock = " + quantite_a_ajouter +
//         "WHERE reference = " + "\'" + reference + "\'",
//         (err, res) => {
//             if (err) {
//                 console.log("Error: ", err);
//                 result(null, err);
//                 return;
//             } else result(null, res);
//         })
// }

module.exports = listePieces;