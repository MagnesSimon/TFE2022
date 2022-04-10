const sql = require("./db");

// Constructor
const Piece = function (Piece) {

    this.reference = Piece.reference;
    this.valeur_seuil = Piece.valeur_seuil;
    this.quantite_en_stock = Piece.quantite_en_stock;
    // clés étrangères
    this.id_finition = Piece.id_finition;
    this.id_categorie = Piece.id_categorie;
    this.id_famille = Piece.id_famille;
}

Piece.create = (newPiece, result) => {

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

module.exports = Piece;