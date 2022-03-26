module.exports = app => {
    const ficheTechnique = require("../controllers/ficheTechnique.controllers.js");

    app.get("/ficheTechnique", ficheTechnique.findAll);
 /*
    app.get("/famille/:id", famille.findOne);

    app.put("/famille/:id", famille.update);

    app.delete("/famille/:id", famille.delete);
*/
}