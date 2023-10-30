import Graph from './graphs/graph';

const graph = new Graph();
const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'U'];
const edges = [
  ['A', 'B'],
  ['A', 'C'],
  ['C', 'D'],
  ['C', 'E'],
  ['A', 'F'],
  ['F', 'G'],
  ['B', 'C'],
  ['B', 'U'],
  ['U', 'E'],
  ['F', 'C'],
];
vertices.forEach((v) => graph.addVertex(v));
edges.forEach((e) => graph.addEdge(e[0], e[1]));

let resultDeepSearch = {};
let resultWidthSearch = {};

try {
  resultDeepSearch = graph.findShortestPath('A', 'E', 'B');
  resultWidthSearch = graph.bfs('A', null).distance;
} catch (e) {
  console.log(e);
}

export default { resultDeepSearch, resultWidthSearch };
