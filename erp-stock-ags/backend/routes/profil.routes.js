module.exports = app => {
    const profil = require("../controllers/profil.controllers.js");

    // app.post("/listeProfil/add_profil", profil.create);

    app.get("/listeProfil", profil.findAll);

    app.get("/listeProfil/:id", profil.findOne);

    // app.get("/listeUtilisateurbyusername/:username", profil.findUsername);

    app.post("/listeProfil/update/", profil.update);

    //app.delete("/user/:id", user.delete);

};