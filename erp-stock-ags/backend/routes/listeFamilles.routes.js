module.exports = app => {
    const ListeFamilles = require("../controllers/ListeFamilles.controllers");

    app.get("/listeFamilles/", ListeFamilles.findAll);

    app.post("/listeFamilles/addFamille", ListeFamilles.create);

    app.post("/listeFamilles/updateById", ListeFamilles.updateById);

    app.get("/listeFamilles/:id", ListeFamilles.findOne);

    app.delete("/listeFamilles/delete/:id", ListeFamilles.delete);

    app.get("/listeFamilles/search/:id", ListeFamilles.findSearch);

}