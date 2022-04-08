module.exports = app => {
    const ListePieces = require("../controllers/listePieces.controllers");

    app.get("/listePieces", ListePieces.findAll);

    //app.update("/listePieces/update/:id", listePieces.update);

    app.post("/listePieces", ListePieces.create);
}