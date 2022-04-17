const ListeCategories = require("../models/listeCategories.models")

exports.findAll = (req, res) => {
    ListeCategories.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'ListeCategories'."
            });
        } else res.send(data);
    })
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const categorie = new ListeCategories({
        nom_categorie: req.body.nom_categorie,
        pole: req.body.pole,
    });

    ListeCategories.create(categorie, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'finition'."
            })
        } else res.send(data);
    });
};