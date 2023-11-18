"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxStream = void 0;
var graph_1 = __importDefault(require("./graphs/graph"));
var graph = new graph_1.default(true);
var vertices = ['1', '2', '3', '4', '5'];
var edges = [
    ['1', '2', 20],
    ['1', '4', 10],
    ['1', '3', 30],
    ['2', '3', 40],
    ['2', '5', 30],
    ['3', '4', 10],
    ['3', '5', 20],
    ['4', '5', 20],
];
vertices.forEach(function (v) { return graph.addVertex(v); });
edges.forEach(function (e) { return graph.addEdge(e[0], e[1], e[2]); });
exports.maxStream = graph.maxStream(0, 4);
//# sourceMappingURL=stream.js.map