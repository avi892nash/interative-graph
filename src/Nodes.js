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
    color = 'grey',
    pinned = false,
    stroke = 'black'
  ) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.oldx = oldx;
    this.oldy = oldy;
    this.friction = friction;
    this.radius = radius;
    this.color = color;
    this.pinned = pinned;
    this.stroke = stroke;
    this.strokeWidth = 1;
    this.showInfo = false;
    this.parmanentShowInfo = undefined;
  }

  updateNode() {
    if (this.pinned) return;
    let dx = this.x - this.oldx;
    let dy = this.y - this.oldy;
    this.oldx = this.x;
    this.oldy = this.y;
    this.x += this.friction * Math.min(dx, 20.0);
    this.y += this.friction * Math.min(dy, 20.0);
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

  contriantSpeed() {
    if (Math.abs(this.x - this.oldx) > 30) {
      this.oldx = 30 - this.x + this.oldx;
    }
    if (Math.abs(this.y - this.oldy) > 30) {
      this.oldy = 30 - this.y + this.oldy;
    }
  }

  renderNode(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.strokeWidth;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.stroke;
    ctx.stroke();
    ctx.lineWidth = 1;

    ctx.fillStyle = this.stroke;
    if (this.showInfo || this.parmanentShowInfo) {
      ctx.font = '16px Arial';
      ctx.fillText(
        this.name,
        this.x - this.radius / 2,
        this.y - 2 * this.radius
      );
    }
    ctx.fillStyle = 'black';
  }

  isCoOrdinateInside(x, y) {
    let dis = distance(this, { x, y });
    return dis < 2 * this.radius;
  }
}

export { Nodes };
