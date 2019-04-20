const Tank = function(C, x, y, side) {
  this.x = x;
  this.y = y;
  this.angle = 45;
  this.power = 50;
  this.side = side;

  this.draw = function() {
    // Tank body
    C.beginPath();
    C.moveTo(this.x, this.y);
    C.lineTo(this.x + 5, this.y);
    C.lineTo(this.x + 7, this.y - 3);
    C.lineTo(this.x + 13, this.y - 3);
    C.lineTo(this.x + 15, this.y);
    C.lineTo(this.x + 20, this.y);
    C.lineTo(this.x + 17, this.y + 5);
    C.lineTo(this.x + 3, this.y + 5);
    C.closePath();
    C.fillStyle = "#0f0";
    C.fill();

    // Tank barrel
    C.beginPath();
    C.moveTo(this.x + 10, this.y - 2);
    [xdif, ydif] = UTILS.getCanonRelativePosition(12, this.angle, this.side);
    C.lineTo(this.x + 10 + xdif, this.y - 2 + ydif);
    C.strokeStyle = "#0f0";
    C.stroke();

    // Tanks stats
    let fontSize = 10;
    let fontFamily = "Arial";
    let playerName = `Player ${this.side > 0 ? "A" : "B"}`;
    let xPos = this.side > 0 ? 10 : 250;
    C.font = `${fontSize}px ${fontFamily}`;
    C.fillText(playerName, xPos, fontSize);
    C.fillText("Angle " + this.angle, xPos, fontSize * 2);
    C.fillText("Power " + this.power, xPos, fontSize * 3);
  };

  this.aimAndFire = function(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 32:
        console.log("Space");
        break;
      case 37:
        if (this.angle < 180) this.angle++;
        break;
      case 38:
        if (this.power < 100) this.power++;
        break;
      case 39:
        if (this.angle > 0) this.angle--;
        break;
      case 40:
        if (this.power > 0) this.power--;
        break;
    }
  }.bind(this);

  this.update = function() {
    this.draw();
  };
};
