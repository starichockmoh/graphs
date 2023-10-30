import Graph from './graphs/graph';

const graph = new Graph();
const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
const edges = [
  ['A', 'B', 7],
  ['A', 'C', 8],
  ['B', 'D', 2],
  ['C', 'B', 11],
  ['C', 'E', 9],
  ['C', 'D', 6],
  ['D', 'E', 11],
  ['D', 'F', 9],
  ['E', 'F', 10],
];
vertices.forEach((v) => graph.addVertex(v));
edges.forEach((e) => graph.addEdge(e[0], e[1], e[2] as number));

export const tree = graph.kruskal();
