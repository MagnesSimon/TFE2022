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

module.exports = ListeFinition