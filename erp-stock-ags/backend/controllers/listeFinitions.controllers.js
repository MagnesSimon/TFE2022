const ListeFinition = require("../models/listeFinitions.models")

exports.findAll = (req, res) => {
    ListeFinition.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'listeFinition'."
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

    const finition = new ListeFinition({
        nom_finition: req.body.nom_finition,
        effet_finition: req.body.effet_finition,
    });

    ListeFinition.create(finition, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'finition'."
            })
        } else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ListeFinition.getOneById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Finition with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Finition with id " + req.params.id
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
        id_finition: req.body.id_finitionToSend,
        nom_finition: req.body.nom_finitionToSend,
        effetFinition: req.body.effet_finitionToSend,
    });

    ListeFinition.updateById(aUpdate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found ListeFinition with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Error updating ListeFinition with id " + req.params.id
                });
            }
        } else
            res.send('UDPATE OK');
    });
}