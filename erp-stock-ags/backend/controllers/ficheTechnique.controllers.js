const FicheTechnique = require("../models/ficheTechnique.models.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const ficheTechnique = new FicheTechnique({
        reference: req.body.reference,
        nom_categorie: req.body.nom_categorie,
        nom_finition: req.body.nom_finition,
        effet_finition: req.body.effet_finition,
        nom_famille: req.body.nom_famille,
        materiaux: req.body.materiaux,
        nom_fournisseur: req.body.nom_fournisseur
    });

    FicheTechnique.create(ficheTechnique, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'ficheTechnique'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    FicheTechnique.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'ficheTechnique'."
            });
        } else res.send(data);
    });
}

exports.findOne = (req, res) => {
    FicheTechnique.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found ficheTechnique with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ficheTechnique with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
/*
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    FicheTechnique.updateById(
        req.params.id,
        new Piece(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ficheTechnique with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ficheTechnique with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    FicheTechnique.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ficheTechnique with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete ficheTechnique with id " + req.params.id
                });
            }
        } else res.send({message: `ficheTechnique was deleted successfully!`});
    });
}
*/