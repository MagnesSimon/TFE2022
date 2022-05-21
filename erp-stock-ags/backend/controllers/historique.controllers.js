const Historique = require("../models/historique.models")

exports.findAll = (req, res) => {
    Historique.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'Historique'."
            });
        } else res.send(data);
    })
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const historique = new Historique({
        id_fiche_historique: req.body.id_fiche_historique,
        quantite_modifie: req.body.quantite_modifie,
        date_heure: req.body.date_heure,
        reference: req.body.reference,
        id_utilisateur: req.body.id_utilisateur,
        nom_utilisateur: req.body.nom_utilisateur
    });

    Historique.create(historique, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'historique'."
            })
        } else res.send(data);
    });
};