module.exports = app => {
    const Piece = require("../controllers/piece.controllers");

    app.post("/addPiece/", Piece.create);
}