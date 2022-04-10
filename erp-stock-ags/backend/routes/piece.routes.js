module.exports = app => {
    const Piece = require("../controllers/piece.controllers");

    app.post("/piece/addPiece/", Piece.create);

}