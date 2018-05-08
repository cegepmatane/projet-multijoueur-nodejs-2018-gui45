function VueChargement()
{
	var corp;
	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function()
	{
		corp.innerHTML = VueChargement.pageDepartHTML;
	}
	initialiser();
}
VueChargement.pageDepartHTML = document.getElementById("chargement").innerHTML;
