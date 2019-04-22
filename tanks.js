const TanksGame = (function() {
  function Tanks(canvasQuery) {
    this.CNVS = document.querySelector(canvasQuery);
    this.C = this.CNVS.getContext("2d");
    this.objectsToAnimate = [];
    this.playerA = undefined;
    this.playerB = undefined;

    this.init = function() {
      this.CNVS.width = UTILS.WIDTH;
      this.CNVS.height = UTILS.HEIGHT;
      this.playerA = new Tank(this.C, 50, 130, UTILS.SIDEA);
      this.playerB = new Tank(this.C, 270, 130, UTILS.SIDEB);
      this.objectsToAnimate.push(this.playerA);
      this.objectsToAnimate.push(this.playerB);
      this.actualPlayer = this.playerA;

      window.addEventListener("keydown", event => {
        this.actualPlayer.aimAndFire(event, (angle, power) => {
          console.log("Firing", angle, power);
          this.objectsToAnimate.push(
            new Shot(this.C, angle, power, this.actualPlayer)
          );
          this.actualPlayer =
            this.actualPlayer == this.playerA ? this.playerB : this.playerA;
        });
      });
    };

    this.animate = function() {
      requestAnimationFrame(this.animate);
      this.C.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.objectsToAnimate.forEach(o => o.update());
    }.bind(this);
  }

  return Tanks;
})();
