"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph = /** @class */ (function () {
    function Graph(isOrient) {
        this.vertices = {};
        this.isOrient = Boolean(isOrient);
    }
    Graph.prototype.print = function () {
        console.log(this.vertices);
    };
    Graph.prototype.addVertex = function (vertex) {
        if (!this.vertices[vertex])
            this.vertices[vertex] = [];
    };
    //откуда -> куда
    Graph.prototype.addEdge = function (vertex1, vertex2) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
            throw new Error('В графе нет таких вершин');
        }
        if (!this.vertices[vertex1].includes(vertex2)) {
            this.vertices[vertex1].push(vertex2);
        }
        if (!this.vertices[vertex2].includes(vertex1) && !this.isOrient) {
            this.vertices[vertex2].push(vertex1);
        }
    };
    Graph.prototype.deleteVertex = function (vertex) {
        var _this = this;
        var deletedVertices = this.vertices[vertex];
        if (deletedVertices) {
            deletedVertices.forEach(function (v) {
                var arr = _this.vertices[v];
                var deletedIndex = arr.indexOf(vertex);
                if (deletedIndex !== -1)
                    arr.splice(deletedIndex, 1);
            });
        }
        delete this.vertices[vertex];
    };
    Graph.prototype.deleteEdge = function (vertex1, vertex2) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
            throw new Error('В графе нет таких вершин');
        }
        if (this.vertices[vertex1].includes(vertex2)) {
            var arr = this.vertices[vertex1];
            var deletedIndex = arr.indexOf(vertex2);
            if (deletedIndex !== -1)
                this.vertices[vertex1].splice(deletedIndex, 1);
        }
        if (this.vertices[vertex2].includes(vertex1) && !this.isOrient) {
            var arr = this.vertices[vertex2];
            var deletedIndex = arr.indexOf(vertex1);
            if (deletedIndex !== -1)
                this.vertices[vertex2].splice(deletedIndex, 1);
        }
    };
    return Graph;
}());
exports.default = Graph;
//# sourceMappingURL=graph.js.map