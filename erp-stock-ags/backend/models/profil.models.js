const sql = require("./db.js");

// constructor
const Profil = function (profil) {
    this.id_profil = profil.id_profil;
    this.libelle_profil = profil.libelle_profil;
};

// Profil.create = (newProfil, result) => {
//     sql.query("INSERT INTO profil SET ?", newProfil, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         console.log("created profil: ", { id: res.insertId, ...newProfil });
//         result(null, { id: res.insertId, ...newProfil });
//     });
// };

Profil.findById = (id_profil, result) => {
    sql.query("SELECT * FROM profil " +
        // Condition
        `WHERE id_profil ='${id_profil}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
};

Profil.getAll = result => {
    sql.query("SELECT * FROM profil", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Profil.updateById = (data, result) => {
    sql.query("UPDATE `profil` " +
        "SET `libelle_profil` = '" + data.libelle_profil + "'  " +
        " WHERE `id_profil` = " + "'" + data.id_profil + "'"
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}


// Profil.remove = (id, result) => {
//     sql.query("DELETE FROM profil WHERE id = ?", id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("deleted profil with id: ", id);
//         result(null, res);
//     });
// };

module.exports = Profil;