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
        id_categorie: req.body.id_categorie
    });

    ListeFamilles.create(famille, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'famille'."
            })
        } else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ListeFamilles.getOneById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Famille with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Famille with id " + req.params.id
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

    const aUpdate = new ListeFamilles({
        id_famille: req.body.id_familleToSend,
        nom_famille: req.body.nom_familleToSend,
        materiaux: req.body.materiauxToSend,
        // Clés étrangères
        id_fournisseur: req.body.id_fournisseurToSend,
        id_categorie: req.body.id_categorieToSend,
    });

    ListeFamilles.updateById(aUpdate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found ListeFamille with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Error updating listeFamille with id " + req.params.id
                });
            }
        } else
            res.send('UDPATE OK');
    });
}

exports.delete = (req, res) => {
    ListeFamilles.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found famille with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete famille with id " + req.params.id
                });
            }
        } else res.send({ message: `famille was deleted successfully!` });
    });
};
