module.exports = app => {
    const ListePieces = require("../controllers/listePieces.controllers");

    app.get("/listePieces", ListePieces.findAll);
}