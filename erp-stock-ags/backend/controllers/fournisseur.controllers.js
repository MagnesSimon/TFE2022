const Fournisseur = require("../models/fournisseur.models")

exports.findAll = (req, res) => {
    Fournisseur.getAll((err, data) => {
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
    const fournisseur = new Fournisseur({
        nom_fournisseur: req.body.nom_fournisseur,
        mail_fournisseur: req.body.mail_fournisseur,
        tel_fournisseur: req.body.tel_fournisseur,
        adresse_fournisseur: req.body.adresse_fournisseur,
        id_localite: req.body.id_localite
    });

    Fournisseur.create(fournisseur, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'fournisseur'."
            })
        } else res.send(data);
    });
};

exports.findAllLocalite = (req, res) => {
    Fournisseur.getAllLocalite((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'Localite'."
            });
        } else res.send(data);
    })
}