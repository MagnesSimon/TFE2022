const http = require('http');

const server = http.createServer((req,res) => {
    res.end('Voilà la réponse');
});

server.listen(process.end.PORT || 3000);