const ListeFamilles = require("../models/ListeFamilles.models")

exports.findAll = (req, res) => {
    ListeFamilles.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'listePiece'."
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
    const famille = new ListeFamilles({
        nom_famille: req.body.nom_famille,
        materiaux: req.body.materiaux,
        id_fournisseur: req.body.id_fournisseur,
    });

    ListeFamilles.create(famille, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'famille'."
            })
        } else res.send(data);
    });
};