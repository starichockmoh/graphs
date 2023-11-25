import Graph from './graphs/graph';

const graph = new Graph(true);
const vertices = ['1', '2', '3', '4', '5'];
const edges = [
  ['1', '2', 30],
  ['1', '4', 20],
  ['1', '3', 40],
  ['2', '3', 50],
  ['2', '5', 40],
  ['3', '4', 20],
  ['3', '5', 30],
  ['4', '5', 30],
];
vertices.forEach((v) => graph.addVertex(v));
edges.forEach((e) => graph.addEdge(e[0], e[1], e[2] as number));

export const maxStream = graph.maxStream(0, 4);
