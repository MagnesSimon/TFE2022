module.exports = app => {
    const ListePieces = require("../controllers/listePieces.controllers");

    app.get("/listePieces/", ListePieces.findAll);

    app.post("/listePieces/updateOne", ListePieces.updateQtyById)

    app.get("/listePenurie", ListePieces.findPenurie);

    app.get("/listePieces/:id", ListePieces.findOne);

    app.post("/listePieces/addpiece", ListePieces.create);

    app.post("/listePieces/updateFT", ListePieces.updateById);

    app.delete("/listePieces/delete/:id", ListePieces.delete);

    app.get("/listePieces/search/:id", ListePieces.findSearch);

    app.get("/listePenurie/search/:id", ListePieces.findSearchPenurie);

}