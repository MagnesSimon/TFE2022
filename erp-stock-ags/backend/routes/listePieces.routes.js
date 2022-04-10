module.exports = app => {
    const ListePieces = require("../controllers/listePieces.controllers");

    app.get("/listePieces", ListePieces.findAll);

    app.post("/listePieces/updateOne", ListePieces.updateQtyById)
}