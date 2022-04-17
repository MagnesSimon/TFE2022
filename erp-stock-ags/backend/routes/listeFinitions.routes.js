module.exports = app => {
    const ListeFinition = require("../controllers/listeFinitions.controllers");

    app.get("/listeFinitions/", ListeFinition.findAll);

    app.post("/listeFinitions/addFinition", ListeFinition.create)
}