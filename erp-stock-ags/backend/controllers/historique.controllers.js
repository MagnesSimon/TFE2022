const Historique = require("../models/historique.models")

exports.findAll = (req, res) => {
    Historique.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'Historique'."
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
    const historique = new Historique({
        id_fiche_historique: req.body.id_fiche_historique,
        quantite_modifie: req.body.quantite_modifie,
        date_heure: req.body.date_heure,
        reference: req.body.reference,
        id_utilisateur: req.body.id_utilisateur,
        nom_utilisateur: req.body.nom_utilisateur
    });

    Historique.create(historique, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'historique'."
            })
        } else res.send(data);
    });
};

exports.findSearch = (req, res) => {
    Historique.getSearch(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found historique with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving historique with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Contrôle de la fonction permettant de trouver une fiche historique avec son user
exports.findByUser = (req, res) => {
    Historique.getByUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournisseur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving fournisseur with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Contrôle de la fonction permettant de trouver une fiche historique avec son ID 
exports.findByRef = (req, res) => {
    Historique.getByRef(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournisseur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving fournisseur with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Contrôle de la fonction permettant de trouver une fiche historique avec son ID + user
exports.findByUserAndRef = (req, res) => {
    Historique.getByUserAndRef(req.params.user, req.params.ref, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournisseur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving fournisseur with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
