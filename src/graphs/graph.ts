import * as fs from 'fs';

type KeyType = string | number;
type VertexItemType = {
  weight: number;
  value: KeyType;
};

export type IVertex = {
  [key in KeyType]: Array<VertexItemType>;
};

export default class Graph {
  private vertices: IVertex;
  private isOrient: boolean;
  public constructor(isOrient?: boolean, vertices?: IVertex) {
    this.vertices = vertices ?? {};
    this.isOrient = Boolean(isOrient);
  }

  public copy(graph: Graph) {
    this.isOrient = graph.isOrient;
    this.vertices = graph.vertices;
  }

  public getAllVertices() {
    return Object.values(this.vertices);
  }

  public getAllEdges() {
    return Object.values(this.vertices);
  }

  public getIsOrient() {
    return this.isOrient;
  }

  public print() {
    console.log(this.vertices);
  }

  public degreeOfOutcome(vertex: KeyType) {
    if (!this.isOrient) throw new Error('Граф неориентрованный!');
    if (!(vertex in this.vertices)) throw new Error('Такой вершины нет!');
    else return this.vertices[vertex].length;
  }

  public printLoopsVertices() {
    if (!this.isOrient) throw new Error('Граф неориентрованный!');
    const loops = Object.entries(this.vertices).filter(([key, arr]) =>
      arr.find((el) => el.value === key),
    );
    if (!loops.length) console.log('Петель нет');
    else loops.forEach((l) => console.log(l[0] + ' '));
  }

  public intersection(graph: Graph) {
    const interGraph = new Graph();
    Object.entries(this.vertices).forEach(([key, arr]) => {
      if (key in graph.vertices) {
        interGraph.addVertex(key);
        const graphArr = graph.vertices[key];
        arr.forEach((el) => {
          if (graphArr.find((grEl) => el.value === grEl.value)) {
            interGraph.addVertex(el.value);
            interGraph.addEdge(key, el.value);
          }
        });
      }
    });
    return interGraph;
  }

