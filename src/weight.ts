import Graph from './graphs/graph';

const graph = new Graph();
const graphOrient = new Graph(true);
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
vertices.forEach((v) => graphOrient.addVertex(v));
edges.forEach((e) => graph.addEdge(e[0], e[1], e[2] as number));
edges.forEach((e) => graphOrient.addEdge(e[0], e[1], e[2] as number));

export const { previousVertices, distances } = graph.dijkstra('A');
export const bellmanFord = graph.bellmanFord('A', 8);
export const floydWarshall = graphOrient.floydWarshall('F', 'D', 10);
