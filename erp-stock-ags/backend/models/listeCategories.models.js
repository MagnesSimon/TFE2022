const sql = require("./db")

// Constructor
const ListeCategories = function (listeCategories) {
    this.id_categorie = listeCategories.id_categorie;
    this.nom_categorie = listeCategories.nom_categorie;
    this.materiaux = listeCategories.materiaux;
}

/*
Permet de récupérer la liste des catégories
id_categorie
nom_categorie
materiaux
*/
ListeCategories.getAll = result => {
    sql.query("SELECT *  " +
        "FROM categorie", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

module.exports = ListeCategories