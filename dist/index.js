"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = __importDefault(require("./graphs/graph"));
var graph_json_1 = __importDefault(require("./graph.json"));
var orientGraph_json_1 = __importDefault(require("./orientGraph.json"));
var traversals_1 = __importDefault(require("./traversals"));
var kruskal_1 = require("./kruskal");
console.log('//////////////////////Неориентированный граф/////////////////////////////');
var graph = new graph_1.default();
var vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var edges = [
    ['A', 'B'],
    ['A', 'C'],
    ['C', 'D'],
    ['C', 'E'],
    ['A', 'F'],
    ['F', 'G'],
];
vertices.forEach(function (v) { return graph.addVertex(v); });
edges.forEach(function (e) { return graph.addEdge(e[0], e[1]); });
graph.print();
graph.deleteVertex('A');
graph.print();
graph.deleteEdge('C', 'D');
graph.print();
console.log('//////////////////////Ориентированный граф/////////////////////////////');
var orientGraph = new graph_1.default(true);
vertices.forEach(function (v) { return orientGraph.addVertex(v); });
edges.forEach(function (e) { return orientGraph.addEdge(e[0], e[1]); });
orientGraph.print();
orientGraph.deleteVertex('A');
orientGraph.print();
orientGraph.deleteEdge('C', 'D');
orientGraph.print();
console.log('//////////////////////Неориентированный с файла/////////////////////////////');
var graphFromFile = new graph_1.default(graph_json_1.default.isOrient, graph_json_1.default.vertices);
graphFromFile.print();
graphFromFile.addEdge('A', 'H');
graphFromFile.print();
console.log('//////////////////////Ориентированный с файла/////////////////////////////');
var graphOrientFromFile = new graph_1.default(orientGraph_json_1.default.isOrient, orientGraph_json_1.default.vertices);
graphOrientFromFile.print();
graphOrientFromFile.addEdge('A', 'H');
graphOrientFromFile.print();
graphOrientFromFile.write('test.json');
console.log('//////////////////////Пересечение графов/////////////////////////////');
var newGr = new graph_1.default();
newGr.addVertex('A');
newGr.addVertex('B');
newGr.addVertex('C');
newGr.addEdge('A', 'C');
newGr.addEdge('A', 'B');
newGr.print();
var newGr2 = new graph_1.default();
newGr2.addVertex('A');
newGr2.addVertex('B');
newGr2.addVertex('C');
newGr2.addEdge('A', 'C');
newGr2.print();
var newGr3 = newGr.intersection(newGr2);
newGr3.print();
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>',
});
console.log('//////////////////////Обходы графов/////////////////////////////');
console.log(traversals_1.default.resultDeepSearch);
console.log(traversals_1.default.resultWidthSearch);
console.log('//////////////////////Краскал/////////////////////////////');
kruskal_1.tree.print();
console.log('Создать граф: create, создать ориентированный граф createOrient, добавить вершину: vertex, добавить ребро: edge, ' +
    'вывести на экран: print, write: вывести в файл, degree - вывести степень полуисходов, loops - вывести количество петель');
var isVertex = false;
var isEdge = false;
var isWrite = false;
var isDegree = false;
var CLIGraph;
rl.prompt();
rl.on('line', function (line) {
    if (line === 'create') {
        isVertex = false;
        isEdge = false;
        isDegree = false;
        CLIGraph = new graph_1.default();
    }
    else if (line === 'createOrient') {
        isVertex = false;
        isEdge = false;
        isDegree = false;
        CLIGraph = new graph_1.default(true);
    }
    else if (line === 'vertex') {
        isVertex = true;
        isEdge = false;
        isWrite = false;
        isDegree = false;
    }
    else if (line === 'edge') {
        isVertex = false;
        isWrite = false;
        isEdge = true;
        isDegree = false;
    }
    else if (line === 'print') {
        CLIGraph.print();
    }
    else if (line === 'write') {
        isVertex = false;
        isEdge = false;
        isWrite = true;
        isDegree = false;
    }
    else if (line === 'degree') {
        isVertex = false;
        isEdge = false;
        isWrite = false;
        isDegree = true;
    }
    else if (line === 'loops') {
        CLIGraph.printLoopsVertices();
    }
    else if (isVertex) {
        CLIGraph.addVertex(line);
    }
    else if (isEdge) {
        var arr = line.split(' ');
        CLIGraph.addEdge(arr[0], arr[1]);
    }
    else if (isWrite) {
        CLIGraph.write(line);
        isWrite = false;
    }
    else if (isDegree) {
        var deg = CLIGraph.degreeOfOutcome(line);
        console.log(deg);
        isDegree = false;
    }
}).on('close', function () {
    console.log('exit');
    process.exit(0);
});
//# sourceMappingURL=index.js.map