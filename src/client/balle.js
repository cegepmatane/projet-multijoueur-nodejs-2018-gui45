function Balle (destination, depart){
	var forme;
	var animationJoueur;
	var intervalBouger;
	var chargeur;
	function initialiser()
	{
		chargeur = new createjs.LoadQueue(false);
		chargeur.on('complete', terminer);
		chargeur.loadManifest({
			id:'svg',
			src:'images/balle.svg',
			type: createjs.AbstractLoader.IMAGE
		})
	}
	function terminer(evenement)
	{
		forme = new createjs.Bitmap(chargeur.getResult('svg'));
		forme['x'] = depart['x'];
		forme['y'] = depart['y'];
		scene.addChild(forme);
		intervalBouger = setInterval(bouger,1000/60);
	}
	function bouger()
	{
    var distanceX = destination['x'] - forme['x'];
    var distanceY = destination['y'] - forme['y'];
    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    //console.log(distanceX);
    forme['x'] = forme['x'] + 2 * distanceX/distance;
    forme['y'] = forme['y'] + 2 * distanceY/distance;
    if(destination['x'] == forme['x'] && destination['y'] == forme['y'])
      scene.removeChild(forme);
	}
	initialiser();
}
