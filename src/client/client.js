var socket;
var htmlAcceuil;
var htmlJeu;
var listeJoueur = {};
function initialiser()
{
  socket = new WebSocket('ws://localhost:8888','echo-protocol');
  socket.addEventListener('message', evenementMessage);
  htmlAcceuil = document.getElementById("accueil").innerHTML;
  htmlJeu = document.getElementById("jeu").innerHTML;

  document.body.innerHTML = htmlAcceuil;
}
function commencer()
{
  data = {};
  data['action'] = "COMMENCER";
  envoie = JSON.stringify(data);
  socket.send(envoie);
  return false;
}
function evenementMessage(message)
{
  //console.log(message);
  data = JSON.parse(message.data);
  console.log(data['action']);
  switch (data['action']) {
    case "COMMENCER":
      document.body.innerHTML = htmlJeu;
    break;
  }
}
initialiser();
window.configuration = {

}
