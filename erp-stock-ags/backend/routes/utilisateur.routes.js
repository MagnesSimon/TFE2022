module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");

    app.post("/listeUtilisateur/addUtilisateur", utilisateur.create);

    app.get("/listeUtilisateur", utilisateur.findAll);

    app.get("/listeUtilisateur/:id", utilisateur.findOne);

    app.get("/listeUtilisateurbyusername/:username", utilisateur.findUsername);

    app.put("/utilisateur/update/:id", utilisateur.update);

    //app.delete("/user/:id", user.delete);

};