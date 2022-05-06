const sql = require("./db.js");

// Constructor
const ListePieces = function (listePieces) {
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
ListePieces.getAll = result => {
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

/* 
Permet de modifier la quantité d'un pièce
reférence
quantité en stock
*/
ListePieces.updateQtyById = (data, result) => {
    sql.query("UPDATE piece" +
        " SET quantite_en_stock = " + data.quantite_en_stock +
        " WHERE reference = '" + data.reference + "'")
}

ListePieces.getPenurie = result => {
    sql.query("SELECT piece.reference," +
        "famille.nom_famille," +
        "piece.valeur_seuil," +
        "piece.quantite_en_stock " +
        "FROM piece as piece " +
        "INNER JOIN famille as famille " +
        "ON piece.id_famille = famille.id_famille " +
        "WHERE piece.quantite_en_stock < piece.valeur_seuil "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

ListePieces.getOneById = (reference, result) => {
    sql.query("SELECT piece.reference, " +
        "piece.quantite_en_stock, " +
        "famille.nom_famille, " +
        "famille.materiaux, " +
        "categorie.nom_categorie, " +
        "categorie.pole, " +
        "fournisseur.nom_fournisseur, " +
        "finition.nom_finition, " +
        "dimension.longueur, " +
        "dimension.largeur, " +
        "dimension.hauteur, " +
        "dimension.profondeur, " +
        "dimension.rayon " +

        // FROM et JOIN
        "FROM piece as piece " +
        "INNER JOIN famille as famille " +
        "ON piece.id_famille = famille.id_famille " +
        "INNER JOIN categorie as categorie " +
        "ON famille.id_categorie = categorie.id_categorie " +
        "INNER JOIN fournisseur as fournisseur " +
        "ON famille.id_fournisseur = fournisseur.id_fournisseur " +
        "INNER JOIN finition as finition " +
        "ON piece.id_finition = finition.id_finition " +
        "INNER JOIN dimension as dimension " +
        "ON piece.id_dimension = dimension.id_dimension " +

        // Condition
        `WHERE piece.reference ='${reference}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

// ListePieces.findById = (reference, result) => {
//     sql.query(`SELECT * FROM piece WHERE reference ='${reference}'`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found article: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         result({ kind: "not_found" }, null);
//     });
// };

module.exports = ListePieces;