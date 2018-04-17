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
var listeJoueur = [];
var nombreJoueur = 0;
var http = require('http');
var serveur = http.createServer(repondre);
var webSocket = require('WebSocket');
var commencer = false;
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

        if(listeJoueur.length >= 2){
          //console.log("here");

          //console.log(envoie);
          if(!commencer){
            for(id in listeJoueur)
              { message = {};
                message['action'] = "COMMENCER";
                message['idJoueur'] = id;
                message['nombreJoueur'] = nombreJoueur;
                envoie = JSON.stringify(message);
                listeJoueur[id].sendUTF(envoie);
              }
              commencer = true;
            }else {
              message['action'] = "COMMENCER";
              message['idJoueur'] = connection.id;
              message['nombreJoueur'] = nombreJoueur;
              envoie = JSON.stringify(message);
              connection.sendUTF(envoie);
            }
        }
      break;
    }
  });
});
