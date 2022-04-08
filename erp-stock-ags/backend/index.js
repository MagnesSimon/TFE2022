const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const nodemailer = require('nodemailer');
const creds = require('./config/mail.config.js');
const Piece = require('./models/listePieces.models');

const app = express();


app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(cors())
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Headers", 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });

app.put('/listePieces/:id', (req, res, next) => {
    Piece.updateById({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch()
});

app.get("/", (req, res) => {
    res.json("Bienvenue dans l'API ERP.");
});


app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});

require("./routes/ficheTechnique.routes.js")(app);
require("./routes/listePieces.routes")(app);