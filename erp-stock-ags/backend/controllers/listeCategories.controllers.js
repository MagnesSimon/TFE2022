const ListeCategories = require("../models/listeCategories.models")

exports.findAll = (req, res) => {
    ListeCategories.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'ListeCategories'."
            });
        } else res.send(data);
    })
}