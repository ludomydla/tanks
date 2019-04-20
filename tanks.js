const Tanks = (function() {
  function Tanks(canvasQuery) {
    this.CNVS = document.querySelector(canvasQuery);
    this.C = this.CNVS.getContext("2d");
    this.objectsToAnimate = [];
    this.playerA = undefined;
    this.playerB = undefined;

    this.init = function() {
      this.CNVS.width = 320;
      this.CNVS.height = 200;
      this.playerA = new Tank(this.C, 50, 130, UTILS.SIDEA);
      this.playerB = new Tank(this.C, 270, 130, UTILS.SIDEB);
      this.objectsToAnimate.push(this.playerA);
      this.objectsToAnimate.push(this.playerB);
      this.actualPlayer = this.playerA;

      window.addEventListener("keydown", this.actualPlayer.aimAndFire);
    };

    this.animate = function() {
      requestAnimationFrame(this.animate);
      this.C.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.objectsToAnimate.forEach(o => o.update());
    }.bind(this);
  }

  return Tanks;
})();