  bfs(startVertex: KeyType, badVertex: KeyType) {
    if (startVertex === badVertex) {
      throw new Error(`Начальная вершина совпадает с нежелательной`);
    }
    let list = this.vertices;
    let queue = [startVertex];
    let visited = { [startVertex]: 1 };

    // кратчайшее расстояние от стартовой вершины
    let distance = { [startVertex]: 0 };
    // предыдущая вершина в цепочке
    let previous = { [startVertex]: null };

    function handleVertex(vertex: KeyType) {
      let neighboursList = list[vertex];

      neighboursList.forEach((neighbour) => {
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
      let activeVertex = queue.shift();
      handleVertex(activeVertex);
    }

    return { distance, previous };
  }

  dfs(startVertex: KeyType, badVertex: KeyType) {
    let list = this.vertices; // список смежности
    let stack = [startVertex]; // стек вершин для перебора
    let visited = { [startVertex]: 1 }; // посещенные вершины

    // кратчайшее расстояние от стартовой вершины
    let distance = { [startVertex]: 0 };
    // предыдущая вершина в цепочке
    let previous = { [startVertex]: null };

    function handleVertex(vertex: KeyType) {
      // получаем список смежных вершин
      let reversedNeighboursList = [...list[vertex]].reverse();

      reversedNeighboursList.forEach((neighbour) => {
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
      let activeVertex = stack.pop();
      handleVertex(activeVertex);
    }

    return { distance, previous };
  }

  findShortestPath(
    startVertex: KeyType,
    finishVertex: KeyType,
    badVertex: KeyType,
  ) {
    let result = this.dfs(startVertex, badVertex);

    if (!(finishVertex in result.previous))
      throw new Error(
        `Нет пути из вершины ${startVertex} в вершину ${finishVertex}`,
      );

    let path = [];

    let currentVertex = finishVertex;

    while (currentVertex !== startVertex) {
      path.unshift(currentVertex);
      currentVertex = result.previous[currentVertex];
    }

    path.unshift(startVertex);

    return path;
  }

  public write(name: string) {
    const data = {
      isOrient: this.isOrient,
      vertices: this.vertices,
    };
    // создаём файл
    fs.writeFileSync(name, JSON.stringify(data));
  }

  public addVertex(vertex: KeyType) {
    if (!this.vertices[vertex]) this.vertices[vertex] = [];
  }

  //откуда -> куда
  public addEdge(vertex1: KeyType, vertex2: KeyType, weight?: number) {
    if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
      throw new Error('В графе нет таких вершин');
    }

    if (
      (!this.vertices[vertex1].find((el) => el.value === vertex2) &&
        !this.isOrient) ||
      this.isOrient
    ) {
      this.vertices[vertex1].push({
        value: vertex2,
        weight: weight ?? 0,
      });
    }

    if (
      !this.vertices[vertex2].find((el) => el.value === vertex1) &&
      !this.isOrient
    ) {
      this.vertices[vertex2].push({
        value: vertex1,
        weight: weight ?? 0,
      });
    }
  }

  public deleteVertex(vertex: KeyType) {
    const deletedVertices = this.vertices[vertex];
    if (deletedVertices) {
      deletedVertices.forEach((v) => {
        const arr = this.vertices[v.value];
        const deletedIndex = arr.findIndex((el) => el.value === vertex);
        if (deletedIndex !== -1) arr.splice(deletedIndex, 1);
      });
    }
    delete this.vertices[vertex];
  }

  public deleteEdge(vertex1: KeyType, vertex2: KeyType) {
    if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
      throw new Error('В графе нет таких вершин');
    }

    if (this.vertices[vertex1].find((el) => el.value === vertex2)) {
      const arr = this.vertices[vertex1];
      const deletedIndex = arr.findIndex((el) => el.value === vertex2);
      if (deletedIndex !== -1) this.vertices[vertex1].splice(deletedIndex, 1);
    }

    if (
      this.vertices[vertex2].find((el) => el.value === vertex1) &&
      !this.isOrient
    ) {
      const arr = this.vertices[vertex2];
      const deletedIndex = arr.findIndex((el) => el.value === vertex1);
      if (deletedIndex !== -1) this.vertices[vertex2].splice(deletedIndex, 1);
    }
  }
}

// export function kruskal(graph: Graph) {
//   // It should fire error if graph is directed since the algorithm works only
//   // for undirected graphs.
//   if (graph.getIsOrient()) {
//     throw new Error("Kruskal's algorithms works only for undirected graphs");
//   }
//
//   // Init new graph that will contain minimum spanning tree of original graph.
//   const minimumSpanningTree = new Graph();
//
//   // Sort all graph edges in increasing order.
//   const sortingCallbacks = {
//     /**
//      * @param {GraphEdge} graphEdgeA
//      * @param {GraphEdge} graphEdgeB
//      */
//     compareCallback: (
//       graphEdgeA: VertexItemType,
//       graphEdgeB: VertexItemType,
//     ) => {
//       if (graphEdgeA.weight === graphEdgeB.weight) {
//         return 1;
//       }
//
//       return graphEdgeA.weight <= graphEdgeB.weight ? -1 : 1;
//     },
//   };
//   const sortedEdges = new QuickSort(sortingCallbacks).sort(graph.getAllEdges());
//
//   // Create disjoint sets for all graph vertices.
//   const keyCallback = (graphVertex) => graphVertex.getKey();
//   const disjointSet = new DisjointSet(keyCallback);
//
//   graph.getAllVertices().forEach((graphVertex) => {
//     disjointSet.makeSet(graphVertex);
//   });
//
//   // Go through all edges started from the minimum one and try to add them
//   // to minimum spanning tree. The criteria of adding the edge would be whether
//   // it is forms the cycle or not (if it connects two vertices from one disjoint
//   // set or not).
//   for (let edgeIndex = 0; edgeIndex < sortedEdges.length; edgeIndex += 1) {
//     /** @var {GraphEdge} currentEdge */
//     const currentEdge = sortedEdges[edgeIndex];
//
//     // Check if edge forms the cycle. If it does then skip it.
//     if (
//       !disjointSet.inSameSet(currentEdge.startVertex, currentEdge.endVertex)
//     ) {
//       // Unite two subsets into one.
//       disjointSet.union(currentEdge.startVertex, currentEdge.endVertex);
//
//       // Add this edge to spanning tree.
//       minimumSpanningTree.addEdge(currentEdge);
//     }
//   }
//
//   return minimumSpanningTree;
// }
