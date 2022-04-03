module.exports = app => {
    const listePieces = require("../controllers/listePieces.controllers");

    app.get("/listePieces", listePieces.findAll);

    app.put("/listePieces/update/:id", listePieces.update);
}