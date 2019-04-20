const UTILS = {
  SIDEA: 1,
  SIDEB: -1,
  getRadiansFromDeg: function(deg) {
    return (deg / 180) * Math.PI;
  },
  getCanonRelativePosition: function(length, angle, side) {
    let radFromDegs = this.getRadiansFromDeg(angle);
    let xdiff = side * length * Math.cos(radFromDegs);
    let ydiff = -length * Math.sin(radFromDegs);
    return [xdiff, ydiff];
  }
};
