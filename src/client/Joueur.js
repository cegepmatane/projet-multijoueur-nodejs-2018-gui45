function Joueur(nom, couleur, position, scene){
  var forme;
  function initialiser()
  {
    dessiner(couleur);
    console.log(nom + "cree")
  }
  function dessiner(couleur)
  {
    forme = new createjs.Shape();
		forme.graphics.beginFill(couleur).drawRect(positions['x'], positions['y'], 10, 10).endFill();
		scene.addChild(forme);
  }
  initialiser();
}
Joueur.configuration = {
  vitesse:5,
  hauteur:10,
  largeurCanvas:10
}
