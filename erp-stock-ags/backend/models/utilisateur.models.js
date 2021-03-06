const sql = require("./db.js");

// constructor
const Utilisateur = function (utilisateur) {
    this.id_utilisateur = utilisateur.id_utilisateur;
    this.nom_utilisateur = utilisateur.nom_utilisateur;
    this.mot_de_passe = utilisateur.mot_de_passe;
    this.prenom_utilisateur = utilisateur.prenom_utilisateur;
    this.nom_famille_utilisateur = utilisateur.nom_famille_utilisateur;
    this.telephone_utilisateur = utilisateur.telephone_utilisateur
    this.id_profil = utilisateur.id_profil
};

Utilisateur.create = (newUtilisateur, result) => {
    sql.query("INSERT INTO utilisateur SET ?", newUtilisateur, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUtilisateur });
        result(null, { id: res.insertId, ...newUtilisateur });
    });
};

Utilisateur.findById = (id_utilisateur, result) => {
    sql.query("SELECT utilisateur.id_utilisateur, " +
        "utilisateur.nom_utilisateur, " +
        "utilisateur.prenom_utilisateur, " +
        "utilisateur.nom_famille_utilisateur, " +
        "utilisateur.telephone_utilisateur, " +
        "utilisateur.id_profil, " +
        "profil.libelle_profil " +

        // FROM et JOIN
        "FROM utilisateur as utilisateur " +
        "INNER JOIN profil as profil " +
        "ON utilisateur.id_profil = profil.id_profil " +

        // Condition
        `WHERE utilisateur.id_utilisateur ='${id_utilisateur}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
};

Utilisateur.findByUsername = (nom_utilisateur, result) => {
    sql.query(`SELECT * FROM utilisateur WHERE nom_utilisateur = "${nom_utilisateur}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Utilisateur.getAll = result => {
    sql.query("SELECT utilisateur.id_utilisateur, " +
        "utilisateur.nom_utilisateur, " +
        "utilisateur.mot_de_passe, " +
        "utilisateur.prenom_utilisateur, " +
        "utilisateur.nom_famille_utilisateur, " +
        "utilisateur.telephone_utilisateur, " +
        "utilisateur.id_profil, " +
        "profil.libelle_profil " +

        // FROM et JOIN
        "FROM utilisateur as utilisateur " +
        "INNER JOIN profil as profil " +
        "ON utilisateur.id_profil = profil.id_profil "
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, res);
        });
};

Utilisateur.updateById = (data, result) => {
    console.log("data", data)
    sql.query("UPDATE `utilisateur` " +
        "SET `id_utilisateur` = '" + data.id_utilisateur + "' , " +
        "`prenom_utilisateur` = '" + data.prenom_utilisateur + "' , " +
        "`nom_famille_utilisateur` = '" + data.nom_famille_utilisateur + "' , " +
        "`telephone_utilisateur` = '" + data.telephone_utilisateur + "' ," +
        "`id_profil` = '" + data.id_profil + "'" +
        " WHERE `id_utilisateur` = " + "'" + data.id_utilisateur + "'"
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}


Utilisateur.remove = (id, result) => {
    sql.query("DELETE FROM utilisateur WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted utilisateur with id: ", id);
        result(null, res);
    });
};

Utilisateur.getSearch = (el, result) => {
    sql.query("SELECT utilisateur.id_utilisateur, " +
        "utilisateur.nom_utilisateur, " +
        "utilisateur.mot_de_passe, " +
        "utilisateur.prenom_utilisateur, " +
        "utilisateur.nom_famille_utilisateur, " +
        "utilisateur.telephone_utilisateur, " +
        "utilisateur.id_profil, " +
        "profil.libelle_profil " +
        // FROM et JOIN
        "FROM utilisateur as utilisateur " +
        "INNER JOIN profil as profil " +
        "ON utilisateur.id_profil = profil.id_profil " +
        "WHERE utilisateur.nom_utilisateur LIKE '%" + el +
        "%' OR utilisateur.prenom_utilisateur LIKE '%" + el +
        "%' OR utilisateur.telephone_utilisateur LIKE '%" + el +
        "%' OR utilisateur.nom_famille_utilisateur LIKE '%" + el + "%' "
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

module.exports = Utilisateur;