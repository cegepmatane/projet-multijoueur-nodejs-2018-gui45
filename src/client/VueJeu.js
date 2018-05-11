function VueJeu()
{
	var corp;
	var joueurRestant;
	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function(nomJoueur)
	{
		corp.innerHTML = VueJeu.pageJeuHTML;
		joueurRestant = document.getElementById("joueurRestant");
		document.getElementById("nom").innerHTML = nomJoueur;
	}
	this.changerJoueurRestant = function(nombre)
	{
		joueurRestant.innerHTML = nombre;
	}
	initialiser();
}
VueJeu.pageJeuHTML = document.getElementById("jeu").innerHTML;
