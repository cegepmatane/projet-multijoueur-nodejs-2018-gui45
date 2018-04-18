var canvas;
var htmlAcceuil;
var htmlJeu;
var listeJoueur = [];
var listePartie = [];
var nombreJoueur;
var scene;
var client;
var id;
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
  document.onkeydown = gererToucheEnfoncee;
  document.onkeyup = gererToucheRelachee;

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
  listePartie = message['partie'];
  id = message['idJoueur'];
  console.log(message['nombreJoueurs']);
  for(i = 0; i <= message['nombreJoueurs']-1; i++)
  {
    positions = {};
    positions["x"] = i*10;
    positions["y"] = i*10;
    listeJoueur[i] = new Joueur(i, "red", positions, scene);
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
function gererToucheEnfoncee(evenement)
  {
    console.log("toucher");
    console.log(listeJoueur[2].getPositionY);
    joueur = listeJoueur[id];
      switch(evenement.keyCode)
      {
          case window.configuration.toucheGauche:
              joueur.setPositionX = joueur.getPositionX-Joueur.configuration.vitesse;
          break;

          case window.configuration.toucheDroite:
              listeJoueur[id].setPositionX = listeJoueur[id].getPositionX+Joueur.configuration.vitesse;
          break;

          case window.configuration.toucheAvancer:
              listeJoueur[id].setPositionY = listeJoueur[id].getPositionY+Joueur.configuration.vitesse;
          break;

          case window.configuration.toucheBas:
              listeJoueur[id].setPositionX = listeJoueur[id].getPositionY-Joueur.configuration.vitesse;
          break;
      }
  }
function gererToucheRelachee(evenement)
{
  client.changerStatus("TERMINER");
}
initialiser();
window.configuration = {
	toucheAvancer:87,
	toucheDroite:68,
	toucheGauche:65,
	toucheBas:83,
}
