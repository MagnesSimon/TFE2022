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