const sql = require("./db")

// Constructor
const ListeFamilles = function (listeFamilles) {
    this.id_famille = listeFamilles.id_famille;
    this.nom_famille = listeFamilles.nom_famille;
    this.materiaux = listeFamilles.materiaux;
}

/*
Permet de récupérer la liste des finitions
id_finition
nom_finition
effet_finition
*/
ListeFamilles.getAll = result => {
    sql.query("SELECT *  " +
        "FROM famille", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

module.exports = ListeFamilles