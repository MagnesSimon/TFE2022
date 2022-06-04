const sql = require("./db")

// Constructor
const Historique = function (historique) {
    this.id_fiche_historique = historique.id_fiche_historique;
    this.quantite_modifie = historique.quantite_modifie;
    this.date_heure = historique.date_heure;
    this.reference = historique.reference;
    this.id_utilisateur = historique.id_utilisateur;
}

Historique.getAll = result => {
    sql.query("SELECT historique.id_fiche_historique, " +
        "historique.quantite_modifie, " +
        "historique.date_heure, " +
        "historique.reference, " +
        "historique.id_utilisateur, " +
        "utilisateur.nom_utilisateur " +
        // JOIN
        "FROM historique as historique " +
        "INNER JOIN utilisateur as utilisateur " +
        "ON historique.id_utilisateur = utilisateur.id_utilisateur "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else
                result(null, res);
        });
}

Historique.create = (newHistorique, result) => {
    sql.query("INSERT INTO historique " +
        "SET `quantite_modifie` = '" + newHistorique.quantite_modifie + "' , " +
        // "`date_heure` = '" + date() + "' , " +
        "`reference` = '" + newHistorique.reference + "' , " +
        "`id_utilisateur` = '" + newHistorique.id_utilisateur + "' ")
}

Historique.getSearch = (el, result) => {
    sql.query("SELECT historique.id_fiche_historique, " +
        "historique.quantite_modifie, " +
        "historique.date_heure, " +
        "historique.reference, " +
        "historique.id_utilisateur, " +
        "utilisateur.nom_utilisateur " +
        // JOIN
        "FROM historique as historique " +
        "INNER JOIN utilisateur as utilisateur " +
        "ON historique.id_utilisateur = utilisateur.id_utilisateur " +
        // WHERE
        "WHERE historique.reference LIKE '%" + el +
        "%' OR utilisateur.nom_utilisateur LIKE '%" + el + "%' "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

Historique.getByUser = (id_utilisateur, result) => {
    sql.query("SELECT historique.id_fiche_historique, " +
        "historique.quantite_modifie, " +
        "historique.date_heure, " +
        "historique.reference, " +
        "historique.id_utilisateur, " +
        "utilisateur.nom_utilisateur " +
        // JOIN
        "FROM historique as historique " +
        "INNER JOIN utilisateur as utilisateur " +
        "ON historique.id_utilisateur = utilisateur.id_utilisateur " +
        //WHERE
        `WHERE utilisateur.id_utilisateur ='${id_utilisateur}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else
                result(null, res);
        });
}
Historique.getByRef = (reference, result) => {
    sql.query("SELECT historique.id_fiche_historique, " +
        "historique.quantite_modifie, " +
        "historique.date_heure, " +
        "historique.reference, " +
        "historique.id_utilisateur, " +
        "utilisateur.nom_utilisateur " +
        // JOIN
        "FROM historique as historique " +
        "INNER JOIN utilisateur as utilisateur " +
        "ON historique.id_utilisateur = utilisateur.id_utilisateur " +
        //WHERE
        `WHERE historique.reference ='${reference}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else
                result(null, res);
        });
}

Historique.getByUserAndRef = (id_utilisateur, result) => {
    sql.query("SELECT historique.id_fiche_historique, " +
        "historique.quantite_modifie, " +
        "historique.date_heure, " +
        "historique.reference, " +
        "historique.id_utilisateur, " +
        "utilisateur.nom_utilisateur " +
        // JOIN
        "FROM historique as historique " +
        "INNER JOIN utilisateur as utilisateur " +
        "ON historique.id_utilisateur = utilisateur.id_utilisateur " +
        //WHERE
        `WHERE utilisateur.id_utilisateur ='${id_utilisateur}' `
        //`AND historique.reference ='${reference}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else
                result(null, res);
        });
}

module.exports = Historique