"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = __importDefault(require("./graphs/graph"));
var graph = new graph_1.default();
var vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'U'];
var edges = [
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
vertices.forEach(function (v) { return graph.addVertex(v); });
edges.forEach(function (e) { return graph.addEdge(e[0], e[1]); });
var resultDeepSearch = {};
var resultWidthSearch = {};
try {
    resultDeepSearch = graph.findShortestPath('A', 'E', 'B');
    resultWidthSearch = graph.bfs('A', null).distance;
}
catch (e) {
    console.log(e);
}
exports.default = { resultDeepSearch: resultDeepSearch, resultWidthSearch: resultWidthSearch };
//# sourceMappingURL=traversals.js.map