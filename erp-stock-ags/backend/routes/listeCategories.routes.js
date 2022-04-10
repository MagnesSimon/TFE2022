module.exports = app => {
    const ListeCategories = require("../controllers/listeCategories.controllers");

    app.get("/listeCategories/", ListeCategories.findAll);
}