import { distance } from './Edges.js';

class Graph {
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }

  updateGraph(width, height) {
    for (let i = 0; i < this.nodes.length; ++i) {
      for (let j = i + 1; j < this.nodes.length; ++j) {
        let p1 = this.nodes[i];
        let p2 = this.nodes[j];
        let dis = distance(p1, p2);
        let dx = (p1.x - p2.x) / (dis * dis);
        let dy = (p1.y - p2.y) / (dis * dis);
        this.nodes[i].x += dx;
        this.nodes[i].y += dy;
        this.nodes[j].x -= dx;
        this.nodes[j].y -= dy;
      }
    }

    for (let i = 0; i < this.nodes.length; ++i) {
      this.nodes[i].updateNode();
      this.nodes[i].constraintNodes(width, height);
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
}

export { Graph };
