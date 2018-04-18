var canvas;
var htmlAcceuil;
var htmlJeu;
var listeJoueur = {};
var nombreJoueur;
var scene;
var client;
function initialiser()
{
  htmlAcceuil = document.getElementById("accueil").innerHTML;
  htmlJeu = document.getElementById("jeu").innerHTML;
  client = new Client();
  document.body.innerHTML = htmlAcceuil;
  ajouterLesEvent();
}
function ajouterLesEvent()
{
  	document.body.addEventListener("DONNEE_INITIAL",valeursInitiale);
    document.body.addEventListener("PARTI",joueurParti);
}
function joueurParti(evenement)
{
  message = evenement.detail;
  console.log(message);
}
function valeursInitiale(evenement)
{
  message = evenement.detail;
  for(i = 1; i <= message['nombreJoueurs']; i++)
  {
    positions = {};
    positions["x"] = i*10;
    positions["y"] = i*10;
    joueur = new Joueur(i, "red", positions, scene);
    listeJoueur[i] = joueur;
  }
}
function rafraichirJeu(evenement)
{
  scene.update(evenement);
}
function commencer()
{
  document.body.innerHTML = htmlJeu;
  canvas = document.getElementById('canvas');
  console.log(canvas);
  scene = new createjs.Stage(canvas);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", rafraichirJeu);
  client.commencer();
}
initialiser();
