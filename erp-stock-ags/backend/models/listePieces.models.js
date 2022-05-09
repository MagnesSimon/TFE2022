const sql = require("./db.js");

// Constructor
const ListePieces = function (listePieces) {
    this.reference = listePieces.reference;
    this.nom_famille = listePieces.nom_famille;
    this.valeur_seuil = listePieces.valeur_seuil;
    this.quantite_en_stock = listePieces.quantite_en_stock;
    this.longueur = listePieces.longeur;
    this.largeur = listePieces.largeur;
    this.hauteur = listePieces.hauteur;
    this.rayon = listePieces.rayon;
    this.poids = listePieces.poids;
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
        "piece.longueur, " +
        "piece.largeur, " +
        "piece.hauteur, " +
        "piece.rayon, " +
        "piece.poids, " +
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
        "piece.longueur, " +
        "piece.largeur, " +
        "piece.hauteur, " +
        "piece.rayon, " +
        "piece.poids " +
        "famille.id_famille, " +
        "famille.nom_famille, " +
        "famille.materiaux, " +
        "categorie.id_categorie," +
        "categorie.nom_categorie, " +
        "categorie.pole, " +
        "fournisseur.id_fournisseur, " +
        "fournisseur.nom_fournisseur, " +
        "finition.id_finition, " +
        "finition.nom_finition, " +
        "finition.effet_finition, " +

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

ListePieces.create = (newPiece, result) => {

    sql.query("INSERT INTO piece SET ?", newPiece, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            console.log("piece crée avec succès", { id: res.insertId, ...newPiece });
            result(null, { id: res.insertId, ...newPiece });
        }
    });
}

module.exports = ListePieces;