import { Edges } from '../Edges';
import { Graph } from '../Graph';
import { Nodes } from '../Nodes';

function generateGraph(flowConfig, force) {
  let graph = {};
  for (let index in flowConfig.flows) {
    let flow = flowConfig.flows[index];
    if (graph[flow.name] === undefined)
      graph[flow.name] = { value: flow.flowFeatureConfig, children: [] };
    else continue;

    for (let index in flow.nextFlows) {
      let nextFlow = flow.nextFlows[index];
      graph[flow.name].children.push({
        name: nextFlow[0],
        value: nextFlow[1],
      });
    }
  }

  console.log(graph);

  let edges = [];
  let nodes = [];
  let x = 0;
  let y = 0;
  for (let nodeName in graph) {
    let node = new Nodes(
      x,
      y,
      x,
      y,
      nodeName,
      18,
      0.99,
      nodeName == flowConfig.defaultStart ? 'white' : 'grey',
      nodeName == flowConfig.defaultStart
    );
    nodes.push(node);
    graph[nodeName]['node'] = node;
    x += 25;
    y += 25 + Math.random();
  }

  console.log(nodes);
  for (let nodeName in graph) {
    for (let index in graph[nodeName].children) {
      let nextNode = graph[nodeName].children[index];
      edges.push(
        new Edges(
          graph[nodeName].node,
          graph[nextNode.name].node,
          250,
          0.01,
          'black',
          graph[nextNode.name].values
        )
      );
    }
  }
  console.log(edges);
  return new Graph(nodes, edges, force);
}

function generateGraphFromJson(obj, root) {
  let edges = [];
  let nodes = {};
  let x = 0;
  let y = 0;
  for (let nodeName in obj) {
    let node = new Nodes(
      x,
      y,
      x,
      y,
      nodeName,
      18,
      0.99,
      nodeName == root ? 'white' : 'grey',
      nodeName == root
    );
    nodes[nodeName] = node;
    x += 25;
    y += 25 + Math.random();
  }

  console.log(nodes);
  for (let nodeName in obj) {
    for (let childIndex in obj[nodeName]) {
      edges.push(
        new Edges(
          nodes[nodeName],
          nodes[obj[nodeName][childIndex]],
          150,
          0.01,
          'black',
          obj[nodeName][childIndex]
        )
      );
    }
  }
  return new Graph(Object.values(nodes), edges, 20);
}

export { generateGraph, generateGraphFromJson };
