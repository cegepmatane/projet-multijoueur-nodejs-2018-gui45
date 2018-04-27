function VueMort()
{
	var corp;

	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function()
	{
		corp.innerHTML = VueMort.pageMortHTML;
	}
	initialiser();
}
VueMort.pageMortHTML = document.getElementById("mort").innerHTML;
