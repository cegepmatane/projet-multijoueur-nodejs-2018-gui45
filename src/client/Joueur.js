function Joueur(nom, couleur, position, scene){
  var forme;
  var etatCourrant;
  var Etat = {
    enAtente : "EN ATTENTE",
    enDeplacementDroit : "ETAT EN DEPLACEMENT DROIT",
    enDeplacementGauche : "ETAT EN DEPLACEMENT GAUCHE",
    enDeplacementHAUT : "ETAT EN DEPLACEMENT HAUT",
    enDeplacementBAS : "ETAT EN DEPLACEMENT BAS"
  }
  function initialiser()
  {
    dessiner(couleur);
    //console.log(nom + "cree")
    etatCourrant = Etat.enAtente;
  }
  function dessiner(couleur)
  {
    chargeur = new createjs.LoadQueue(false);
    chargeur.on('complete', terminer);
    chargeur.loadManifest({
      id:'svg',
      src:'images/vaisseauJeu.svg',
      type: createjs.AbstractLoader.IMAGE
    })
  }
  function terminer(evenement)
  {
    forme = new createjs.Bitmap(chargeur.getResult('svg'));
    forme['x'] = position['x'];
    forme['y'] = position['y'];
    scene.addChild(forme);
  }
  this.setPositionX = function(x)
  {
    forme.x = x;
    //console.log(x + " " + forme.x);
  }
  this.setPositionY = function(y)
  {
    forme.y = y;
    //console.log(y + " " + forme.y);
  }
  this.getPositionX = function()
  {
    return forme.x;
  }
  this.getPositioXY = function()
  {
    positionXY = {};
    positionXY['x'] = forme.x;
    positionXY['y'] = forme.y;
    return position;
  }
  this.getPositionY = function()
  {
    return forme.y;
  }
  this.getEtatCourant = function()
  {
    return etatCourrant;
  }
  this.setEtatCourrant = function(etat)
  {
    etatCourrant = etat;
  }
  this.retirer = function()
  {
    scene.removeChild(forme);
  }
  initialiser();
}
Joueur.configuration = {
  vitesse:5,
  hauteur:10,
  largeurCanvas:10
}
