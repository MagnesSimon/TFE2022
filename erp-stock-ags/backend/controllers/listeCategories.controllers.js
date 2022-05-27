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

exports.findOne = (req, res) => {
    ListeCategories.getOneById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Categorie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Categorie with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.updateById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const aUpdate = new ListeCategories({
        id_categorie: req.body.id_categorieToSend,
        nom_categorie: req.body.nom_categorieToSend,
        pole: req.body.poleToSend,
    });

    ListeCategories.updateById(aUpdate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found ListeCategorie with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Error updating ListeCategorie with id " + req.params.id
                });
            }
        } else
            res.send('UDPATE OK');
    });
}

exports.delete = (req, res) => {
    ListeCategories.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found categorie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete categorie with id " + req.params.id
                });
            }
        } else res.send({ message: `categorie was deleted successfully!` });
    });
};