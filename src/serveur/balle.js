function Balle(nomPropriertaire, destination, depart)
{
	var forme = {};
	var animationJoueur;
	var intervalBouger;
	forme['x'] = depart['x'];
	forme['y'] = depart['y'];
	intervalBouger = setInterval(bouger,1000/60);
	//console.log(forme.x);
	function bouger()
	{
		var distanceX = ((destination['x']) - forme['x']);
		var distanceY = ((destination['y']) - forme['y']);
		var distance = (Math.sqrt(distanceX * distanceX + distanceY * distanceY));
		//console.log(distanceX);
		forme['x'] = forme['x'] + 2 * distanceX/distance;
		forme['y'] = forme['y'] + 2 * distanceY/distance;
	}
	this.getNomProprietaire = function()
	{
		return nomPropriertaire;
	}
	this.getPositionX = function()
	{
		return forme['x'];
	}
	this.getPositionY = function()
	{
		return forme['y'];
	}
}
module.exports = {
	Balle: Balle
};
