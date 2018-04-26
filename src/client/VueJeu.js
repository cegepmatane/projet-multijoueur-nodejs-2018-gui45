function VueJeu()
{
	var corp;
	var joueurRestant;
	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function()
	{
		corp.innerHTML = VueJeu.pageJeuHTML;
		joueurRestant = document.getElementById("joueurRestant");
	}
	this.changerJoueurRestant = function(nombre)
	{
		joueurRestant.innerHTML = nombre;
	}
	initialiser();
}
VueJeu.pageJeuHTML = document.getElementById("jeu").innerHTML;
