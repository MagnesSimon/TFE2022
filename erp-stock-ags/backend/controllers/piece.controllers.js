const Piece = require("../models/piece.models");


exports.create = (req, res) => {
    console.log(" *********************************************** ");
    console.log(req.body);
    console.log(" *********************************************** ");
    console.log("req.body.reference");
    console.log(req.body.reference);
    console.log(" *********************************************** ");
    console.log(" export.create ");
    console.log(" *********************************************** ");
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

    console.log(" *********************************************** ");
    console.log(" Controllers - Piece");
    console.log(piece);
    console.log(piece.reference);
    console.log(" *********************************************** ");

    Piece.create(piece, (err, data) => {

        console.log(" *********************************************** ");
        console.log(" Controllers - CreateOne: ");
        //console.log(" Controllers - create - Piece: " + piece.reference);
        console.log(" *********************************************** ");

        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'listePiece'."
            })
        } else res.send(data);
    });
};

