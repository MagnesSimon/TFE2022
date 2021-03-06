module.exports = app => {
    const ListeFinition = require("../controllers/listeFinitions.controllers");

    app.get("/listeFinitions/", ListeFinition.findAll);

    app.post("/listeFinitions/addFinition", ListeFinition.create)

    app.post("/listeFinitions/updateById", ListeFinition.updateById);

    app.get("/listeFinitions/:id", ListeFinition.findOne);

    app.delete("/listeFinitions/delete/:id", ListeFinition.delete);

    app.get("/listeFinitions/search/:id", ListeFinition.findSearch);

}