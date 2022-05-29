const sql = require("./db.js");

// Constructor
const ficheTechnique = function (ficheTechnique) {
    this.reference = ficheTechnique.reference;
    this.nom_categorie = ficheTechnique.nom_categorie;
    this.nom_finition = ficheTechnique.nom_finition;
    this.effet_finition = ficheTechnique.pour_trou;
    this.nom_famille = ficheTechnique.nom_famille;
    this.materiaux = ficheTechnique.materiaux;
    this.nom_fournisseur = ficheTechnique.nom_fournisseur;
}
/*
Permet de récupérer la fiche technique de chaque pièce
reference
nom_categorie
nom_finition
effet_finition
nom_famille
materiaux
nom_fournisseur
 */
ficheTechnique.getAll = result => {
    sql.query("SELECT piece.reference," +
        "categorie.nom_categorie," +
        "finition.nom_finition," +
        "finition.effet_finition," +
        "famille.nom_famille, " +
        "famille.materiaux, " +
        "fournisseur.nom_fournisseur " +
        "FROM piece as piece " +
        "INNER JOIN categorie as categorie ON piece.id_categorie = categorie.id_categorie " +
        "INNER JOIN finition as finition ON piece.id_finition = finition.id_finition " +
        "INNER JOIN famille as famille ON piece.id_famille = famille.id_famille " +
        "INNER JOIN fournisseur as fournisseur ON famille.id_fournisseur = fournisseur.id_fournisseur "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else {
                result(null, res);
            }
        });
}

ficheTechnique.getById = (reference, result) => {
    sql.query("SELECT piece.reference, " +
        "categorie.nom_categorie," +
        "finition.nom_finition," +
        "finition.effet_finition," +
        "famille.nom_famille, " +
        "famille.materiaux, " +
        "fournisseur.nom_fournisseur " +
        "FROM piece as piece " +
        "INNER JOIN categorie as categorie " +
        "ON piece.id_categorie = categorie.id_categorie " +
        "INNER JOIN finition as finition " +
        "ON piece.id_finition = finition.id_finition " +
        "INNER JOIN famille as famille " +
        "ON piece.id_famille = famille.id_famille " +
        "INNER JOIN fournisseur as fournisseur " +
        "ON famille.id_fournisseur = fournisseur.id_fournisseur " +
        "WHERE reference = \'" + reference + "\'", (err, res) => {
            // SELECT * FROM  WHERE reference = ${reference} ", (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found famille: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        });
};

module.exports = ficheTechnique;