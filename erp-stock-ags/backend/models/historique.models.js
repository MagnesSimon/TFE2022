const sql = require("./db")

// Constructor
const Historique = function (historique) {
    this.id_fiche_historique = historique.id_fiche_historique;
    this.quantite_modifie = historique.quantite_modifie;
    this.date_heure = historique.date_heure;
    this.reference = historique.reference;
    this.id_utilisateur = historique.id_utilisateur;
    this.nom_utilisateur = historique.nom_utilisateur;
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
    sql.query("INSERT INTO historique SET ?", newHistorique, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        } else {
            console.log("Fiche Historique crée avec succès");
            result(null, { id: res.insertId, ...newFournisseur });
        }
    })
}

module.exports = Historique