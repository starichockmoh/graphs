import Graph from './graphs/graph';

const graph = new Graph(true);
const vertices = ['1', '2', '3', '4', '5'];
const edges = [
  ['1', '2', 20],
  ['1', '4', 10],
  ['1', '3', 30],
  ['2', '3', 40],
  ['2', '5', 30],
  ['3', '4', 10],
  ['3', '5', 20],
  ['4', '5', 20],
];
vertices.forEach((v) => graph.addVertex(v));
edges.forEach((e) => graph.addEdge(e[0], e[1], e[2] as number));

export const maxStream = graph.maxStream(0, 4);
