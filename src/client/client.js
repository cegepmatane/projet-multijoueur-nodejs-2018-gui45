var socket;
var htmlAcceuil;
var htmlJeu;
var listeJoueur = {};
var scene;
var canvas;
var nom;
function initialiser()
{
  socket = new WebSocket('ws://localhost:8888','echo-protocol');
  socket.addEventListener('message', evenementMessage);
  htmlAcceuil = document.getElementById("accueil").innerHTML;
  htmlJeu = document.getElementById("jeu").innerHTML;

  document.body.innerHTML = htmlAcceuil;
}
function commencer()
{
  data = {};
  data['action'] = "COMMENCER";
  envoie = JSON.stringify(data);
  socket.send(envoie);
  return false;
}
function rafraichirJeu(evenement)
{
  scene.update(evenement);
}
function commencerJeu(message)
{
  document.body.innerHTML = htmlJeu;
  canvas = document.getElementById('canvas');
  console.log(canvas);
  scene = new createjs.Stage(canvas);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", rafraichirJeu);
  nom = message['idJoueur'];
  console.log(message['nombreJoueurs']);
  for(i = 1; i <= message['nombreJoueurs']; i++)
  {

    positions = {};
    positions["x"] = i*10;
    positions["y"] = i*10;
    joueur = new Joueur(i, "red", positions, scene);
    listeJoueur[i] = joueur;
  }
}
function evenementMessage(message)
{
  //console.log(message);
  data = JSON.parse(message.data);
  console.log(data['action']);
  switch (data['action']) {
    case "COMMENCER":
      commencerJeu(data);
    break;
  }
}
initialiser();
window.configuration = {

}
