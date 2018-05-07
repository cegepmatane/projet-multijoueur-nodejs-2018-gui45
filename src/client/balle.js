function Balle (destination, depart){
	var forme;
	var animationJoueur;
	var intervalBouger;
	function initialiser()
	{
		forme = new createjs.Shape();
		forme.graphics.beginFill("yellow").drawCircle(0, 0, 2);
		forme['x'] = depart['x'];
		forme['y'] = depart['y'];
		scene.addChild(forme);
		intervalBouger = setInterval(bouger,1000/60);
		//console.log(forme.x);
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
