const ListeFamilles = require("../models/ListeFamilles.models")

exports.findAll = (req, res) => {
    ListeFamilles.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'listePiece'."
            });
        } else res.send(data);
    })
}