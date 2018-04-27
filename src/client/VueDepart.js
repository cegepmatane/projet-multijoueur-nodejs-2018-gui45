function VueDepart()
{
	var corp;
	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function()
	{
		corp.innerHTML = VueDepart.pageDepartHTML;

	}
	initialiser();
}
VueDepart.pageDepartHTML = document.getElementById("accueil").innerHTML;
