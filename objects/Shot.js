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

  this.drawFlightPath = function() {
    // Trace points you got
    C.beginPath();
    C.moveTo(tank.shotOrigin[0], tank.shotOrigin[1]);
    this.points.forEach(([x, y]) => {
      C.lineTo(x, y);
    });
    C.strokeStyle = "#888";
    C.stroke();
  };

  this.draw = function() {
    if (this.state == UTILS.STAGE_1_FLY) {
      this.drawFlightPath();

      // Add new points
      // UNTIL- these options happen
      // fly off screen -> stage 3
      // points count limit reached -> stage3
      // collision occurs -> stage 2 boom
      if (
        this.points.length < UTILS.POINTS_LIMIT_COUNT &&
        this.points[this.points.length - 1][0] > -UTILS.VALID_AREA_OFFSET &&
        this.points[this.points.length - 1][0] <
          UTILS.WIDTH + UTILS.VALID_AREA_OFFSET
      ) {
        let [lx, ly] = this.points[this.points.length - 1];
        this.ydiff += UTILS.GRAVITY_COEF;
        this.xdiff *= UTILS.AIR_RESISTANT_COEF;
        this.points.push([lx + this.xdiff, ly + this.ydiff]);
        // TODO - make collision detection and move to stage 2 boom
      } else {
        this.state = UTILS.STAGE_3_TRACE;
      }
    }
    if ((this.state = UTILS.STAGE_2_BOOM)) {
      this.drawFlightPath();
      // TODO - animate explosion
    }
    if ((this.state = UTILS.STAGE_3_TRACE)) {
      this.drawFlightPath();
    }
  };

  this.update = function() {
    this.draw();
  };
};
