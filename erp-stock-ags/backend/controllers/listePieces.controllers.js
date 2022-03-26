const ListePieces = require("../models/listePieces.models");

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !" 
        });
    }
    const listePieces = new ListePieces({
        reference: req.body.reference,
        nom_famille: req.body.nom_famille,
        valeur_seuil: req.body.valeur_seuil,
        quantite_en_stock: req.body.quantite_en_stock
    });

    ListePieces.create()(listePieces, (err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'listePiece'."
            })
        } else res.send(data);
    });
};

exports.findAll = (req,res)=>{
    ListePieces.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'listePiece'."
            });
        } else res.send(data);
    });
}
