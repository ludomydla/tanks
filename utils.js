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
  TERRAIN_GEN_ITERATIONS: 6,
  TERRAIN_SCATTER_COEF: 0.6,
  TERRAIN_POINTS_DISTANCE: function() {
    return this.WIDTH / Math.pow(2, this.TERRAIN_GEN_ITERATIONS);
  },
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
  isTankCollision: function(coordsA, coordsB) {
    return this.pointDistance(coordsA, coordsB) <= this.DAMAGE_RADIUS;
  },
  isTerrainCollision: function(shotCoords, points) {
    let closestTerrainPoints = points.filter(coords => {
      let distanceX = Math.abs(coords[0] - shotCoords[0]);
      return distanceX < this.TERRAIN_POINTS_DISTANCE();
    });
    //console.log(closestTerrainPoints);
    if (closestTerrainPoints.length === 2) {
      let terrainLevelY =
        closestTerrainPoints[0][1] +
        ((closestTerrainPoints[1][1] - closestTerrainPoints[0][1]) /
          this.TERRAIN_POINTS_DISTANCE()) *
          (shotCoords[0] - closestTerrainPoints[0][0]);
      if (shotCoords[1] - terrainLevelY > 0) return true;
      else return false;
    }

    // return points.some(coords => {
    //   if (this.isCollision(shotCoords, coords)) {
    //     console.log(shotCoords);
    //     console.log(coords);
    //     return true;
    //   }
    // });
    //return false;
  },
  midPointHeight: function(heightA, heightB, scatterLevel) {
    let center = (heightA + heightB) / 2;
    let scatter =
      this.HEIGHT * Math.pow(this.TERRAIN_SCATTER_COEF, scatterLevel);
    return center + (Math.random() - 0.5) * scatter;
  }
};
