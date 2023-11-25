"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var set_1 = __importDefault(require("./set"));
var priority_1 = __importDefault(require("./priority"));
var Graph = /** @class */ (function () {
    function Graph(isOrient, vertices) {
        this.vertices = vertices !== null && vertices !== void 0 ? vertices : {};
        this.isOrient = Boolean(isOrient);
    }
    Graph.prototype.getAllVertices = function () {
        return Object.keys(this.vertices);
    };
    Graph.prototype.getAllEdges = function () {
        return Object.entries(this.vertices)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return value.map(function (v) { return ({
                weight: v.weight,
                from: key,
                to: v.value,
            }); });
        })
            .flat();
    };
    Graph.prototype.getIsOrient = function () {
        return this.isOrient;
    };
    Graph.prototype.print = function () {
        console.log(this.vertices);
    };
    Graph.prototype.copy = function (graph) {
        this.isOrient = graph.isOrient;
        this.vertices = graph.vertices;
    };
    Graph.prototype.degreeOfOutcome = function (vertex) {
        if (!this.isOrient)
            throw new Error('Граф неориентрованный!');
        if (!(vertex in this.vertices))
            throw new Error('Такой вершины нет!');
        else
            return this.vertices[vertex].length;
    };
    Graph.prototype.printLoopsVertices = function () {
        if (!this.isOrient)
            throw new Error('Граф неориентрованный!');
        var loops = Object.entries(this.vertices).filter(function (_a) {
            var key = _a[0], arr = _a[1];
            return arr.find(function (el) { return el.value === key; });
        });
        if (!loops.length)
            console.log('Петель нет');
        else
            loops.forEach(function (l) { return console.log(l[0] + ' '); });
    };
    Graph.prototype.intersection = function (graph) {
        var interGraph = new Graph();
        Object.entries(this.vertices).forEach(function (_a) {
            var key = _a[0], arr = _a[1];
            if (key in graph.vertices) {
                interGraph.addVertex(key);
                var graphArr_1 = graph.vertices[key];
                arr.forEach(function (el) {
                    if (graphArr_1.find(function (grEl) { return el.value === grEl.value; })) {
                        interGraph.addVertex(el.value);
                        interGraph.addEdge(key, el.value);
                    }
                });
            }
        });
        return interGraph;
    };
    Graph.prototype.bfs = function (startVertex, badVertex) {
        var _a, _b, _c;
        if (startVertex === badVertex) {
            throw new Error("\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0448\u0438\u043D\u0430 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442 \u0441 \u043D\u0435\u0436\u0435\u043B\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0439");
        }
        var list = this.vertices;
        var queue = [startVertex];
        var visited = (_a = {}, _a[startVertex] = 1, _a);
        // кратчайшее расстояние от стартовой вершины
        var distance = (_b = {}, _b[startVertex] = 0, _b);
        // предыдущая вершина в цепочке
        var previous = (_c = {}, _c[startVertex] = null, _c);
        function handleVertex(vertex) {
            var neighboursList = list[vertex];
            neighboursList.forEach(function (neighbour) {
                if (!visited[neighbour.value] && neighbour.value !== badVertex) {
                    visited[neighbour.value] = 1;
                    queue.push(neighbour.value);
                    // сохраняем предыдущую вершину
                    previous[neighbour.value] = vertex;
                    // сохраняем расстояние
                    distance[neighbour.value] = distance[vertex] + 1;
                }
            });
        }
        // перебираем вершины из очереди, пока она не опустеет
        while (queue.length) {
            var activeVertex = queue.shift();
            handleVertex(activeVertex);
        }
        return { distance: distance, previous: previous };
    };
    Graph.prototype.dfs = function (startVertex, badVertex) {
        var _a, _b, _c;
        var list = this.vertices; // список смежности
        var stack = [startVertex]; // стек вершин для перебора
        var visited = (_a = {}, _a[startVertex] = 1, _a); // посещенные вершины
        // кратчайшее расстояние от стартовой вершины
        var distance = (_b = {}, _b[startVertex] = 0, _b);
        // предыдущая вершина в цепочке
        var previous = (_c = {}, _c[startVertex] = null, _c);
        function handleVertex(vertex) {
            // получаем список смежных вершин
            var reversedNeighboursList = __spreadArray([], list[vertex], true).reverse();
            reversedNeighboursList.forEach(function (neighbour) {
                if (!visited[neighbour.value] && neighbour.value !== badVertex) {
                    // отмечаем вершину как посещенную
                    visited[neighbour.value] = 1;
                    // добавляем в стек
                    stack.push(neighbour.value);
                    previous[neighbour.value] = vertex;
                    // сохраняем расстояние
                    distance[neighbour.value] = distance[vertex] + 1;
                }
            });
        }
        // перебираем вершины из стека, пока он не опустеет
        while (stack.length) {
            var activeVertex = stack.pop();
            handleVertex(activeVertex);
        }
        return { distance: distance, previous: previous };
    };
    Graph.prototype.findShortestPath = function (startVertex, finishVertex, badVertex) {
        var result = this.dfs(startVertex, badVertex);
        if (!(finishVertex in result.previous))
            throw new Error("\u041D\u0435\u0442 \u043F\u0443\u0442\u0438 \u0438\u0437 \u0432\u0435\u0440\u0448\u0438\u043D\u044B ".concat(startVertex, " \u0432 \u0432\u0435\u0440\u0448\u0438\u043D\u0443 ").concat(finishVertex));
        var path = [];
        var currentVertex = finishVertex;
        while (currentVertex !== startVertex) {
            path.unshift(currentVertex);
            currentVertex = result.previous[currentVertex];
        }
        path.unshift(startVertex);
        return path;
    };
    Graph.prototype.write = function (name) {
        var data = {
            isOrient: this.isOrient,
            vertices: this.vertices,
        };
        // создаём файл
        fs.writeFileSync(name, JSON.stringify(data));
    };
    Graph.prototype.addVertex = function (vertex) {
        if (!this.vertices[vertex])
            this.vertices[vertex] = [];
    };
    //откуда -> куда
    Graph.prototype.addEdge = function (vertex1, vertex2, weight) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
            throw new Error('В графе нет таких вершин');
        }
        if ((!this.vertices[vertex1].find(function (el) { return el.value === vertex2; }) &&
            !this.isOrient) ||
            this.isOrient) {
            this.vertices[vertex1].push({
                value: vertex2,
                weight: weight !== null && weight !== void 0 ? weight : 0,
            });
        }
        if (!this.vertices[vertex2].find(function (el) { return el.value === vertex1; }) &&
            !this.isOrient) {
            this.vertices[vertex2].push({
                value: vertex1,
                weight: weight !== null && weight !== void 0 ? weight : 0,
            });
        }
    };
    Graph.prototype.deleteVertex = function (vertex) {
        var _this = this;
        var deletedVertices = this.vertices[vertex];
        if (deletedVertices) {
            deletedVertices.forEach(function (v) {
                var arr = _this.vertices[v.value];
                var deletedIndex = arr.findIndex(function (el) { return el.value === vertex; });
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
        if (this.vertices[vertex1].find(function (el) { return el.value === vertex2; })) {
            var arr = this.vertices[vertex1];
            var deletedIndex = arr.findIndex(function (el) { return el.value === vertex2; });
            if (deletedIndex !== -1)
                this.vertices[vertex1].splice(deletedIndex, 1);
        }
        if (this.vertices[vertex2].find(function (el) { return el.value === vertex1; }) &&
            !this.isOrient) {
            var arr = this.vertices[vertex2];
            var deletedIndex = arr.findIndex(function (el) { return el.value === vertex1; });
            if (deletedIndex !== -1)
                this.vertices[vertex2].splice(deletedIndex, 1);
        }
    };
    Graph.prototype.kruskal = function () {
        if (this.getIsOrient()) {
            throw new Error('Граф ориентированный!');
        }
        //Инициализировать новый граф, который будет содержать минимальное остовное дерево исходного графа.
        var minimumSpanningTree = new Graph();
        var sortingCallbacks = {
            compareCallback: function (graphEdgeA, graphEdgeB) {
                if (graphEdgeA.weight === graphEdgeB.weight)
                    return 1;
                return graphEdgeA.weight <= graphEdgeB.weight ? -1 : 1;
            },
        };
        var sortedEdges = this.getAllEdges().sort(sortingCallbacks.compareCallback);
        //Создайте непересекающиеся множества для всех вершин графа.
        var keyCallback = function (graphVertex) { return graphVertex; };
        var disjointSet = new set_1.default(keyCallback);
        this.getAllVertices().forEach(function (graphVertex) {
            disjointSet.makeSet(graphVertex);
        });
        // Пройдитесь по всем ребрам, начиная с минимального, и попробуйте их добавить.
        // к минимальному связующему дереву. Критерием добавления ребра будет то, будет ли
        // образует цикл или нет (если соединяет две вершины из одной непересекающейся
        // установлено или нет).
        for (var edgeIndex = 0; edgeIndex < sortedEdges.length; edgeIndex += 1) {
            var currentEdge = sortedEdges[edgeIndex];
            if (!disjointSet.inSameSet(currentEdge.from, currentEdge.to)) {
                // Объедините два подмножества в одно.
                disjointSet.union(currentEdge.from, currentEdge.to);
                minimumSpanningTree.addVertex(currentEdge.from);
                minimumSpanningTree.addVertex(currentEdge.to);
                //Добавьте это ребро к связующему дереву.
                minimumSpanningTree.addEdge(currentEdge.from, currentEdge.to, currentEdge.weight);
            }
        }
        return minimumSpanningTree;
    };
    //"На пальцах" примерно так... Алгоритм основан на том, что, грубо говоря, там,
    // где уже побывали - больше не будем. И что чем дальше идем, тем больший суммарный вес - именно поэтому нам не
    // нужно возвращаться: ничего лучше, чем есть, уже не будет. А ребра с отрицательным весом эти правила нарушают - может
    // оказаться, что если воспользоваться ребром с отрицательным весом и вернуться в уже просмотренную вершину, то вес пути
    // к ней окажется меньше. Что противоречит идее в основе алгоритма. –
    //В графе с отрицательными весами понятие пути минимального веса может быть не определено.
    // Это не зависит от алгоритма решающего задачу. Сам граф так (может быть) устроен, что нельзя сказать про какой-то путь -
    // "это путь минимального веса". Пока это так, никакой алгоритм не может решить задачу, так как он будет искать то чего нет.
    // Определитесь что такое путь минимального веса в вашем примере, тогда можно будет говорить находит ли конкретный алгоритм именно его.
    Graph.prototype.dijkstra = function (startVertex) {
        // Вспомогательные переменные инициализации, которые нам понадобятся для алгоритма Дейкстры.
        var distances = {};
        var visitedVertices = {};
        var previousVertices = {};
        var queue = new priority_1.default();
        // Инициализируем все расстояния с бесконечностью, предполагая, что
        // в данный момент мы не можем достичь ни одной вершины, кроме начальной.
        this.getAllVertices().forEach(function (vertex) {
            distances[vertex] = Infinity;
            previousVertices[vertex] = null;
        });
        // Мы уже находимся в начальной вершине, поэтому расстояние до нее равно нулю.
        distances[startVertex] = 0;
        // Инициализация очереди вершин
        queue.add(startVertex, distances[startVertex]);
        var _loop_1 = function () {
            // Получить следующую ближайшую вершину.
            var currentVertex = queue.poll();
            // Перебрать каждого непосещенного соседа текущей вершины.
            this_1.vertices[currentVertex].forEach(function (neighbor) {
                // Не посещайте уже посещенные вершины.
                if (!visitedVertices[neighbor.value]) {
                    // Обновить расстояния до каждого соседа от текущей вершины.
                    var existingDistanceToNeighbor = distances[neighbor.value];
                    var distanceToNeighborFromCurrent = distances[currentVertex] + neighbor.weight;
                    // Если мы нашли более короткий путь к соседу — обновите его.
                    if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
                        distances[neighbor.value] = distanceToNeighborFromCurrent;
                        // Изменить приоритет соседа в очереди, так как он мог стать ближе.
                        if (queue.hasValue(neighbor.value)) {
                            queue.changePriority(neighbor.value, distances[neighbor.value]);
                        }
                        // Запомните предыдущую ближайшую вершину.
                        previousVertices[neighbor.value] = currentVertex;
                    }
                    // Добавьте соседа в очередь для дальнейшего посещения.
                    if (!queue.hasValue(neighbor.value)) {
                        queue.add(neighbor.value, distances[neighbor.value]);
                    }
                }
            });
            // Добавьте текущую вершину к посещенным, чтобы в дальнейшем не посещать ее повторно.
            visitedVertices[currentVertex] = currentVertex;
        };
        var this_1 = this;
        // Перебирать приоритетную очередь вершин, пока она не станет пустой.
        while (!queue.isEmpty()) {
            _loop_1();
        }
        // Возвращает набор кратчайших расстояний до всех вершин и набор
        // кратчайших путей ко всем вершинам графа.
        return {
            distances: distances,
            previousVertices: previousVertices,
        };
    };
    Graph.prototype.bellmanFord = function (startVertex, limit) {
        var _this = this;
        var distances = {};
        var previousVertices = {};
        // Инициализируем все расстояния с бесконечностью, предполагая,
        // что в данный момент мы не можем достичь ни одной вершины, кроме начальной.
        distances[startVertex] = 0;
        this.getAllVertices().forEach(function (vertex) {
            previousVertices[vertex] = null;
            if (vertex !== startVertex) {
                distances[vertex] = Infinity;
            }
        });
        // Нам понадобится (|V| - 1) итераций.
        for (var iteration = 0; iteration < this.getAllVertices().length - 1; iteration += 1) {
            // Во время каждой итерации проходят все вершины.
            Object.keys(distances).forEach(function (vertex) {
                // Пройдите через все ребра вершин.
                _this.vertices[vertex].forEach(function (neighbor) {
                    // Выясним, меньше ли расстояние до соседа в этой
                    // итерации, чем в предыдущей.
                    var distanceToVertex = distances[vertex];
                    var distanceToNeighbor = distanceToVertex + neighbor.weight;
                    if (distanceToNeighbor < distances[neighbor.value]) {
                        distances[neighbor.value] = distanceToNeighbor;
                        previousVertices[neighbor.value] = vertex;
                    }
                });
            });
        }
        var perefery = {};
        Object.entries(distances).forEach(function (_a) {
            var key = _a[0], dist = _a[1];
            if (Number(dist) > limit) {
                perefery[key] = dist;
            }
        });
        return {
            distances: distances,
            previousVertices: previousVertices,
            perefery: perefery,
        };
    };
    Graph.prototype.floydWarshall = function (v1, v2, L) {
        var _this = this;
        var vertices = this.getAllVertices();
        // Инициализировать матрицу предыдущих вершин с нулями, что означает отсутствие
        // существуют предыдущие вершины, которые дадут нам кратчайший путь.
        var nextVertices = Array(vertices.length)
            .fill(null)
            .map(function () {
            return Array(vertices.length).fill(null);
        });
        //Начальная матрица расстояний с бесконечностью означает,
        // что путей между вершинами пока не существует.
        var distances = Array(vertices.length)
            .fill(null)
            .map(function () {
            return Array(vertices.length).fill(Infinity);
        });
        //Инициализируем матрицу расстояний с расстоянием, которое мы уже сейчас (от существующих ребер).
        //А также инициализировать предыдущие вершины с ребер.
        vertices.forEach(function (startVertex, startIndex) {
            vertices.forEach(function (endVertex, endIndex) {
                if (startVertex === endVertex) {
                    distances[startIndex][endIndex] = 0;
                }
                else {
                    // Найдите ребро между начальной и конечной вершинами
                    var edge = _this.vertices[startVertex].find(function (v) { return v.value === endVertex; });
                    if (edge) {
                        // Существует ребро от вершины с startIndex до вершины с endIndex.
                        // Сохраните расстояние и предыдущую вершину.
                        distances[startIndex][endIndex] = edge.weight;
                        nextVertices[startIndex][endIndex] = startVertex;
                    }
                    else {
                        distances[startIndex][endIndex] = Infinity;
                    }
                }
            });
        });
        // Теперь перейдем к сути алгоритма.
        // Возьмем все пары вершин (от начала до конца) и попробуем проверить, есть ли там
        // между ними существует более короткий путь через среднюю вершину. Средняя вершина также может
        // быть одной из вершин графа. Как вы можете видеть, теперь у нас будет три
        // циклически проходит по всем вершинам графа: для начальной, конечной и средней вершины.
        vertices.forEach(function (middleVertex, middleIndex) {
            // Путь начинается с startVertex с помощью startIndex.
            vertices.forEach(function (startVertex, startIndex) {
                // Путь заканчивается на endVertex с помощью endIndex.
                vertices.forEach(function (endVertex, endIndex) {
                    // Сравните существующее расстояние от startVertex до endVertex с расстоянием
                    // от startVertex до endVertex, но через middleVertex.
                    // Сохраняем кратчайшее расстояние и предыдущую вершину, которая позволяет
                    // нам нужно это кратчайшее расстояние.
                    var distViaMiddle = distances[startIndex][middleIndex] +
                        distances[middleIndex][endIndex];
                    if (distances[startIndex][endIndex] > distViaMiddle) {
                        // Мы нашли кратчайший проход через среднюю вершину.
                        distances[startIndex][endIndex] = distViaMiddle;
                        nextVertices[startIndex][endIndex] = middleVertex;
                    }
                });
            });
        });
        var indexV1 = this.getAllVertices().indexOf(String(v1));
        var indexV2 = this.getAllVertices().indexOf(String(v2));
        var dist = distances[indexV1][indexV2];
        var isExist = dist <= L;
        return { distances: distances, nextVertices: nextVertices, dist: dist, isExist: isExist };
    };
    Graph.prototype.getVerticesMatrix = function () {
        var _this = this;
        var matrixVertices = [];
        Object.keys(this.vertices).forEach(function (curVertex, index) {
            matrixVertices.push([]);
            Object.keys(_this.vertices).forEach(function (vertex) {
                var vStraight = _this.vertices[curVertex].find(function (v) { return v.value === vertex; });
                var vReturn = _this.vertices[vertex].find(function (v) { return v.value === curVertex; });
                if (curVertex === vertex) {
                    matrixVertices[index].push([0, 0, 1]);
                }
                else if (vStraight) {
                    matrixVertices[index].push([vStraight.weight, 0, 1]);
                }
                else if (vReturn) {
                    matrixVertices[index].push([vReturn.weight, 0, -1]);
                }
                else {
                    matrixVertices[index].push([0, 0, 1]);
                }
            });
        });
        return matrixVertices;
    };
    Graph.prototype.getMaxVertex = function (currentVertex, matrixVertices, visited) {
        var max = 0; // наименьшее допустимое значение
        var vertexResult = -1;
        matrixVertices[currentVertex].forEach(function (vertex, index) {
            if (!visited.includes(index)) {
                if (vertex[2] === 1) {
                    if (max < vertex[0]) {
                        max = vertex[0];
                        vertexResult = index;
                    }
                }
                else {
                    if (max < vertex[1]) {
                        max = vertex[1];
                        vertexResult = index;
                    }
                }
            }
        });
        return vertexResult;
    };
    Graph.prototype.updateMatrix = function (matrixVertices, routes, stream) {
        var newMatrixVertices = matrixVertices;
        routes.forEach(function (el) {
            if (el[1] !== -1) {
                var sgn = newMatrixVertices[el[2]][el[1]][2];
                newMatrixVertices[el[1]][el[2]][0] -= stream * sgn;
                newMatrixVertices[el[1]][el[2]][1] += stream * sgn;
                newMatrixVertices[el[2]][el[1]][0] -= stream * sgn;
                newMatrixVertices[el[2]][el[1]][1] += stream * sgn;
            }
        });
        return newMatrixVertices;
    };
    Graph.prototype.getMaxFlow = function (routes) {
        return routes.map(function (el) { return el[0]; }).reduce(function (x, y) { return Math.min(x, y); });
    };
    Graph.prototype.maxStream = function (init, end) {
        var matrixVertices = this.getVerticesMatrix();
        var routeInit = [Infinity, -1, init]; // первая метка маршрута (a, from, vertex)
        var routeStreams = []; // максимальные потоки найденных маршрутов
        var j = init;
        while (j !== -1) {
            var startVertex = init; // стартовая вершина (нумерация с нуля)
            var routes = [routeInit]; // метки маршрута
            var visited = [init]; // множество просмотренных вершин
            while (startVertex != end) {
                j = this.getMaxVertex(startVertex, matrixVertices, visited); // выбираем вершину с наибольшей пропускной способностью
                // если следующих вершин нет
                if (j === -1) {
                    if (startVertex == init) {
                        //и мы на истоке, то завершаем поиск маршрутов
                        break;
                    }
                    else {
                        startVertex = routes.pop()[2];
                    }
                }
                else {
                    var currentStream = // определяем текущий поток
                     matrixVertices[startVertex][j][2] == 1
                        ? matrixVertices[startVertex][j][0]
                        : matrixVertices[startVertex][j][1];
                    routes.push([currentStream, j, startVertex]); // добавляем метку маршрута
                    visited.push(j); // запоминаем вершину как просмотренную
                    // если дошди до стока
                    if (j === end) {
                        routeStreams.push(this.getMaxFlow(routes)); // находим максимальную пропускную способность маршрута
                        matrixVertices = this.updateMatrix(matrixVertices, routes, routeStreams[routeStreams.length - 1]); // обновляем веса дуг
                        break;
                    }
                    startVertex = j;
                }
            }
        }
        return routeStreams.reduce(function (el, accum) { return accum + el; });
    };
    return Graph;
}());
exports.default = Graph;
//# sourceMappingURL=graph.js.map