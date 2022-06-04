module.exports = app => {
    const profil = require("../controllers/profil.controllers.js");

    app.get("/listeProfil", profil.findAll);

    app.get("/listeProfil/:id", profil.findOne);

    app.post("/listeProfil/update/", profil.update);

};