function VueModification()
{
	var corp;
	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function()
	{
		corp.innerHTML = VueModification.pageDepartHTML;
	}
	initialiser();
}
VueModification.pageDepartHTML = document.getElementById("modification").innerHTML;
