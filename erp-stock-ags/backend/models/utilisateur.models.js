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
    sql.query(`SELECT * FROM utilisateur WHERE id_utilisateur = ${id_utilisateur}`, (err, res) => {
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
    sql.query("SELECT * FROM utilisateur", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Utilisateur.updateById = (data, result) => {
    sql.query("UPDATE `utilisateur` " +
        "SET `nom_utilisateur` = '" + data.nom_utilisateur + "' , " +
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


// User.remove = (id, result) => {
//     sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("deleted user with id: ", id);
//         result(null, res);
//     });
// };

module.exports = User;