const sql = require("./db")

// Constructor
const ListeFamilles = function (listeFamilles) {
    this.nom_famille = listeFamilles.nom_famille;
    this.materiaux = listeFamilles.materiaux;
    this.id_fournisseur = listeFamilles.id_fournisseur;
    this.id_categorie = listeFamilles.id_categorie;
}

/*
Permet de récupérer la liste des finitions
id_finition
nom_finition
effet_finition
*/
ListeFamilles.getAll = result => {
    sql.query("SELECT famille.id_famille,  " +
        "famille.nom_famille," +
        "famille.materiaux," +
        "fournisseur.nom_fournisseur " +
        "FROM famille as famille " +
        "INNER JOIN fournisseur as fournisseur " +
        "WHERE famille.id_fournisseur = fournisseur.id_fournisseur"
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

ListeFamilles.create = (newFamille, result) => {
    sql.query("INSERT INTO famille SET ?", newFamille, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        } else {
            console.log("famille crée avec succès");
            result(null, { id: res.insertId, ...newFamille });
        }
    });
}

module.exports = ListeFamilles