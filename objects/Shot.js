const Shot = function(C, ang, pow, tank) {
  this.angle = ang;
  this.power = pow;
  this.state = UTILS.STAGE_FLY;
  this.side = tank.side;
  this.points = [];
  [this.xdiff, this.ydiff] = UTILS.getAnglePowerDiff(
    pow * UTILS.POWER_COEF,
    ang,
    this.side
  );
  this.points.push(tank.shotOrigin);

  this.draw = function() {
    if (this.state == UTILS.STAGE_FLY) {
      // Trace points you got
      this.points.forEach(([x, y]) => {
        C.fillStyle = "#000";
        C.fillRect(x, y, 1, 1);
      });

      // Add new points
      if (this.points.length < 50) {
        // TODO change condition for collision or bigger number
        let [lx, ly] = this.points[this.points.length - 1];
        this.ydiff += UTILS.GRAVITY_COEF;
        this.xdiff -= this.side * UTILS.AIR_RESISTANT_COEF;
        this.points.push([lx + this.xdiff, ly + this.ydiff]);
      }
    }
  };

  this.update = function() {
    this.draw();
  };
};
