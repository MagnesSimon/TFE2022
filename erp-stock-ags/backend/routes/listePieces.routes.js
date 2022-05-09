module.exports = app => {
    const ListePieces = require("../controllers/listePieces.controllers");

    app.get("/listePieces/", ListePieces.findAll);

    app.post("/listePieces/updateOne", ListePieces.updateQtyById)

    app.get("/listePenurie", ListePieces.findPenurie);

    app.get("/listePieces/:id", ListePieces.findOne);

    app.post("/listePieces/addpiece", ListePieces.create);
}