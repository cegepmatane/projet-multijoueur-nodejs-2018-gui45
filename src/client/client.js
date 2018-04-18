
function Client()
{
  var socket;
  var nom;
  var Etat = {
		enAtente : "EN ATTENTE",
		enDeplacementDroit : "ETAT EN DEPLACEMENT DROIT",
		enDeplacementGauche : "ETAT EN DEPLACEMENT GAUCHE",
		enDeplacementHAUT : "ETAT EN DEPLACEMENT HAUT",
		enDeplacementBAS : "ETAT EN DEPLACEMENT BAS"
	}
  var etatCourrant;
  function initialiser()
  {
    socket = new WebSocket('ws://localhost:8888','echo-protocol');
    socket.addEventListener('message', evenementMessage);
    etatCourrant = Etat.enAtente;
  }
  this.commencer = function()
  {
    data = {};
    data['action'] = "COMMENCER";
    envoie = JSON.stringify(data);
    socket.send(envoie);
    return false;
  }
  this.changerEtat = function(nouvelEtat)
  {
    if(etatCourrant != nouvelEtat){
      etatCourrant = nouvelEtat;
      data = {};
      data['action'] = "CHANGER_ETAT";
      data['valeur'] = nouvelEtat;
      envoie = JSON.stringify(data);
      socket.send(envoie);
    }
  }
  function evenementMessage(message)
  {
    //console.log(message);
    data = JSON.parse(message.data);
    console.log(data['action']);
    //console.log(data);
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
      case "DEPLACEMENT":
      evenement = new CustomEvent("DEPLACEMENT", {'detail':data});
      document.body.dispatchEvent(evenement);
        break;
    }
  }
  initialiser();
}
