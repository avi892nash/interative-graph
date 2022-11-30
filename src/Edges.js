function distance(p1, p2) {
  let dx = p1.x - p2.x;
  let dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

class Edges {
  constructor(p1, p2, distance, elasticity = 0.5, color = 'black') {
    this.p1 = p1;
    this.p2 = p2;
    this.distance = distance;
    this.elasticity = elasticity;
    this.color = color;
  }

  updateEdges() {
    let currDistance = distance(this.p1, this.p2);
    let dl = currDistance - this.distance;
    let dx = this.p1.x - this.p2.x;
    let dy = this.p1.y - this.p2.y;
    let offsetX = (this.elasticity * dl * dx) / (2 * currDistance);
    let offsetY = (this.elasticity * dl * dy) / (2 * currDistance);
    this.p1.x -= offsetX;
    this.p1.y -= offsetY;
    this.p2.x += offsetX;
    this.p2.y += offsetY;
  }

  renderEdges(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

export { Edges };
