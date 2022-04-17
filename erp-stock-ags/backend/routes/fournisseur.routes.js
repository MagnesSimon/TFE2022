module.exports = app => {
    const Fournisseur = require("../controllers/fournisseur.controllers");

    app.get("/fournisseur/", Fournisseur.findAll);
}