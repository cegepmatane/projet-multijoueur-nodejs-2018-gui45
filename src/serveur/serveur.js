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
var listePartie = [];
var listeJoueur = [];
function cycle()
{
  gererDeplacements();
  collisionBalle();
  if(listeJoueur.length - listePartie.length < 2)
    victiore();
}
function victiore()
{
  joueur = null;
  for(id in listeJoueur){
    if(listeJoueur[id]){
      joueur = listeJoueur[id];
    }
  }
  //console.log(joueur);
  message = {};
  message['action'] = "VICTOIRE";
  envoie = JSON.stringify(message);
  if(joueur)
    joueur.sendUTF(envoie);
}
function collisionBalle() {
  for(idBalle in listeBalle)
  {
    balle = listeBalle[idBalle];
    for(idJoueur in listeJoueur)
    {
      joueur = listeJoueur[idJoueur];
      if(joueur != undefined && joueur.position != undefined)
      {
        //console.log("joueur");
        if(((joueur.position.y - 2 ) <  balle.getPositionY() && balle.getPositionY() < (joueur.position.y + 2)) &&
    			((joueur.position.x - 2 ) <  balle.getPositionX() && balle.getPositionX() < (joueur.position.x + 2)))
        {
          if(joueur.id != balle.getNomProprietaire()){
            listePartie.push(joueur.id);
            for(id in listeJoueur){
              if(listeJoueur[id].id == joueur.id)
                listeJoueur.splice(id, 1);
              }
            console.log("toucher");
            message = {};
            message['action'] = "TOUCHER";
            message['idJoueur'] = joueur.id;
            message['joueurRestant'] = listeJoueur.length - listePartie.length;
            envoie = JSON.stringify(message);
            joueur.sendUTF(envoie);

            message['action'] = "PARTI";
            envoie = JSON.stringify(message);
          }
          for(id in listeJoueur)
          {
              listeJoueur[id].sendUTF(envoie);
          }
        }
      }
    }
  }
}
function gererDeplacements()
{
  for(id in listeJoueur)
  {
    joueur = listeJoueur[id];
    //console.log(joueur.etat);
    if(joueur.position != undefined){
      switch (joueur.etat) {
        case Etat.enDeplacementBAS:
          joueur.position.y = joueur.position.y+5;
          break;
        case Etat.enDeplacementHAUT:
          joueur.position.y = joueur.position.y-5;
          break;
        case Etat.enDeplacementGauche:
          joueur.position.x = joueur.position.x-5;
          break;
        case Etat.enDeplacementDroit:
          joueur.position.x = joueur.position.x+5;
          break;
      }
    }
  }
}

var nombreJoueur = 0;
var http = require('http');
var serveur = http.createServer(repondre);
var webSocket = require('WebSocket');
var patieCommencer = false;

var listeBalle = [];
var Etat = {
  enAtente : "EN ATTENTE",
  enDeplacementDroit : "ETAT EN DEPLACEMENT DROIT",
  enDeplacementGauche : "ETAT EN DEPLACEMENT GAUCHE",
  enDeplacementHAUT : "ETAT EN DEPLACEMENT HAUT",
  enDeplacementBAS : "ETAT EN DEPLACEMENT BAS"
}
let Balles = require("./balle");
let Balle = Balles.Balle;
var intervalCycle = setInterval(cycle, 1000/60);
serveurJeu = new webSocket.server({httpServer: serveur});
serveur.listen(8888);

serveurJeu.on('request', function(requete){
  var connection = requete.accept('echo-protocol', requete.origine);
  connection.id = nombreJoueur++;
  listeJoueur[connection.id] = connection;

  connection.on("close", function(){
    listePartie.push(connection.id);
    for(id in listeJoueur){
      if(listeJoueur[id].id == connection.id)
        listeJoueur.splice(id, 1);
    }
    message = {};
    message['action'] = "PARTI";
    message['idJoueur'] = connection.id;
    message['joueurRestant'] = listeJoueur.length - listePartie.length;
    envoie = JSON.stringify(message);
    for(id in listeJoueur)
      {
        console.log(id);
        listeJoueur[id].sendUTF(envoie);
      }
    console.log(listeJoueur.length);
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
      case "TIRER":
        tirer(connection, data);
        break;
    }
  });
  function tirer()
  {
    if(connection.position != undefined){// si l'èvènement est lever trop top certain joueur n'ont pas de position
      listeBalle.push(new Balle(connection.id, data['destination'], connection.position));
      message = {};
      message['action'] = "TIRE";
      message['idJoueur'] = connection.id;
      message['source'] = connection.position;
      message['destination'] = data['destination'];
      envoie = JSON.stringify(message);
      for(id in listeJoueur)
      {
        listeJoueur[id].sendUTF(envoie);
      }
    }

  }
  function changerEtat(connection, data)
  {
    message = {};
    message['action'] = "DEPLACEMENT";
    message['idJoueur'] = connection.id;
    message['position'] = connection.position;
    message['valeur'] = data['valeur'];
    connection.etat = data['valeur'];
    envoie = JSON.stringify(message);
    for(id in listeJoueur)
    {

      listeJoueur[id].sendUTF(envoie);
    }
  }
  function commencer(connection)
  {
    if(listeJoueur.length >= 2){
      //console.log(commencer);
      //console.log(envoie);
      if(!patieCommencer){
        //console.log("here");
        position = {};//initialise les positions
        position['x'] = connection.id * 10;
        position['y'] = connection.id * 10;
        connection.position = position;
        connection.etat = Etat.enAtente;

        message = {};//message = message a envoyer
        message['action'] = "COMMENCER";
        message['idJoueur'] = id;
        message['position'] = position;
        message['nombreJoueurs'] = nombreJoueur;
        message['joueurRestant'] = listeJoueur.length - listePartie.length;
        message['partie'] = listePartie;
        envoie = JSON.stringify(message);
        for(id in listeJoueur)
        {
          //console.log("here");
          listeJoueur[id].sendUTF(envoie);
        }
        patieCommencer = true;
      }else {
        //console.log("else");
        position = {};//initialise les positions
        position['x'] = connection.id * 10;
        position['y'] = connection.id * 10;
        connection.position = position;
        connection.etat = Etat.enAtente;

        message = {};//message = message a envoyer
        message['action'] = "COMMENCER";
        message['idJoueur'] = connection.id;
        message['position'] = position;
        message['joueursPatie'] = listePartie;
        message['nombreJoueurs'] = nombreJoueur;
        message['joueurRestant'] = listeJoueur.length - listePartie.length;
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
