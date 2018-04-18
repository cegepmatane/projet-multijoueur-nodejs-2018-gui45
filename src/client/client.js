
function Client()
{
  var socket;
  var nom;
  function initialiser()
  {
    socket = new WebSocket('ws://localhost:8888','echo-protocol');
    socket.addEventListener('message', evenementMessage);
  }
  this.commencer = function()
  {
    data = {};
    data['action'] = "COMMENCER";
    envoie = JSON.stringify(data);
    socket.send(envoie);
    return false;
  }
  this.changerStatus = function(status)
  {
    data = {};
    data['action'] = status;
    envoie = JSON.stringify(data);
    socket.send(envoie);
  }
  function evenementMessage(message)
  {
    //console.log(message);
    data = JSON.parse(message.data);
    console.log(data['action']);
    console.log(data['nombreJoueurs']);
    switch (data['action']) {
      case "COMMENCER":
        nom = message['idJoueur'];
        evenement = new CustomEvent("DONNEE_INITIAL", {'detail':data});
        document.body.dispatchEvent(evenement);
      break;
      case "PARTI":
        evenement = new CustomEvent("PARTI", {'detail':data});
        document.body.dispatchEvent(evenement);
      break;
    }
  }
  initialiser();
}
