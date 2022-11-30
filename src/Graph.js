class Graph {
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }

  updateGraph(width, height) {
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
