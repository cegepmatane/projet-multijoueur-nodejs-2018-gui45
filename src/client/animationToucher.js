function AnimationToucher()
{
  function initialiser(){
    chargeur = new createjs.LoadQueue(false);
    chargeur.on('complete', terminer);
    chargeur.loadManifest({
      id:'svg',
      src:'images/particule.svg',
      type: createjs.AbstractLoader.IMAGE
    })
  }
  function terminer(evenement)
  {
    forme = new createjs.Bitmap(chargeur.getResult('svg'));
    scene.addChild(forme);
  }
  initialiser();
}
