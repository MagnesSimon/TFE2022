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