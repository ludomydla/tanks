const Shot = function(C, ang, pow, meTank, youTank) {
  this.angle = ang;
  this.power = pow;
  this.state = UTILS.STAGE_1_FLY;
  this.side = meTank.side;
  this.points = [];
  [this.xdiff, this.ydiff] = UTILS.getAnglePowerDiff(
    pow * UTILS.POWER_COEF,
    ang,
    this.side
  );
  this.points.push(meTank.shotOrigin);
  let boomAnimCount = 0;

  this.drawFlightPath = function() {
    // Trace points you have
    C.beginPath();
    C.moveTo(meTank.shotOrigin[0], meTank.shotOrigin[1]);
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
        if (
          UTILS.isCollision(
            [lx + this.xdiff, ly + this.ydiff],
            [youTank.x + 10, youTank.y + 1] // accounted for tank drawing in left corner
          )
        ) {
          this.state = UTILS.STAGE_2_BOOM;
        }
      } else {
        this.state = UTILS.STAGE_3_TRACE;
      }
    }

    if (this.state == UTILS.STAGE_2_BOOM) {
      this.drawFlightPath();
      if (boomAnimCount <= UTILS.DAMAGE_RADIUS) {
        let boomCenter = this.points[this.points.length - 1];
        C.beginPath();
        C.arc(boomCenter[0], boomCenter[1], boomAnimCount, 0, 2 * Math.PI);
        C.fillStyle = "#f00";
        C.fill();
        boomAnimCount++;
      } else {
        this.state = UTILS.STAGE_3_TRACE;
      }
    }

    if (this.state == UTILS.STAGE_3_TRACE) {
      this.drawFlightPath();
    }
  };

  this.update = function() {
    this.draw();
  };
};
