function VueJeu()
{
	var corp;

	function initialiser()
	{
		corp = document.getElementsByTagName("body")[0];
	}
	this.afficher = function()
	{
		corp.innerHTML = VueJeu.pageJeuHTML;
	}
	initialiser();
}
VueJeu.pageJeuHTML = document.getElementById("jeu").innerHTML;
