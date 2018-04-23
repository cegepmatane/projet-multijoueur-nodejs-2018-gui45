
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
  var partieCommencer = false;
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
  this.tirer = function(position)
  {
    if(partieCommencer){
      data = {};
      data['action'] = "TIRER";
      data['destination'] = position;
      //console.log(data);
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
        nom = data['idJoueur'];
        console.log(nom);
        evenement = new CustomEvent("DONNEE_INITIAL", {'detail':data});
        document.body.dispatchEvent(evenement);
        partieCommencer = true;
        break;
      case "PARTI":
        evenement = new CustomEvent("PARTI", {'detail':data});
        document.body.dispatchEvent(evenement);
        break;
      case "DEPLACEMENT":
        evenement = new CustomEvent("DEPLACEMENT", {'detail':data});
        document.body.dispatchEvent(evenement);
        break;
      case "NOUVEAU_JOUEUR":
        if(nom != data['idJoueur']){
          evenement = new CustomEvent("NOUVEAU_JOUEUR", {'detail':data});
          document.body.dispatchEvent(evenement);
        }
        break;
      case "TOUCHER":
        evenement = new CustomEvent("TOUCHER", {'detail':data});
        document.body.dispatchEvent(evenement);
        break;
      case "TIRE":
        //if(nom != data['idJoueur']){
          evenement = new CustomEvent("TIRE", {'detail':data});
          document.body.dispatchEvent(evenement);
        //}
        break;
    }
  }
  initialiser();
}
