function Balle(nomPropriertaire, destination, depart)
{
	var forme;
	var animationJoueur;
	var intervalBouger;
	forme.x = depart['x'];
	forme.y = depart['y'];
	intervalBouger = setInterval(bouger,10);
	//console.log(forme.x);
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
}
module.exports = {
	Balle: Balle
};
