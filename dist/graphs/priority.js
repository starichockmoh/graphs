"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Comparator = /** @class */ (function () {
    function Comparator(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }
    /**
     * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
     * @param {(string|number)} a
     * @param {(string|number)} b
     * @returns {number}
     */
    Comparator.defaultCompareFunction = function (a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    };
    /**
     * Checks if two variables are equal.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    Comparator.prototype.equal = function (a, b) {
        return this.compare(a, b) === 0;
    };
    /**
     * Checks if variable "a" is less than "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    Comparator.prototype.lessThan = function (a, b) {
        return this.compare(a, b) < 0;
    };
    /**
     * Checks if variable "a" is greater than "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    Comparator.prototype.greaterThan = function (a, b) {
        return this.compare(a, b) > 0;
    };
    /**
     * Checks if variable "a" is less than or equal to "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    Comparator.prototype.lessThanOrEqual = function (a, b) {
        return this.lessThan(a, b) || this.equal(a, b);
    };
    /**
     * Checks if variable "a" is greater than or equal to "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    Comparator.prototype.greaterThanOrEqual = function (a, b) {
        return this.greaterThan(a, b) || this.equal(a, b);
    };
    /**
     * Reverses the comparison order.
     */
    Comparator.prototype.reverse = function () {
        var compareOriginal = this.compare;
        this.compare = function (a, b) { return compareOriginal(b, a); };
    };
    return Comparator;
}());
/**
 * Parent class for Min and Max Heaps.
 */
