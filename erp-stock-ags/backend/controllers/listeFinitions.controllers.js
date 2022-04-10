const ListeFinition = require("../models/listeFinitions.models")

exports.findAll = (req, res) => {
    ListeFinition.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'listeFinition'."
            });
        } else res.send(data);
    })
}