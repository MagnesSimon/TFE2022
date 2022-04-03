module.exports = app => {
    const listePieces = require("../controllers/listePieces.controllers");

    app.get("/listePieces", listePieces.findAll);

    app.post("/listePieces/update/:id/:qte", listePieces.update);

    app.put("/listePieces/create/:id", listePieces.update);

    app.post("/udpatetest/:id", async (req, res) => {
        const id = req.params.id
        const record = await repo.update(id, req.body)
        console.log(`Record Updated : 
    \n${JSON.stringify(record, null, 2)}`)
        res.send('Record Updated')
    })
}