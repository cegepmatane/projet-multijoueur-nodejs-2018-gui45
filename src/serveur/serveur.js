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
var commencer = false;
var listePartie = [];
serveurJeu = new webSocket.server({httpServer: serveur});
serveur.listen(8888);



serveurJeu.on('request', function(requete){
  var connection = requete.accept('echo-protocol', requete.origine);
  connection.id = nombreJoueur;
  listeJoueur[nombreJoueur++] = connection;

  connection.on("close", function(){
    listePartie.push(connection.id);
    for(id in listeJoueur)
      {
        message = {};
        message['action'] = "PARTI";
        message['idJoueurs'] = listePartie;
        envoie = JSON.stringify(message);
        listeJoueur[id].sendUTF(envoie);
      }
    console.log(Object.keys(listeJoueur).length);
});
  connection.on('message', function(text){
    data = JSON.parse(text.utf8Data);
    console.log(data['action']);
    switch(data['action']){
      case "COMMENCER":
        commencer(connection);
      break;
      case "CHANGER_ETAT":
      changerEtat(connection, data);
      break;
    }
  });
  function changerEtat(connection, data)
  {
    message = {};
    message['action'] = "DEPLACEMENT";
    message['idJoueur'] = connection.id;
    message['valeur'] = data['valeur'];
    for(id in listeJoueur)
    {
      envoie = JSON.stringify(message);
      listeJoueur[id].sendUTF(envoie);
    }
  }
  function commencer(connection)
  {
    if(Object.keys(listeJoueur).length >= 2){
      //console.log("here");
      //console.log(envoie);
      if(!commencer){
        for(id in listeJoueur)
        {
          message = {};
          message['action'] = "COMMENCER";
          message['idJoueur'] = id;
          message['nombreJoueurs'] = nombreJoueur;
          message['partie'] = listePartie;
          envoie = JSON.stringify(message);
          listeJoueur[id].sendUTF(envoie);
        }
        commencer = true;
        }else {
          message = {};
          message['action'] = "COMMENCER";
          message['idJoueur'] = connection.id;
          message['nombreJoueurs'] = nombreJoueur;
          message['partie'] = listePartie;
          envoie = JSON.stringify(message);
          connection.sendUTF(envoie);
          for(id in listeJoueur)
          {
            message = {};
            message['action'] = "NOUVEAU_JOUEUR";
            message['idJoueur'] = connection.id;
            envoie = JSON.stringify(message);
            listeJoueur[id].sendUTF(envoie);
          }
        }
    }
  }
});
