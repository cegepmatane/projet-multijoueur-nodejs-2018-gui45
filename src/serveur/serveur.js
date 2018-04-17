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
var listeJoueur = {};
var nombreJoueur = 0;
var http = require('http');
var serveur = http.createServer(repondre);
var webSocket = require('WebSocket');
serveurJeu = new webSocket.server({httpServer: serveur});

serveur.listen(8888);

serveurJeu.on('request', function(requete){
  var connection = requete.accept('echo-protocol', requete.origine);
  connection.id = nombreJoueur;
  listeJoueur[nombreJoueur++] = connection;

  connection.on('message', function(text){
    data = JSON.parse(text.utf8Data);
    console.log(data['action']);
    switch(data['action']){
      case "COMMENCER":
        console.log(connection.id);
        console.log(listeJoueur.length);
        console.log(listeJoueur.size);
        if(listeJoueur.length >= 2){
          console.log("here");
          message = {};
          message['action'] = "COMMENCER";
          envoie = JSON.stringify(message);
          for(id in listeJoueur)
            {
              listeJoueur[id].sendUTF(envoie);
            }
        }
      break;
    }
  });
});