var Heap = /** @class */ (function () {
    function Heap(comparatorFunction) {
        var _newTarget = this.constructor;
        if (_newTarget === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }
        // Array representation of the heap.
        this.heapContainer = [];
        this.compare = new Comparator(comparatorFunction);
    }
    /**
     * @param {number} parentIndex
     * @return {number}
     */
    Heap.prototype.getLeftChildIndex = function (parentIndex) {
        return 2 * parentIndex + 1;
    };
    /**
     * @param {number} parentIndex
     * @return {number}
     */
    Heap.prototype.getRightChildIndex = function (parentIndex) {
        return 2 * parentIndex + 2;
    };
    /**
     * @param {number} childIndex
     * @return {number}
     */
    Heap.prototype.getParentIndex = function (childIndex) {
        return Math.floor((childIndex - 1) / 2);
    };
    /**
     * @param {number} childIndex
     * @return {boolean}
     */
    Heap.prototype.hasParent = function (childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    };
    /**
     * @param {number} parentIndex
     * @return {boolean}
     */
    Heap.prototype.hasLeftChild = function (parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    };
    /**
     * @param {number} parentIndex
     * @return {boolean}
     */
    Heap.prototype.hasRightChild = function (parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    };
    /**
     * @param {number} parentIndex
     * @return {*}
     */
    Heap.prototype.leftChild = function (parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    };
    /**
     * @param {number} parentIndex
     * @return {*}
     */
    Heap.prototype.rightChild = function (parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    };
    /**
     * @param {number} childIndex
     * @return {*}
     */
    Heap.prototype.parent = function (childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)];
    };
    /**
     * @param {number} indexOne
     * @param {number} indexTwo
     */
    Heap.prototype.swap = function (indexOne, indexTwo) {
        var tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    };
    /**
     * @return {*}
     */
    Heap.prototype.peek = function () {
        if (this.heapContainer.length === 0) {
            return null;
        }
        return this.heapContainer[0];
    };
    /**
     * @return {*}
     */
    Heap.prototype.poll = function () {
        if (this.heapContainer.length === 0) {
            return null;
        }
        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }
        var item = this.heapContainer[0];
        // Move the last element from the end to the head.
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();
        return item;
    };
    /**
     * @param {*} item
     * @return {Heap}
     */
    Heap.prototype.add = function (item) {
        this.heapContainer.push(item);
        // @ts-ignore
        this.heapifyUp();
        return this;
    };
    /**
     * @param {*} item
     * @param {Comparator} [comparator]
     * @return {Heap}
     */
    Heap.prototype.remove = function (item, comparator) {
        if (comparator === void 0) { comparator = this.compare; }
        // Find number of items to remove.
        var numberOfItemsToRemove = this.find(item, comparator).length;
        for (var iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            // We need to find item index to remove each time after removal since
            // indices are being changed after each heapify process.
            var indexToRemove = this.find(item, comparator).pop();
            // If we need to remove last child in the heap then just remove it.
            // There is no need to heapify the heap afterwards.
            if (indexToRemove === this.heapContainer.length - 1) {
                this.heapContainer.pop();
            }
            else {
                // Move last element in heap to the vacant (removed) position.
                this.heapContainer[indexToRemove] = this.heapContainer.pop();
                // Get parent.
                var parentItem = this.parent(indexToRemove);
                // If there is no parent or parent is in correct order with the node
                // we're going to delete then heapify down. Otherwise heapify up.
                if (this.hasLeftChild(indexToRemove) &&
                    (!parentItem ||
                        this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove]))) {
                    this.heapifyDown(indexToRemove);
                }
                else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }
        return this;
    };
    /**
     * @param {*} item
     * @param {Comparator} [comparator]
     * @return {Number[]}
     */
    Heap.prototype.find = function (item, comparator) {
        if (comparator === void 0) { comparator = this.compare; }
        var foundItemIndices = [];
        for (var itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }
        }
        return foundItemIndices;
    };
    /**
     * @return {boolean}
     */
    Heap.prototype.isEmpty = function () {
        return !this.heapContainer.length;
    };
    /**
     * @return {string}
     */
    Heap.prototype.toString = function () {
        return this.heapContainer.toString();
    };
    /**
     * @param {number} [customStartIndex]
     */
    Heap.prototype.heapifyUp = function (customStartIndex) {
        // Take the last element (last in array or the bottom left in a tree)
        // in the heap container and lift it up until it is in the correct
        // order with respect to its parent element.
        var currentIndex = customStartIndex || this.heapContainer.length - 1;
        // @ts-ignore
        while (this.hasParent(currentIndex) &&
            // @ts-ignore
            !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    };
    /**
     * @param {number} [customStartIndex]
     */
    Heap.prototype.heapifyDown = function (customStartIndex) {
        if (customStartIndex === void 0) { customStartIndex = 0; }
        // Compare the parent element to its children and swap parent with the appropriate
        // child (smallest child for MinHeap, largest child for MaxHeap).
        // Do the same for next children after swap.
        var currentIndex = customStartIndex;
        var nextIndex = null;
        while (this.hasLeftChild(currentIndex)) {
            // @ts-ignore
            if (
            // @ts-ignore
            this.hasRightChild(currentIndex) &&
                this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
                nextIndex = this.getRightChildIndex(currentIndex);
            }
            else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }
            if (
            // @ts-ignore
            this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
                break;
            }
            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    };
    /**
     * Checks if pair of heap elements is in correct order.
     * For MinHeap the first element must be always smaller or equal.
     * For MaxHeap the first element must be always bigger or equal.
     *
     * @param {*} firstElement
     * @param {*} secondElement
     * @return {boolean}
     */
    /* istanbul ignore next */
    Heap.prototype.pairIsInCorrectOrder = function (firstElement, secondElement) {
        throw new Error("\n      You have to implement heap pair comparision method\n      for ".concat(firstElement, " and ").concat(secondElement, " values.\n    "));
    };
    return Heap;
}());
var MinHeap = /** @class */ (function (_super) {
    __extends(MinHeap, _super);
    function MinHeap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks if pair of heap elements is in correct order.
     * For MinHeap the first element must be always smaller or equal.
     * For MaxHeap the first element must be always bigger or equal.
     *
     * @param {*} firstElement
     * @param {*} secondElement
     * @return {boolean}
     */
    MinHeap.prototype.pairIsInCorrectOrder = function (firstElement, secondElement) {
        return this.compare.lessThanOrEqual(firstElement, secondElement);
    };
    return MinHeap;
}(Heap));
// It is the same as min heap except that when comparing two elements
// we take into account its priority instead of the element's value.
var PriorityQueue = /** @class */ (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue() {
        var _this = 
        // Call MinHip constructor first.
        // @ts-ignore
        _super.call(this) || this;
        // Setup priorities map.
        _this.priorities = new Map();
        // Use custom comparator for heap elements that will take element priority
        // instead of element value into account.
        _this.compare = new Comparator(_this.comparePriority.bind(_this));
        return _this;
    }
    /**
     * Add item to the priority queue.
     * @param {*} item - item we're going to add to the queue.
     * @param {number} [priority] - items priority.
     * @return {PriorityQueue}
     */
    PriorityQueue.prototype.add = function (item, priority) {
        if (priority === void 0) { priority = 0; }
        this.priorities.set(item, priority);
        _super.prototype.add.call(this, item);
        return this;
    };
    /**
     * Remove item from priority queue.
     * @param {*} item - item we're going to remove.
     * @param {Comparator} [customFindingComparator] - custom function for finding the item to remove
     * @return {PriorityQueue}
     */
    PriorityQueue.prototype.remove = function (item, customFindingComparator) {
        _super.prototype.remove.call(this, item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    };
    /**
     * Change priority of the item in a queue.
     * @param {*} item - item we're going to re-prioritize.
     * @param {number} priority - new item's priority.
     * @return {PriorityQueue}
     */
    PriorityQueue.prototype.changePriority = function (item, priority) {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);
        return this;
    };
    /**
     * Find item by ite value.
     * @param {*} item
     * @return {Number[]}
     */
    PriorityQueue.prototype.findByValue = function (item) {
        return this.find(item, new Comparator(this.compareValue));
    };
    /**
     * Check if item already exists in a queue.
     * @param {*} item
     * @return {boolean}
     */
    PriorityQueue.prototype.hasValue = function (item) {
        return this.findByValue(item).length > 0;
    };
    /**
     * Compares priorities of two items.
     * @param {*} a
     * @param {*} b
     * @return {number}
     */
    PriorityQueue.prototype.comparePriority = function (a, b) {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }
        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    };
    /**
     * Compares values of two items.
     * @param {*} a
     * @param {*} b
     * @return {number}
     */
    PriorityQueue.prototype.compareValue = function (a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    };
    return PriorityQueue;
}(MinHeap));
exports.default = PriorityQueue;
//# sourceMappingURL=priority.js.map