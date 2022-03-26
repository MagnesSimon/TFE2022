const sql = require("./db.js");

// Constructor
const listePieces = function (listePieces){
    this.reference = listePieces.reference;
    this.nom_famille = listePieces.nom_famille;
    this.valeur_seuil = listePieces.valeur_seuil;
    this.quantite_en_stock = listePieces.quantite_en_stock;
}

/* 
Permet de récupérer la liste de toutes les pièces dans le stock
référence - nom de la famille - valeur seul - quantité actuelle dans le stock
*/
listePieces.getAll = result => {
    sql.query("SELECT piece.reference," + 
        "famille.nom_famille," + 
        "piece.valeur_seuil," + 
        "piece.quantite_en_stock " +
    "FROM piece as piece " +
        "INNER JOIN famille as famille ON piece.id_famille = famille.id_famille"
    ,(err,res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else result(null,res);
    });
}

module.exports = listePieces;