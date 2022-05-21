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
        "WHERE historique.id_utilisateur = utilisateur.id_utilisateur "
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

module.exports = Historique