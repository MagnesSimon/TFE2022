module.exports = app => {
    const Historique = require("../controllers/historique.controllers");

    app.get("/historique/", Historique.findAll);

    app.post("/historique/addhistorique/", Historique.create);

    app.get("/historique/search/:id", Historique.findSearch);

}