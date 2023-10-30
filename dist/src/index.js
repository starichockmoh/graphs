"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = __importDefault(require("./graphs/graph"));
var graph_json_1 = __importDefault(require("../static/graph.json"));
//Работа с неориентрованным графом
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
console.log('///////////////////////////////////////////////////////////////////////////');
//Работа с неориентрованным графом
var orientGraph = new graph_1.default(true);
vertices.forEach(function (v) { return orientGraph.addVertex(v); });
edges.forEach(function (e) { return orientGraph.addEdge(e[0], e[1]); });
orientGraph.print();
orientGraph.deleteVertex('A');
orientGraph.print();
orientGraph.deleteEdge('C', 'D');
orientGraph.print();
console.log(graph_json_1.default);
// const rawData = fs.readFileSync(file);
// // @ts-ignore
// const graphData = JSON.parse(rawData);
//
// console.log(graphData);
//# sourceMappingURL=index.js.map