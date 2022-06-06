const sql = require("./db")

// Constructor
const Fournisseur = function (fournisseur) {
    this.id_fournisseur = fournisseur.id_fournisseur;
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
        "WHERE fournisseur.id_localite = localite.id_localite " +
        "ORDER BY fournisseur.nom_fournisseur "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else
                result(null, res);
        });
}

Fournisseur.create = (newFournisseur, result) => {
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

Fournisseur.getOneById = (id_fournisseur, result) => {
    sql.query("SELECT fournisseur.id_fournisseur, " +
        "fournisseur.nom_fournisseur, " +
        "fournisseur.mail_fournisseur, " +
        "fournisseur.tel_fournisseur, " +
        "fournisseur.adresse_fournisseur, " +
        "fournisseur.id_localite, " +
        "localite.code_postal, " +
        "localite.nom_localite " +

        // FROM et JOIN
        "FROM fournisseur as fournisseur " +
        "INNER JOIN localite as localite " +
        "ON fournisseur.id_localite = localite.id_localite " +

        // Condition
        `WHERE fournisseur.id_fournisseur ='${id_fournisseur}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

Fournisseur.updateById = (data, result) => {
    sql.query("UPDATE `fournisseur` " +
        "SET `nom_fournisseur` = '" + data.nom_fournisseur + "' , " +
        "`mail_fournisseur` = '" + data.mail_fournisseur + "' , " +
        "`tel_fournisseur` = '" + data.tel_fournisseur + "' , " +
        "`adresse_fournisseur` = '" + data.adresse_fournisseur + "' ," +
        "`id_localite` = '" + data.id_localite + "'" +
        " WHERE `id_fournisseur` = " + "'" + data.id_fournisseur + "'")
}

Fournisseur.remove = (id, result) => {
    sql.query("DELETE FROM fournisseur WHERE id_fournisseur = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("deleted fournisseur with id: ", id);
        result(null, res);
    });
}

Fournisseur.getSearch = (el, result) => {
    sql.query("SELECT fournisseur.id_fournisseur, " +
        "fournisseur.nom_fournisseur, " +
        "fournisseur.mail_fournisseur, " +
        "fournisseur.tel_fournisseur, " +
        "fournisseur.adresse_fournisseur, " +
        "localite.code_postal, " +
        "localite.nom_localite " +
        "FROM fournisseur as fournisseur " +
        "INNER JOIN localite as localite " +
        "ON fournisseur.id_localite = localite.id_localite " +
        "WHERE fournisseur.nom_fournisseur LIKE '%" + el +
        "%' OR localite.code_postal LIKE '%" + el +
        "%' OR localite.nom_localite LIKE '%" + el + "%' "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

module.exports = Fournisseur