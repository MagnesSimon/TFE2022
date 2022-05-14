const sql = require("./db")

// Constructor
const ListeCategories = function (listeCategories) {
    this.id_categorie = listeCategories.id_categorie;
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

ListeCategories.getOneById = (id_categorie, result) => {
    sql.query("SELECT categorie.id_categorie, " +
        "categorie.nom_categorie, " +
        "categorie.pole " +

        // FROM et JOIN
        "FROM categorie as categorie " +

        // Condition
        `WHERE categorie.id_categorie ='${id_categorie}'`
        , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            } else result(null, res);
        });
}

ListeCategories.updateById = (data, result) => {
    sql.query("UPDATE `categorie` " +
        "SET `nom_categorie` = '" + data.nom_categorie + "' , " +
        "`pole` = '" + data.pole + "'" +
        " WHERE `id_categorie` = " + "'" + data.id_categorie + "'")
}


module.exports = ListeCategories