const ListePieces = require("../models/listePieces.models");

exports.findAll = (req, res) => {
    ListePieces.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'listePiece'."
            });
        } else res.send(data);
    });
}

exports.updateQtyById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const aUpdate = new ListePieces({
        reference: req.body.reference,
        quantite_en_stock: req.body.quantite_en_stock
    })

    ListePieces.updateQtyById(aUpdate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found ListePieces with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Error updating ListePieces with id " + req.params.id
                });
            }
        } else
            res.send('POST Passé');
    }
    );
};

exports.findPenurie = (req, res) => {
    ListePieces.getPenurie((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'listePiece'."
            });
        } else res.send(data);
    });
}

exports.findOne = (req, res) => {
    ListePieces.getOneById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Article with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Article with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }

    const newPiece = new ListePieces({
        reference: req.body.ref,
        nom_famille: req.body.famille,
        valeur_seuil: req.body.seuil,
        quantite_en_stock: req.body.quantite,
        longueur: req.body.longueur,
        largeur: req.body.largeur,
        hauteur: req.body.hauteur,
        rayon: req.body.rayon,
        poids: req.body.poids,
        // clés étrangères
        id_finition: req.body.finition,
        id_famille: req.body.famille

    });

    Piece.create(newPiece, (err, data) => {

        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'newPiece'."
            })
        } else res.send(data);
    });
};
