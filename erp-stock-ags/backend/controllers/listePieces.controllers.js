const ListePieces = require("../models/listePieces.models");
const Piece = require("../models/listePieces.models")

exports.findAll = (req, res) => {
    ListePieces.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'listePiece'."
            });
        } else res.send(data);
    });
}


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
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

    ListePieces.create()(Piece, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'listePiece'."
            })
        } else res.send(data);
    });
};

// exports.update = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }
//     ListePieces.updateById(
//         req.params.id,
//         new Piece(req.body),
//         (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.status(404).send({
//                         message: `Not found ListePieces with id ${req.params.id}.`
//                     });
//                 } else {
//                     res.status(500).send({
//                         message: "Error updating ListePieces with id " + req.params.id
//                     });
//                 }
//             } else
//                 res.send(data);
//         }
//     );
// };
