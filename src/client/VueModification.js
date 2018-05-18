function VueModification()
{
	var corp;
	var personalisateur;
	function initialiser()
	{
		corp = document.body;
	}
	this.afficher = function()
	{
		corp.innerHTML = VueModification.pageDepartHTML;
		setTimeout(activerModification, 1000);
	}
	function activerModification(){
		personalisateur = new Personalisateur();
	}
	initialiser();
}
VueModification.pageDepartHTML = document.getElementById("modification").innerHTML;
