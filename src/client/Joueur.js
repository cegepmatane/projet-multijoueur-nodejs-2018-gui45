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
    console.log(nom + "cree")
    etatCourrant = Etat.enAtente;
  }
  function dessiner(couleur)
  {
    forme = new createjs.Shape();
		forme.graphics.beginFill(couleur).drawRect(positions['x'], positions['y'], 10, 10).endFill();
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
  initialiser();
}
Joueur.configuration = {
  vitesse:5,
  hauteur:10,
  largeurCanvas:10
}
