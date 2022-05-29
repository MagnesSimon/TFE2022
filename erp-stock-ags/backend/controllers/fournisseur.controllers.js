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

// Contrôle la création d'un fournisseur
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    // Valeur à mettre dans l'objet
    const fournisseur = new Fournisseur({
        nom_fournisseur: req.body.nom_fournisseur,
        mail_fournisseur: req.body.mail_fournisseur,
        tel_fournisseur: req.body.tel_fournisseur,
        adresse_fournisseur: req.body.adresse_fournisseur,
        id_localite: req.body.id_localite
    });
    // Appel de la fonction dans models.js
    Fournisseur.create(fournisseur, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'fournisseur'."
            })
        } else res.send(data);
    });
};

// Contrôle de la fonction qui permet de récupérer toutes les localité
exports.findAllLocalite = (req, res) => {
    Fournisseur.getAllLocalite((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'Localite'."
            });
        } else res.send(data);
    })
}

// Contrôle de la fonction permettant de trouver une pièce avec son ID
exports.findOne = (req, res) => {
    Fournisseur.getOneById(req.params.id, (err, data) => {
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

// Contrôle de la fonction permettant l'update de fourisseur
exports.updateById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const aUpdate = new Fournisseur({
        id_fournisseur: req.body.id_fournisseurToSend,
        nom_fournisseur: req.body.nom_fournisseurToSend,
        mail_fournisseur: req.body.mail_fournisseurToSend,
        tel_fournisseur: req.body.tel_fournisseurToSend,
        adresse_fournisseur: req.body.adresse_fournisseurToSend,
        // Clés étrangères
        id_localite: req.body.id_localiteToSend,
    });
    Fournisseur.updateById(aUpdate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found fournisseur with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Error updating fournisseur with id " + req.params.id
                });
            }
        } else
            res.send('UDPATE OK');
    });
}

// Contrôle de la fonction permettant de supprimer un fournisseur
exports.delete = (req, res) => {
    Fournisseur.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournisseur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete fournisseur with id " + req.params.id
                });
            }
        } else res.send({ message: `fournisseur was deleted successfully!` });
    });
};