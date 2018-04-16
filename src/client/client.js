var socket;
var htmlAcceuil;
var htmlJeu;

function initialiser()
{
  socket = new WebSocket('ws://localhost:8888','echo-protocol');
  htmlAcceuil = document.getElementById("accueil").innerHTML;
  htmlJeu = document.getElementById("jeu").innerHTML;

  document.body.innerHTML = htmlAcceuil;
}
function commencer()
{
 return false;
}
initialiser();
window.configuration = {

}
