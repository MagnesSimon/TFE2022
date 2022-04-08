module.exports = app => {
    const ficheTechnique = require("../controllers/ficheTechnique.controllers.js");

    app.get("/ficheTechnique", ficheTechnique.findAll);

    app.get("/ficheTechnique/:id", ficheTechnique.findOne);

    /*
   
       app.put("/famille/:id", famille.update);
   
       app.delete("/famille/:id", famille.delete);
   */
}