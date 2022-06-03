module.exports = app => {
    const ListeCategories = require("../controllers/listeCategories.controllers");

    app.get("/listeCategories/", ListeCategories.findAll);

    app.post("/listeCategories/addCategorie", ListeCategories.create)

    app.post("/listeCategories/updateById", ListeCategories.updateById);

    app.get("/listeCategories/:id", ListeCategories.findOne);

    app.delete("/listeCategories/delete/:id", ListeCategories.delete);

    app.get("/listeCategories/search/:id", ListeCategories.findSearch);

}