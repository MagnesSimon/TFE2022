const sql = require("./db")

// Constructor
const ListeCategories = function (listeCategories) {
    this.nom_categorie = listeCategories.nom_categorie;
    this.pole = listeCategories.pole
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

ListeCategories.create = (newCategorie, result) => {
    sql.query("INSERT INTO categorie SET ?", newCategorie, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        } else {
            console.log("Catégorie crée avec succès");
            result(null, { id: res.insertId, ...newCategorie });
        }
    })
}

module.exports = ListeCategories