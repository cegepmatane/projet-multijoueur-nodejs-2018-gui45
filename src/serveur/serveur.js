var repondre = function(requete, reponse)
{
  requete.on('data', function(text)
  {
    console.log("repondre" + text);
  });
  reponse.setHeader('Content-Type', 'text/html; charset=utf-8');
  reponse.writeHead(200);
  reponse.end('requte recu');
}

var http = require('http');
var serveur = http.createServer(repondre);
var webSocket = require('WebSocket');
serveurJeu = new webSocket.server({httpServer: serveur});

serveur.listen(8888);

serveurJeu.on('request', function(requete){
  var connection = requete.accept('echo-protocol', requete.origine);
  connection.on('message', function(text){
    console.log("connection " + text.utf8Data);
  });
});
