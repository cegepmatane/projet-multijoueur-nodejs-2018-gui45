function Balle (destination, depart){
	var forme;
	var animationJoueur;
	var intervalBouger;
	var svg;
	function initialiser()
	{
		svg = new Image();
		svg.src =  'images/balle.svg' ;
		svg.addEventListener('load', terminer);
	}
	function terminer(evenement)
	{
		document.body.appendChild(svg);
		forme = new createjs.Bitmap(svg);
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
