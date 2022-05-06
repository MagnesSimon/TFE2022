const sql = require("./db")

// Constructor
const Fournisseur = function (fournisseur) {
    this.nom_fournisseur = fournisseur.nom_fournisseur;
    this.mail_fournisseur = fournisseur.mail_fournisseur;
    this.tel_fournisseur = fournisseur.tel_fournisseur;
    this.adresse_fournisseur = fournisseur.adresse_fournisseur;
    this.id_localite = fournisseur.id_localite;
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
        "localite.nom_localite " +
        "FROM fournisseur as fournisseur " +
        "INNER JOIN localite as localite " +
        "WHERE fournisseur.id_localite = localite.id_localite "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else
                console.log(res);
            result(null, res);
        });
}

Fournisseur.create = (newFournisseur, result) => {
    console.log(newFournisseur)
    sql.query("INSERT INTO fournisseur SET ?", newFournisseur, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        } else {
            console.log("Fournisseur crée avec succès");
            result(null, { id: res.insertId, ...newFournisseur });
        }
    })
}

Fournisseur.getAllLocalite = result => {
    sql.query("SELECT * " +
        "FROM localite"
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

module.exports = Fournisseur