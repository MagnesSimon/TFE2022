const Utilisateur = require("../models/utilisateur.models.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const utilisateur = new Utilisateur({
        nom_utilisateur: req.body.nom_utilisateur,
        mot_de_passe: req.body.mot_de_passe,
        prenom_utilisateur: req.body.prenom_utilisateur,
        nom_famille_utilisateur: req.body.nom_famille_utilisateur,
        telephone_utilisateur: req.body.telephone_utilisateur,
        id_profil: req.body.id_profil
    });

    Utilisateur.create(utilisateur, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Utilisateur.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else
            res.send(data);
    });

};

exports.findOne = (req, res) => {
    Utilisateur.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findUsername = (req, res) => {
    Utilisateur.findByUsername(req.params.nom_utilisateur, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with mail ${req.params.nom_utilisateur}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with mail " + req.params.nom_utilisateur
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    //console.log(req)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const aUpdate = new Utilisateur({
        id_utilisateur: req.body.id_utilisateurToSend,
        prenom_utilisateur: req.body.prenom_utilisateurToSend,
        nom_famille_utilisateur: req.body.nom_famille_utilisateurToSend,
        telephone_utilisateur: req.body.telephone_utilisateurToSend,
        id_profil: req.body.id_profilToSend,
    });

    Utilisateur.updateById(aUpdate, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Utilisateur with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Error updating Utilisateur with id " + req.params.id
                });
            }
        } else
            res.send('UDPATE OK');
    });
}

// exports.delete = (req, res) => {
//     Utilisateur.remove(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found User with id ${req.params.id}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Could not delete User with id " + req.params.id
//                 });
//             }
//         } else res.send({ message: `User was deleted successfully!` });
//     });
// };