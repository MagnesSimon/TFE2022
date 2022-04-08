const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const nodemailer = require('nodemailer');
const creds = require('./config/mail.config.js');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// app.use(bodyParser.json())
//     .use(bodyParser.urlencoded({
//         extended: true
//     }))
//     .use(cors())
//     .use(function (req, res, next) {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//         next();
//     });

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