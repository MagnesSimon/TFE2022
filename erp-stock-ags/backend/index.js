const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const nodemailer = require('nodemailer');
const creds = require('./config/mail.config.js');
const Piece = require('./models/listePieces.models');

const app = express();


app.use(bodyParser.json())
app.use(cors());

app.put('/listePieces/:id', (req, res, next) => {
    Piece.updateById({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch()
});

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