const sql = require("./db");

// Constructor
const Piece = function (piece) {
    this.reference = piece.reference;
    this.nom_famille = piece.nom_famille;
    this.valeur_seuil = piece.valeur_seuil;
    this.quantite_en_stock = piece.quantite_en_stock;
    // clés étrangères
    this.id_finition = piece.id_finition;
    this.id_categorie = piece.id_categorie;
    this.id_famille = piece.id_famille;
}

Piece.createOne = (newPiece, result) => {

    console.log(" *********************************************** ");
    console.log(" Models - Piece: " + newPiece);
    console.log(" Models - Piece: " + newPiece.reference);
    console.log(" *********************************************** ");

    sql.query("INSERT INTO piece" +
        " (reference, valeur_seuil," +
        " quantite_en_stock, id_finition," +
        " id_categorie, id_famille)" +
        " VALUES ('" + newPiece.reference + "','" +
        newPiece.valeur_seuil + "','" +
        newPiece.quantite_en_stock + "','" +
        newPiece.id_finition + "','" +
        newPiece.id_categorie + "','" +
        newPiece.id_famille + "')", (err, res) => {
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

module.exports = Piece;