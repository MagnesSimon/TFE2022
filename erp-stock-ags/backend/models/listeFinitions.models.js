const sql = require("./db")

// Constructor
const ListeFinition = function (listeFinition) {
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
            console.log("Finition crée avec succès", {});
            result(null, { id: res.insertId, ...newFinition });
        }
    });
}

module.exports = ListeFinition