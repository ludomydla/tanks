const TanksGame = (function() {
  function Tanks(canvasQuery) {
    this.CNVS = document.querySelector(canvasQuery);
    this.C = this.CNVS.getContext("2d");
    this.objectsToAnimate = [];
    this.playerA = undefined;
    this.playerB = undefined;
    this.terrain = undefined;

    this.init = function() {
      this.CNVS.width = UTILS.WIDTH;
      this.CNVS.height = UTILS.HEIGHT;
      this.terrain = new Terrain(this.C);
      this.playerA = new Tank(
        this.C,
        50,
        this.terrain.points[12][1] - 5,
        UTILS.SIDEA
      );
      this.playerB = new Tank(
        this.C,
        270,
        this.terrain.points[57][1] - 5,
        UTILS.SIDEB
      );
      this.objectsToAnimate.push(this.terrain);
      this.objectsToAnimate.push(this.playerA);
      this.objectsToAnimate.push(this.playerB);
      this.actualPlayer = this.playerA;

      window.addEventListener("keydown", event => {
        this.actualPlayer.aimAndFire(event, (angle, power) => {
          this.objectsToAnimate.push(
            new Shot(
              this.C,
              angle,
              power,
              this.actualPlayer,
              this.actualPlayer == this.playerA ? this.playerB : this.playerA,
              this.terrain
            )
          );
          this.actualPlayer =
            this.actualPlayer == this.playerA ? this.playerB : this.playerA;
        });
      });
    };

    let skyGradient = this.C.createLinearGradient(0, 0, 0, UTILS.HEIGHT);
    skyGradient.addColorStop(0, "#544a7d");
    skyGradient.addColorStop(1, "#ffd452");

    this.animate = function() {
      requestAnimationFrame(this.animate);
      //this.C.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.C.fillStyle = skyGradient;
      this.C.fillRect(0, 0, window.innerWidth, window.innerHeight);
      this.objectsToAnimate.forEach(o => o.update());
    }.bind(this);
  }

  return Tanks;
})();

let game = new TanksGame("canvas");
game.init();
game.animate();
