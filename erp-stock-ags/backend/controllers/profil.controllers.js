const Profil = require("../models/profil.models.js");

exports.findAll = (req, res) => {
    Profil.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Profil."
            });
        else
            res.send(data);
    });

};

exports.findOne = (req, res) => {
    Profil.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Profil with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving usProfiler with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const aUpdate = new Profil({
        id_profil: req.body.id_profilToSend,
        libelle_profil: req.body.libelle_profilToSend,
    });

    Profil.updateById(aUpdate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Profil with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Error updating Profil with id " + req.params.id
                });
            }
        } else
            res.send('UDPATE OK');
    });
}
