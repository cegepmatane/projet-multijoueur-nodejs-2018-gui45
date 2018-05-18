function AnimationToucher()
{
  function initialiser(){
    TweenMax.set("#stage", {xPercent:-50, yPercent:-50});
    TweenMax.set(".rain2", {y:-500});
    TweenMax.to(".rain1 , .rain2", 7, {y:"+=500", repeat:-1, ease:Linear.easeNone});
  }
  initialiser();
}
