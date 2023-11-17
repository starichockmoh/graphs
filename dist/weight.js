"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.floydWarshall = exports.bellmanFord = exports.distances = exports.previousVertices = void 0;
var graph_1 = __importDefault(require("./graphs/graph"));
var graph = new graph_1.default();
var graphOrient = new graph_1.default(true);
var vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
var edges = [
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
vertices.forEach(function (v) { return graph.addVertex(v); });
vertices.forEach(function (v) { return graphOrient.addVertex(v); });
edges.forEach(function (e) { return graph.addEdge(e[0], e[1], e[2]); });
edges.forEach(function (e) { return graphOrient.addEdge(e[0], e[1], e[2]); });
exports.previousVertices = (_a = graph.dijkstra('A'), _a.previousVertices), exports.distances = _a.distances;
exports.bellmanFord = graph.bellmanFord('A', 8);
exports.floydWarshall = graphOrient.floydWarshall('F', 'D', 10);
//# sourceMappingURL=weight.js.map