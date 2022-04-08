const sql = require("./db");

// Constructor
const Piece = function (Piece) {
    console.log(" *********************************************** ");
    console.log(" piece ");
    console.log(Piece)
    console.log(" *********************************************** ");
    this.reference = Piece.reference;
    this.valeur_seuil = Piece.valeur_seuil;
    this.quantite_en_stock = Piece.quantite_en_stock;
    // clés étrangères
    this.id_finition = Piece.id_finition;
    this.id_categorie = Piece.id_categorie;
    this.id_famille = Piece.id_famille;

    console.log(" *********************************************** ");
    console.log(" piece 2");
    console.log(Piece)
    console.log(" *********************************************** ");
}

Piece.create = (newPiece, result) => {

    // console.log(" *********************************************** ");
    // console.log(" Models - Piece: " + newPiece);
    // console.log(" Models - Piece: " + newPiece.reference);
    console.log(" *********************************************** ");
    console.log("NewPiece: ");
    //console.log(newPiece.toString())
    console.log(" *********************************************** ");

    // sql.query("INSERT INTO piece" +
    //     " (reference, valeur_seuil," +
    //     " quantite_en_stock, id_finition," +
    //     " id_categorie, id_famille)" +
    //     " VALUES ('" + newPiece.reference + "','" +
    //     newPiece.valeur_seuil + "','" +
    //     newPiece.quantite_en_stock + "','" +
    //     newPiece.id_finition + "','" +
    //     newPiece.id_categorie + "','" +
    //     newPiece.id_famille + "')", (err, res) => {

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