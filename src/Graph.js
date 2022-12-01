import { distance } from './Edges.js';

class Graph {
  constructor(nodes, edges, force = 1) {
    this.nodes = nodes;
    this.edges = edges;
    this.holdNodeIndex = -1;
    this.force = force;
  }

  updateGraph(width, height) {
    for (let i = 0; i < this.nodes.length; ++i) {
      for (let j = i + 1; j < this.nodes.length; ++j) {
        let p1 = this.nodes[i];
        let p2 = this.nodes[j];
        let dis = distance(p1, p2) == 0 ? 0.1 : distance(p1, p2);

        let dx = (this.force * (p1.x - p2.x)) / (dis * dis);
        let dy = (this.force * (p1.y - p2.y)) / (dis * dis);
        if (!this.nodes[i].pinned) {
          this.nodes[i].x += dx;
          this.nodes[i].y += dy;
        }
        if (!this.nodes[j].pinned) {
          this.nodes[j].x -= dx;
          this.nodes[j].y -= dy;
        }
      }
    }

    for (let i = 0; i < this.nodes.length; ++i) {
      if (this.holdNodeIndex >= 0 && this.holdNodeIndex == i) continue;
      this.nodes[i].updateNode();
      this.nodes[i].constraintNodes(width, height);
      this.nodes[i].contriantSpeed();
    }

    for (let i = 0; i < this.edges.length; ++i) {
      this.edges[i].updateEdges();
    }
  }

  renderGraph(context) {
    for (let i = 0; i < this.nodes.length; ++i) {
      this.nodes[i].renderNode(context);
    }
    for (let i = 0; i < this.edges.length; ++i) {
      this.edges[i].renderEdges(context);
    }
  }
  removeHold() {
    for (let j = 0; j < this.edges.length; ++j) {
      if (this.edges[j].p1 == this.nodes[this.holdNodeIndex]) {
        this.edges[j].color = 'black';

        this.edges[j].p2.stroke = 'black';
      }
    }
    this.holdNodeIndex = -1;
  }

  mouseMove(x, y) {
    if (this.holdNodeIndex >= 0) {
      this.nodes[this.holdNodeIndex].x = this.nodes[this.holdNodeIndex].oldx =
        x;
      this.nodes[this.holdNodeIndex].y = this.nodes[this.holdNodeIndex].oldy =
        y;
    }
  }

  mouseHold(x, y) {
    if (this.holdNodeIndex >= 0) return;
    for (let j = 0; j < this.nodes.length; ++j) {
      if (this.nodes[j].isCoOrdinateInside(x, y)) {
        this.holdNodeIndex = j;
        break;
      }
    }
    for (let j = 0; j < this.edges.length; ++j) {
      if (this.edges[j].p1 == this.nodes[this.holdNodeIndex]) {
        this.edges[j].color = 'red';
        this.edges[j].p2.stroke = 'red';
      }
    }
  }
}

export { Graph };
