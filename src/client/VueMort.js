function VueMort()
{
	var corp;

	function initialiser()
	{
		corp = document.getElementsByTagName("body")[0];
	}
	this.afficher = function()
	{
		corp.innerHTML = VueMort.pageMortHTML;
	}
	initialiser();
}
VueMort.pageMortHTML = document.getElementById("mort").innerHTML;
