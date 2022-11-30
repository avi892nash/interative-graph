import { Nodes } from './src/Nodes.js';
import { Edges } from './src/Edges.js';
import { Graph } from './src/Graph.js';

window.onload = () => {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let nodes = [
    new Nodes(100, 100, 95, 95, 'Avinash', 15, 0.99),
    new Nodes(200, 100, 195, 105, 'Verma', 15, 0.99),
    new Nodes(200, 400, 195, 405, 'Verma', 15, 0.99),
  ];
  let edges = [
    new Edges(nodes[0], nodes[1], 100, 1),
    new Edges(nodes[2], nodes[1], 100, 1),
  ];
  let graph = new Graph(nodes, edges);

  update();
  canvas.addEventListener('mousedown', (event) => {
    graph.mouseHold(event.clientX, event.clientY);
  });

  canvas.addEventListener('mousemove', (event) => {
    graph.mouseMove(event.clientX, event.clientY);
  });

  canvas.addEventListener('mouseup', (event) => {
    graph.removeHold();
  });

  function update() {
    context.clearRect(0, 0, width, height);
    graph.updateGraph(width, height);
    graph.renderGraph(context);
    requestAnimationFrame(update);
  }
};
