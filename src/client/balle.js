function Balle (nomPropriertaire, destination, depart){
	var forme;
	var animationJoueur;
	var intervalBouger;
	function initialiser()
	{
		forme = new createjs.Shape();
		forme.graphics.beginFill("black").drawCircle(0, 0, 10);
		forme.x = depart['x'];
		forme.y = depart['y'];
		scene.addChild(forme);
		intervalBouger = setInterval(bouger,10);
		//console.log(forme.x);
	}
	function bouger()
	{
		var distanceX = (destination['x']) - forme.x;
		var distanceY = (destination['y']) - forme.y;
		var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
		//console.log(distanceX);
		forme.x = forme.x + Balle.configuration.vitesse * distanceX/distance;
		forme.y = forme.y + Balle.configuration.vitesse * distanceY/distance;
    if(destination['x'] == forme.x && destination['y'] == forme.y)
      scene.removeChild(forme);
	}
  this.getNomProprietaire = function()
  {
    return nomPropriertaire;
  }
  this.getPositionX = function()
  {
    return forme.x;
  }
  this.getPositionY = function()
  {
    return forme.y;
  }
	initialiser();
}
Balle.configuration= {
	vitesse:3
}
