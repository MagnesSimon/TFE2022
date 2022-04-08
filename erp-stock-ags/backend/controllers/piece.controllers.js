const Piece = require("../models/piece.models");


exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }

    const piece = new Piece({
        reference: req.body.ref,
        nom_famille: req.body.famille,
        valeur_seuil: req.body.seuil,
        quantite_en_stock: req.body.quantite,
        // clés étrangères
        id_finition: req.body.finition,
        id_categorie: req.body.categorie,
        id_famille: req.body.famille

    });

    Piece.create(piece, (err, data) => {

        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'listePiece'."
            })
        } else res.send(data);
    });
};

