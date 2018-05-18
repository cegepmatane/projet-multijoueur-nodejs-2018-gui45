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
		animationToucher = new AnimationToucher();
	}
	initialiser();
}
VueMort.pageMortHTML = document.getElementById("mort").innerHTML;
