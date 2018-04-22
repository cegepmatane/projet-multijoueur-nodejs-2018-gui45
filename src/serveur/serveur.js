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
var patieCommencer = false;
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
    message['position'] = connection.position;
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
      //console.log(commencer);
      //console.log(envoie);
      if(!patieCommencer){
        //console.log("here");
        for(id in listeJoueur)
        {
          //console.log("here");
          position = {};//initialise les positions
          position['x'] = connection.id * 10;
          position['y'] = connection.id * 10;
          connection.position = position;

          message = {};//message = message a envoyer
          message['action'] = "COMMENCER";
          message['idJoueur'] = id;
          message['position'] = position;
          message['nombreJoueurs'] = nombreJoueur;
          message['partie'] = listePartie;
          envoie = JSON.stringify(message);
          listeJoueur[id].sendUTF(envoie);
        }
        patieCommencer = true;
      }else {
        //console.log("else");
        position = {};//initialise les positions
        position['x'] = connection.id * 10;
        position['y'] = connection.id * 10;
        connection.position = position;

        message = {};//message = message a envoyer
        message['action'] = "COMMENCER";
        message['idJoueur'] = connection.id;
        message['position'] = position;
        message['nombreJoueurs'] = nombreJoueur;
        message['partie'] = listePartie;
        envoie = JSON.stringify(message);
        connection.sendUTF(envoie);

        message['action'] = "NOUVEAU_JOUEUR";// pour les autres joueur on envoi un evenement nouveau joueur
        envoie = JSON.stringify(message);
        for(id in listeJoueur)
        {
          //console.log(message);
          listeJoueur[id].sendUTF(envoie);
        }
      }
    }
  }
});
