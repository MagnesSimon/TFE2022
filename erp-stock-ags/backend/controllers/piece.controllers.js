const Piece = require("../models/piece.models");


exports.create = (req, res) => {

    console.log(" *********************************************** ");
    console.log("Create: " + req.toString());
    console.log(" *********************************************** ");

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    console.log(" Reference: " + req.body.reference);

    const piece = new Piece({
        reference: req.body.reference,
        nom_famille: req.body.nom_famille,
        valeur_seuil: req.body.valeur_seuil,
        quantite_en_stock: req.body.quantite_en_stock,
        // clés étrangères
        id_finition: req.body.id_finition,
        id_categorie: req.body.id_categorie,
        id_famille: req.body.id_famille

    });
    console.log(" *********************************************** ");
    console.log(" Controllers - Piece " + piece);
    console.log(" Controllers - Piece: " + piece.reference);
    console.log(" *********************************************** ");

    Piece.createOne(piece, (err, data) => {

        console.log(" *********************************************** ");
        console.log(" Controllers - create - Piece: " + piece);
        console.log(" Controllers - create - Piece: " + piece.reference);
        console.log(" *********************************************** ");

        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'listePiece'."
            })
        } else res.send(data);
    });
};

