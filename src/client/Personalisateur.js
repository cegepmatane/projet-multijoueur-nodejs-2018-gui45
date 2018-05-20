function Personalisateur()
{
	var flame1;
	var flame2;
	var flame3;
	var corp1;
	var corp2;
	var corp3;
	var corp4;
	var bouttonSauvegarder;
	var bouttonCharger;
 	var svg;
	var formulaire;
	var courleurVaisseau;
	var courleurFlames;
	function initialiser()
	{
		bouttonSauvegarder=document.getElementById("sauvgarder");
		bouttonCharger=document.getElementById("charger");
	 	svg=document.getElementById("apercu");
		formulaire=document.getElementById("formModification");
		courleurVaisseau=document.getElementById("vaisseau");
		courleurFlames=document.getElementById("flames");

		chargerElementsSvg();
		
		courleurVaisseau.addEventListener('input', changerCouleurVaisseau);
		courleurFlames.addEventListener('input', changerCouleurFlames);
		bouttonSauvegarder.addEventListener('click', sauvgarder);
		bouttonCharger.addEventListener('click', charger);
	}
	function changerCouleurVaisseau(evenement){
		corp1.style.fill = courleurVaisseau.value;
		corp2.style.fill = courleurVaisseau.value;
		corp3.style.fill = courleurVaisseau.value;
		corp4.style.fill = courleurVaisseau.value;
	}
	function changerCouleurFlames(evenement){
		flame1.style.fill = courleurFlames.value;
		flame2.style.fill = courleurFlames.value;
		flame3.style.fill = courleurFlames.value;
	}
	function sauvgarder(){
		contenu = JSON.stringify(svg.innerHTML);
		//console.log(contenu);
		localStorage.setItem("image", contenu);
	}
	function charger(){
		contenu = localStorage.getItem("image");
		//console.log(contenu);
		if(contenu.length != 0)
			svg.innerHTML = JSON.parse(contenu);
		chargerElementsSvg();
	}
	function chargerElementsSvg(){
		flame1=document.getElementById("flame1");
		flame2=document.getElementById("flame2");
		flame3=document.getElementById("flame3");
		corp1=document.getElementById("corp1");
		corp2=document.getElementById("corp2");
		corp3=document.getElementById("corp3");
		corp4=document.getElementById("corp4");
	}
	initialiser();
}
