module.exports = app => {
    const Fournisseur = require("../controllers/fournisseur.controllers");

    app.get("/fournisseur/", Fournisseur.findAll);

    app.post("/fournisseur/addFournisseur/", Fournisseur.create);

    app.get("/localite/", Fournisseur.findAllLocalite);

    app.post("/fournisseur/updateById", Fournisseur.updateById);

    app.get("/fournisseur/:id", Fournisseur.findOne);

    app.delete("/fournisseur/delete/:id", Fournisseur.delete);

}