function VueVictoire()
{
	var corp;

	function initialiser()
	{
		corp = document.getElementsByTagName("body")[0];
	}
	this.afficher = function()
	{
		corp.innerHTML = VueVictoire.pageVictoireHTML;
	}
	initialiser();
}
VueVictoire.pageVictoireHTML = document.getElementById("victoire").innerHTML;
