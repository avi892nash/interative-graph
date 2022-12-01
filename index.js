import { generateGraph } from './src/FlowConfigApp/generateGraph.js';

function drawGraph(graph) {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

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
}

export { drawGraph, generateGraph };
