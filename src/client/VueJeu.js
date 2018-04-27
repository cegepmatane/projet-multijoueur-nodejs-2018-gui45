function VueJeu()
{
	var corp;
	var joueurRestant;
	var champNom;
	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function()
	{
		corp.innerHTML = VueJeu.pageJeuHTML;
		joueurRestant = document.getElementById("joueurRestant");
		document.getElementById("nom").innerHTML = champNom;
	}
	this.changerJoueurRestant = function(nombre)
	{
		joueurRestant.innerHTML = nombre;
	}
	this.recupererNom = function()
	{
		champNom = document.getElementById("champNom").value;
		console.log(champNom);
	}
	initialiser();
}
VueJeu.pageJeuHTML = document.getElementById("jeu").innerHTML;
