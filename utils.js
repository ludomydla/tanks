const UTILS = {
  SIDEA: 1,
  SIDEB: -1,
  STAGE_FLY: 1,
  STAGE_BOOM: 2,
  STAGE_TRACE: 3,
  POWER_COEF: 0.2,
  GRAVITY_COEF: 0.2,
  AIR_RESISTANT_COEF: 0.05,
  getRadiansFromDeg: function(deg) {
    return (deg / 180) * Math.PI;
  },
  getAnglePowerDiff: function(length, angle, side) {
    let radFromDegs = this.getRadiansFromDeg(angle);
    let xdiff = side * length * Math.cos(radFromDegs);
    let ydiff = -length * Math.sin(radFromDegs);
    return [xdiff, ydiff];
  }
};
