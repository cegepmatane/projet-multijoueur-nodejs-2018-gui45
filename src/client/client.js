
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
  function evenementMessage(message)
  {
    //console.log(message);
    data = JSON.parse(message.data);
    console.log(data['action']);
    switch (data['action']) {
      case "COMMENCER":
        nom = message['idJoueur'];
        evenement = new CustomEvent("DONNEE_INITIAL", {'detail':message});
        document.body.dispatchEvent(evenement);
      break;
      case "PARTI":
        evenement = new CustomEvent("PARTI", {'detail':message});
        document.body.dispatchEvent(evenement);
      break;
    }
  }
  initialiser();
}
