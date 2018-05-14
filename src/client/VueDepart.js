function VueDepart()
{
	var corp;
	var canvas;
	var vaisseau;
	var scene;
	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function()
	{
		corp.innerHTML = VueDepart.pageDepartHTML;
		canvas = document.getElementById("apercu")
		scene = new createjs.Stage(canvas);
		chargeur = new createjs.LoadQueue(false);
		chargeur.on('complete', terminer);
		chargeur.loadManifest({
			id:'svg',
			src:'images/vaisseau.svg',
			type: createjs.AbstractLoader.IMAGE
		})
	}
	function terminer(evenement)
	{
		forme = new createjs.Bitmap(chargeur.getResult('svg'));
		scene.addChild(forme);
		//console.log("ajouter");
	}

		initialiser();
}
VueDepart.pageDepartHTML = document.getElementById("accueil").innerHTML;
VueDepart.vaisseau = "images/vaisseau.svg";
