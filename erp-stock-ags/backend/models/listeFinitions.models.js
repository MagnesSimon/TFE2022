const sql = require("./db")

// Constructor
const ListeFinition = function (listeFinition) {
    this.id_finition = listeFinition.id_finition;
    this.nom_finition = listeFinition.nom_finition;
    this.effet_finition = listeFinition.effet_finition;
}

/*
Permet de récupérer la liste des finitions
id_finition
nom_finition
effet_finition
*/
ListeFinition.getAll = result => {
    sql.query("SELECT *  " +
        "FROM finition", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

ListeFinition.create = (newFinition, result) => {
    sql.query("INSERT INTO finition SET ?", newFinition, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        } else {
            console.log("Finition crée avec succès");
            result(null, { id: res.insertId, ...newFinition });
        }
    });
}

ListeFinition.getOneById = (id_finition, result) => {
    sql.query("SELECT finition.id_finition, " +
        "finition.nom_finition, " +
        "finition.effet_finition " +

        // FROM et JOIN
        "FROM finition as finition " +

        // Condition
        `WHERE finition.id_finition ='${id_finition}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

ListeFinition.updateById = (data, result) => {
    sql.query("UPDATE `finition` " +
        "SET `nom_finition` = '" + data.nom_finition + "' , " +
        "`effet_finition` = '" + data.effet_finition + "'" +
        " WHERE `id_finition` = " + "'" + data.id_finition + "'")
}

ListeFinition.remove = (id, result) => {
    sql.query("DELETE FROM finition WHERE id_finition = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("deleted finition with id: ", id);
        result(null, res);
    });
}

module.exports = ListeFinition