function InfoExterne()
{
	var espace;
	function initialiser()
	{
    espace=document.getElementById("InfoExterne");
    requete = new XMLHttpRequest();
    requete.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        texte = JSON.parse(requete.responseText);
        afficher(texte);
      }
    };
    requete.open('GET', InfoExterne.url, true);
    requete.send();
	}
  function afficher(texte){
    html = "";
    html += "<h3>cible</h3>"
    espace.innerHTML = html;
    console.log(espace.innerHTML);
  }
	initialiser();
}
InfoExterne.url = "https://swapi.co/api/starships/9/?format=json";
