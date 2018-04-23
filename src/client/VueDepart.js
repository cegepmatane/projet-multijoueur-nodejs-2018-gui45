function VueDepart()
{
	var corp;

	function initialiser()
	{
		corp = document.getElementsByTagName("body")[0];
	}
	this.afficher = function()
	{
		corp.innerHTML = VueDepart.pageDepartHTML;
	}
	initialiser();
}
VueDepart.pageDepartHTML = document.getElementById("accueil").innerHTML;
