const Terrain = function(C) {
  this.points = [[0, UTILS.HEIGHT / 2], [UTILS.WIDTH, UTILS.HEIGHT / 2]];

  for (let i = 0; i < UTILS.TERRAIN_GEN_ITERATIONS; i++) {
    let newMidpoints = [];
    for (let j = 0; j < this.points.length - 1; j++) {
      let point = [
        (this.points[j][0] + this.points[j + 1][0]) / 2,
        UTILS.midPointHeight(this.points[j][1], this.points[j + 1][1], i)
      ];
      newMidpoints.push(point);
    }
    this.points.push(...newMidpoints);
    this.points.sort(function(a, b) {
      return a[0] - b[0];
    });
  }
  let lowestPoint = this.points.reduce(
    (acc, curVal) => Math.max(acc, curVal[1]),
    0
  );
  console.log("LP", lowestPoint);
  let offset = UTILS.HEIGHT - 20 - lowestPoint;
  console.log("OFFST", offset);
  this.points = this.points.map(point => [point[0], point[1] + offset]);

  this.draw = function() {
    C.beginPath();
    C.moveTo(this.points[0][0], this.points[0][1]);
    this.points.forEach(([x, y]) => {
      C.lineTo(x, y);
    });
    C.strokeStyle = "#888";
    C.stroke();
  };

  this.update = function() {
    this.draw();
  };
};
