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

// exports.findOneById = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }
//     const aRecuperer = new ListePieces({
//         reference: req.body.reference,
//     })
//     ListePieces.getOneById(aRecuperer, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: "Not found ListePieces with id " + req.params.id
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error updating ListePieces with id " + req.params.id
//                 });
//             }
//         } else
//             res.send('Get Passé');
//     });
// }

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
