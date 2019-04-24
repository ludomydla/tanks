const UTILS = {
  SIDEA: 1,
  SIDEB: -1,
  STAGE_1_FLY: 1,
  STAGE_2_BOOM: 2,
  STAGE_3_TRACE: 3,
  POWER_COEF: 0.2,
  GRAVITY_COEF: 0.2,
  AIR_RESISTANT_COEF: 0.98,
  WIDTH: 320,
  HEIGHT: 200,
  VALID_AREA_OFFSET: 20,
  POINTS_LIMIT_COUNT: 210,
  DAMAGE_RADIUS: 10,
  getRadiansFromDeg: function(deg) {
    return (deg / 180) * Math.PI;
  },
  getAnglePowerDiff: function(length, angle, side) {
    let radFromDegs = this.getRadiansFromDeg(angle);
    let xdiff = side * length * Math.cos(radFromDegs);
    let ydiff = -length * Math.sin(radFromDegs);
    return [xdiff, ydiff];
  },
  pointDistance: function(coordsA, coordsB) {
    return Math.sqrt(
      Math.pow(coordsA[0] - coordsB[0], 2) +
        Math.pow(coordsA[1] - coordsB[1], 2)
    );
  },
  isCollision: function(coordsA, coordsB) {
    return this.pointDistance(coordsA, coordsB) <= this.DAMAGE_RADIUS;
  }
};
