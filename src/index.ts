import Graph from './graphs/graph';
import JSONGraph from './graph.json';
import JSONOrientGraph from './orientGraph.json';
import Traversals from './traversals';
import { tree } from './kruskal';
import { maxStream } from './stream';
import {
  distances,
  previousVertices,
  bellmanFord,
  floydWarshall,
} from './weight';

console.log(
  '//////////////////////Неориентированный граф/////////////////////////////',
);
const graph = new Graph();
const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const edges = [
  ['A', 'B'],
  ['A', 'C'],
  ['C', 'D'],
  ['C', 'E'],
  ['A', 'F'],
  ['F', 'G'],
];
vertices.forEach((v) => graph.addVertex(v));
edges.forEach((e) => graph.addEdge(e[0], e[1]));

graph.print();

graph.deleteVertex('A');

graph.print();

graph.deleteEdge('C', 'D');

graph.print();

console.log(
  '//////////////////////Ориентированный граф/////////////////////////////',
);
const orientGraph = new Graph(true);

vertices.forEach((v) => orientGraph.addVertex(v));
edges.forEach((e) => orientGraph.addEdge(e[0], e[1]));

orientGraph.print();

orientGraph.deleteVertex('A');

orientGraph.print();

orientGraph.deleteEdge('C', 'D');

orientGraph.print();

console.log(
  '//////////////////////Неориентированный с файла/////////////////////////////',
);

const graphFromFile = new Graph(JSONGraph.isOrient, JSONGraph.vertices);
graphFromFile.print();

graphFromFile.addEdge('A', 'H');

graphFromFile.print();

console.log(
  '//////////////////////Ориентированный с файла/////////////////////////////',
);

const graphOrientFromFile = new Graph(
  JSONOrientGraph.isOrient,
  JSONOrientGraph.vertices,
);
graphOrientFromFile.print();

graphOrientFromFile.addEdge('A', 'H');

graphOrientFromFile.print();

graphOrientFromFile.write('test.json');

console.log(
  '//////////////////////Пересечение графов/////////////////////////////',
);
const newGr = new Graph();
newGr.addVertex('A');
newGr.addVertex('B');
newGr.addVertex('C');
newGr.addEdge('A', 'C');
newGr.addEdge('A', 'B');
newGr.print();
const newGr2 = new Graph();
newGr2.addVertex('A');
newGr2.addVertex('B');
newGr2.addVertex('C');
newGr2.addEdge('A', 'C');
newGr2.print();
const newGr3 = newGr.intersection(newGr2);
newGr3.print();

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
});

console.log('//////////////////////Обходы графов/////////////////////////////');
console.log(Traversals.resultDeepSearch);
console.log(Traversals.resultWidthSearch);

console.log('//////////////////////Краскал/////////////////////////////');
tree.print();

console.log('//////////////////////Дейкстра/////////////////////////////');
console.log(distances);
console.log(previousVertices);

console.log('//////////////////////Беллман-флойд/////////////////////////////');
console.log(bellmanFord.distances);
console.log(bellmanFord.previousVertices);
console.log(bellmanFord.perefery);

console.log('//////////////////////Флойд/////////////////////////////');
console.log(floydWarshall.distances);
console.log(floydWarshall.dist);
console.log(floydWarshall.isExist);

console.log('//////////////////////Поток/////////////////////////////');
console.log(maxStream);

console.log(
  'Создать граф: create, создать ориентированный граф createOrient, добавить вершину: vertex, добавить ребро: edge, ' +
    'вывести на экран: print, write: вывести в файл, degree - вывести степень полуисходов, loops - вывести количество петель',
);

let isVertex = false;
let isEdge = false;
let isWrite = false;
let isDegree = false;
let CLIGraph: Graph;
rl.prompt();
rl.on('line', (line: string) => {
  if (line === 'create') {
    isVertex = false;
    isEdge = false;
    isDegree = false;
    CLIGraph = new Graph();
  } else if (line === 'createOrient') {
    isVertex = false;
    isEdge = false;
    isDegree = false;
    CLIGraph = new Graph(true);
  } else if (line === 'vertex') {
    isVertex = true;
    isEdge = false;
    isWrite = false;
    isDegree = false;
  } else if (line === 'edge') {
    isVertex = false;
    isWrite = false;
    isEdge = true;
    isDegree = false;
  } else if (line === 'print') {
    CLIGraph.print();
  } else if (line === 'write') {
    isVertex = false;
    isEdge = false;
    isWrite = true;
    isDegree = false;
  } else if (line === 'degree') {
    isVertex = false;
    isEdge = false;
    isWrite = false;
    isDegree = true;
  } else if (line === 'loops') {
    CLIGraph.printLoopsVertices();
  } else if (isVertex) {
    CLIGraph.addVertex(line);
  } else if (isEdge) {
    const arr = line.split(' ');
    CLIGraph.addEdge(arr[0], arr[1]);
  } else if (isWrite) {
    CLIGraph.write(line);
    isWrite = false;
  } else if (isDegree) {
    const deg = CLIGraph.degreeOfOutcome(line);
    console.log(deg);
    isDegree = false;
  }
}).on('close', () => {
  console.log('exit');
  process.exit(0);
});
