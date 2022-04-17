const sql = require("./db")

// Constructor
const Fournisseur = function (fournisseur) {
    this.is_fournisseur = fournisseur.id_fournisseur,
        this.nom_fournisseur = fournisseur.nom_fournisseur,
        this.mail_fournisseur = fournisseur.mail_fournisseur,
        this.tel_fournisseur = fournisseur.tel_fournisseur,
        this.adresse_fournisseur = fournisseur.adresse_fournisseur
}

/*
Permet de récupérer la liste de tout les fournisseur dans la base de données
is_fournisseur
nom_fournisseur
mail_fournisseur
tel_fournisseur
adresse_fournisseur
*/
Fournisseur.getAll = result => {
    sql.query("SELECT fournisseur.id_fournisseur, " +
        "fournisseur.nom_fournisseur, " +
        "fournisseur.mail_fournisseur, " +
        "fournisseur.tel_fournisseur, " +
        "fournisseur.adresse_fournisseur, " +
        "localite.code_postal, " +
        "localite.localite " +
        "FROM fournisseur as fournisseur " +
        "INNER JOIN localite as localite " +
        "WHERE fournisseur.id_localite = localite.id_localite "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

module.exports = Fournisseur