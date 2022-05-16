const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get("/", (req, res) => {
    res.json("Bienvenue dans l'API ERP.");
});

app.post('/', (req, res) => {
    res.json("API d'envoie")
})

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});

require("./routes/ficheTechnique.routes.js")(app);
require("./routes/listePieces.routes")(app);
require("./routes/piece.routes")(app);
require("./routes/listeFinitions.routes")(app);
require("./routes/listeFamilles.routes")(app);
require("./routes/listeCategories.routes")(app);
require("./routes/fournisseur.routes")(app);
require("./routes/utilisateur.routes")(app);