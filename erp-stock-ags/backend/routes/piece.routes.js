module.exports = app => {
    const Piece = require("../controllers/piece.controllers");
    const ModelPiece = require("../models/piece.models")

    app.post("/addPiece/", Piece.create);

    // app.post("/addPiece/", (req, res) => {
    //     const Piece = new ModelPiece({
    //         reference: req.body.reference,
    //         nom_famille: req.body.nom_famille,
    //         valeur_seuil: req.body.valeur_seuil,
    //         quantite_en_stock: req.body.quantite_en_stock,
    //         // clés étrangères
    //         id_finition: req.body.id_finition,
    //         id_categorie: req.body.id_categorie,
    //         id_famille: req.body.id_famille
    //     })

    //     console.log(" *********************************************** ");
    //     console.log(" Const Piece ");
    //     console.log(Piece);
    //     console.log(" *********************************************** ");


    //     ModelPiece.create((err, data) => {
    //         if (!err) res.send(data);
    //         else console.log('Error creating Piece : ' + err)
    //     })
    // });
}