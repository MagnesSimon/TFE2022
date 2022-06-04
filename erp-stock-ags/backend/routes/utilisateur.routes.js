module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");

    app.post("/listeUtilisateur/addUtilisateur", utilisateur.create);

    app.get("/listeUtilisateur", utilisateur.findAll);

    app.get("/listeUtilisateur/:id", utilisateur.findOne);

    app.get("/listeUtilisateurbyusername/:username", utilisateur.findUsername);

    app.post("/utilisateur/update/", utilisateur.update);

    app.delete("/utilisateur/:id", utilisateur.delete);

    app.get("/utilisateur/search/:id", utilisateur.findSearch);

};