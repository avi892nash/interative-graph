import { Nodes } from './src/Nodes.js';
import { Edges } from './src/Edges.js';

window.onload = () => {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let nodes = [
    new Nodes(100, 100, 95, 95, 'Avinash', 15, 0.99),
    new Nodes(200, 100, 195, 105, 'Verma', 15, 0.99),

    new Nodes(200, 400, 195, 435, 'Verma', 15, 0.99),
  ];
  let edges = [
    new Edges(nodes[0], nodes[1], 100, 1),
    new Edges(nodes[2], nodes[1], 100, 1),
  ];
  update();

  function update() {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < nodes.length; ++i) {
      nodes[i].updateNode();
      nodes[i].constraintNodes(width, height);
      nodes[i].renderNode(context);
    }

    for (let i = 0; i < edges.length; ++i) {
      edges[i].updateEdges();
      edges[i].renderEdges(context);
    }

    requestAnimationFrame(update);
  }
};
