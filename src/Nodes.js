import { distance } from './Edges';

class Nodes {
  constructor(
    x,
    y,
    oldx,
    oldy,
    name = 'no_name',
    radius = 10,
    friction = 0.5,
    color = 'grey'
  ) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.oldx = oldx;
    this.oldy = oldy;
    this.friction = friction;
    this.radius = radius;
    this.color = color;
  }

  updateNode() {
    let dx = this.x - this.oldx;
    let dy = this.y - this.oldy;
    this.oldx = this.x;
    this.oldy = this.y;
    this.x += this.friction * dx;
    this.y += this.friction * dy;
  }

  constraintNodes(width, height) {
    let dx = this.x - this.oldx;
    let dy = this.y - this.oldy;
    if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.oldx = this.x + dx;
    }

    if (this.x < this.radius) {
      this.x = this.radius;
      this.oldx = this.x + dx;
    }

    if (this.y + this.radius > height) {
      this.y = height - this.radius;
      this.oldy = this.y + dy;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.oldy = this.y + dy;
    }
  }

  renderNode(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  isCoOrdinateInside(x, y) {
    let dis = distance(this, { x, y });
    return dis < this.radius;
  }
}

export { Nodes };
