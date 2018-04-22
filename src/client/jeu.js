var canvas;
var htmlAcceuil;
var htmlJeu;
var listeJoueur = [];
var listePartie = [];
var nombreJoueur;
var scene;
var client;
var id;
var joueurEnMouvement = {};
var partieCommencer;
var Etat = {
  enAtente : "EN ATTENTE",
  enDeplacementDroit : "ETAT EN DEPLACEMENT DROIT",
  enDeplacementGauche : "ETAT EN DEPLACEMENT GAUCHE",
  enDeplacementHAUT : "ETAT EN DEPLACEMENT HAUT",
  enDeplacementBAS : "ETAT EN DEPLACEMENT BAS"
}

function initialiser()
{
  partieCommencer = false;
  htmlAcceuil = document.getElementById("accueil").innerHTML;
  htmlJeu = document.getElementById("jeu").innerHTML;
  client = new Client();
  document.body.innerHTML = htmlAcceuil;
  document.body.addEventListener("DONNEE_INITIAL",valeursInitiale);
  ajouterLesEvent();
}
function ajouterLesEvent()
{
  document.onkeydown = gererToucheEnfoncee;
  document.onkeyup = gererToucheRelachee;


  document.body.addEventListener("PARTI",joueurParti);
  document.body.addEventListener("DEPLACEMENT",gererDeplacements);
  document.body.addEventListener("NOUVEAU_JOUEUR",gereNouveauJoueurs);
}
function gereNouveauJoueurs(evenement)
{
  message = evenement.detail;
  position = message['position']
  id = message['idJoueur'];
  listeJoueur[id] = new Joueur(id, "red", position, scene);
  nombreJoueur++;
}
function gererDeplacements(evenement)
{
  message = evenement.detail;
  joueur = listeJoueur[message['idJoueur']];
  position = message['position'];
  joueur.setPositionY(position['y']);
  joueur.setPositionX(position['x']);
  console.log(message['valeur']);
  switch (message['valeur']) {
    case Etat.enAtente:
      joueur.setEtatCourrant(Etat.enAtente);
      break;
    case Etat.enDeplacementBAS:
      joueur.setEtatCourrant(Etat.enDeplacementBAS);
      break;
    case Etat.enDeplacementHAUT:
      joueur.setEtatCourrant(Etat.enDeplacementHAUT);
      break;
    case Etat.enDeplacementDroit:
      joueur.setEtatCourrant(Etat.enDeplacementDroit);
      break;
    case Etat.enDeplacementGauche:
      joueur.setEtatCourrant(Etat.enDeplacementGauche);
      break;
  }
}
function deplacerJoueurs()
{
  for(id in listeJoueur)
  {
    joueur = listeJoueur[id];
    //console.log(joueur.getEtatCourant());
    switch (joueur.getEtatCourant()) {
      case Etat.enDeplacementBAS:
        joueur.setPositionY(joueur.getPositionY()+Joueur.configuration.vitesse);
        break;
      case Etat.enDeplacementHAUT:
        joueur.setPositionY(joueur.getPositionY()-Joueur.configuration.vitesse);
        break;
      case Etat.enDeplacementGauche:
        joueur.setPositionX(joueur.getPositionX()-Joueur.configuration.vitesse);
        break;
      case Etat.enDeplacementDroit:
        joueur.setPositionX(joueur.getPositionX()+Joueur.configuration.vitesse);
        break;
    }
  }
}
function joueurParti(evenement)//TODO terminer cette method
{
  message = evenement.detail;
  console.log(message);
}
function valeursInitiale(evenement)
{
  message = evenement.detail;
  listePartie = message['partie'];
  id = message['idJoueur'];
  //console.log(message['nombreJoueurs']);
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
  deplacerJoueurs();
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
    //console.log("toucher");
    //console.log(listeJoueur[2].getPositionY());
    joueur = listeJoueur[id];
      switch(evenement.keyCode)
      {
          case window.configuration.toucheGauche:
            client.changerEtat(Etat.enDeplacementGauche);
            break;
          case window.configuration.toucheDroite:
            client.changerEtat(Etat.enDeplacementDroit);
            break;
          case window.configuration.toucheAvancer:
            client.changerEtat(Etat.enDeplacementHAUT);
            break;
          case window.configuration.toucheBas:
            client.changerEtat(Etat.enDeplacementBAS);
            break;
      }
  }
function gererToucheRelachee(evenement)
{
  client.changerEtat(Etat.enAtente);
}
initialiser();
window.configuration = {
	toucheAvancer:87,
	toucheDroite:68,
	toucheGauche:65,
	toucheBas:83,
}
