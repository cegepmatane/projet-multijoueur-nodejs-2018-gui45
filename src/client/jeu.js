var canvas;
var vueDepart;
var vueJeu;
var vueMort;
var vueModification;
var vueVictoire;
var vueChargement;
var listeJoueur = [];
var listePartie = [];
var listeBalle = [];
var nombreJoueur;
var scene;
var client;
var id;
var joueurEnMouvement = {};
var partieCommencer;
var joueurRestant;
var evenementDepart;
var nom;
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
  vueModification = new VueModification();
  vueChargement = new VueChargement();
  vueDepart = new VueDepart();
  vueJeu = new VueJeu();
  vueMort = new VueMort();
  vueVictoire = new VueVictoire();
  client = new Client();
  window.addEventListener("hashchange", interpreterEvenementLocation);
  window.location.hash = "";
  interpreterEvenementLocation();
}
function ajouterLesEvent()
{
  document.onkeydown = gererToucheEnfoncee;
  document.onkeyup = gererToucheRelachee;

  document.body.addEventListener("PARTI",joueurParti);
  document.body.addEventListener("TOUCHER",mort);
  document.body.addEventListener("DEPLACEMENT",gererDeplacements);
  document.body.addEventListener("NOUVEAU_JOUEUR",gereNouveauJoueurs);
  document.body.addEventListener("TIRE", tireJoueurs)
  document.body.addEventListener("VICTOIRE", victoire)
}
function tireJoueurs(evenement)
{
  message = evenement.detail;
  listeBalle.push(new Balle(message['destination'], message['source']));
}
function victoire(evenement)
{
  window.location.hash = "victoire";
}
function mort(evenement)
{
  console.log(evenement.detail);
  window.location.hash = "mort";
}
function tirer(evenement)
{
  position = {};
  position['x'] = evenement.clientX;
  position['y'] = evenement.clientY;

  //listeBalle.push(new Balle(position, listeJoueur[id].getPositioXY()));

  client.tirer(position);
}
function gereNouveauJoueurs(evenement)
{
  message = evenement.detail;
  position = message['position']
  id = message['idJoueur'];
  if(!listeJoueur[id])
    listeJoueur[id] = new Joueur(id, window.configuration.courleurJoueur, position, scene);
  nombreJoueur++;
  joueurRestant = message['joueurRestant'];
  vueJeu.changerJoueurRestant(joueurRestant);
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
function joueurParti(evenement)
{
  message = evenement.detail;
  console.log(message);
  //if(listeJoueur[message['idJoueur']])
  listeJoueur[message['idJoueur']].retirer();
  vueJeu.changerJoueurRestant(message['joueurRestant']);
}
function depart(evenement)
{
  window.location.hash = "jeu";
  evenementDepart = evenement;
  joueurRestant = evenement.detail['joueurRestant'];
}
function valeurInitiale(evenement)
{
  canvas = document.getElementById('canvas');
  //console.log(canvas);
  scene = new createjs.Stage(canvas);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", rafraichirJeu);
  message = evenement.detail;
  listePartie = message['partie'];
  id = message['idJoueur'];
  //console.log(message['nombreJoueurs']);
  for(i = 0; i <= message['idJoueur']; i++)
  {
    positions = {};
    positions["x"] = i*10;
    positions["y"] = i*10;
    if(!listeJoueur[i])
      listeJoueur[i] = new Joueur(i, window.configuration.courleurJoueur, positions, scene);
  }
  setTimeout(retirerJoueurs, 100);
  //console.log(listeJoueur);
  //console.log(message['joueursPatie']);
  document.body.addEventListener("click",tirer)
}
function retirerJoueurs(){
  for(id in listePartie)
  {
    listeJoueur[listePartie[id]].retirer();
  }
}
function rafraichirJeu(evenement)
{
  deplacerJoueurs();
  //4console.log(evenement.delta);
  scene.update(evenement);
}
function commencer()
{
  nom = document.getElementById("champNom").value;
  //console.log(nom);
  document.body.addEventListener("DONNEE_INITIAL",depart);
  window.location.hash = "chargement";
  client.commencer();
  return false;
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
function interpreterEvenementLocation(event)
{
  var instructionNavigation = window.location.hash;
  if(!instructionNavigation || instructionNavigation.match(/^#accueil$/)){
    vueDepart.afficher();
  }else if(instructionNavigation.match(/^#jeu$/)){
    vueJeu.afficher(nom);
    vueJeu.changerJoueurRestant(joueurRestant);
    valeurInitiale(evenementDepart);
    ajouterLesEvent();
  }else if(instructionNavigation.match(/^#mort$/)){
    vueMort.afficher();
  }else if(instructionNavigation.match(/^#victoire$/)){
    vueVictoire.afficher();
  }else if(instructionNavigation.match(/^#chargement/)){
    vueChargement.afficher();
  }else if(instructionNavigation.match(/^#modification/)){
    vueModification.afficher();
  }
}
initialiser();
window.configuration = {
	toucheAvancer:87,
	toucheDroite:68,
	toucheGauche:65,
	toucheBas:83,
  courleurJoueur:"gray"
}
