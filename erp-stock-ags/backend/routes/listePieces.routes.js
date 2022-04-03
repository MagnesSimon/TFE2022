module.exports = app => {
    const listePieces = require("../controllers/listePieces.controllers");

    app.get("/listePieces", listePieces.findAll);

    app.update("/listePieces/update/:id", listePieces.update);
}