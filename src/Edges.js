function distance(p1, p2) {
  let dx = p1.x - p2.x;
  let dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

class Edges {
  constructor(
    p1,
    p2,
    distance,
    elasticity = 0.5,
    color = 'black',
    name = 'no_name'
  ) {
    this.p1 = p1;
    this.p2 = p2;
    this.distance = distance;
    this.elasticity = elasticity;
    this.color = color;
    this.name = name;
  }

  updateEdges() {
    if (this.distance == 'dynamic') return;
    let currDistance =
      distance(this.p1, this.p2) < 0.001 ? 0.001 : distance(this.p1, this.p2);
    let dl = currDistance - this.distance;
    let dx = this.p1.x - this.p2.x;
    let dy = this.p1.y - this.p2.y;
    let offsetX = (this.elasticity * dl * dx) / (2 * currDistance);
    let offsetY = (this.elasticity * dl * dy) / (2 * currDistance);
    if (!this.p1.pinned) {
      this.p1.x -= offsetX;
      this.p1.y -= offsetY;
    }
    if (!this.p2.pinned) {
      this.p2.x += offsetX;
      this.p2.y += offsetY;
    }
  }

  renderEdges(ctx) {
    ctx.beginPath();
    let dis = distance(this.p1, this.p2);

    let dx = (this.p1.x - this.p2.x) / dis;
    let dy = (this.p1.y - this.p2.y) / dis;
    canvas_arrow(
      ctx,
      this.p1.x - dx * this.p1.radius,
      this.p1.y - dy * this.p1.radius,
      this.p2.x + dx * this.p2.radius,
      this.p2.y + dy * this.p2.radius
    );
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 7; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 6),
    toy - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 6),
    toy - headlen * Math.sin(angle + Math.PI / 6)
  );
}

export { Edges, distance };
