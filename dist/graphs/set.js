"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DisjointSetItem = /** @class */ (function () {
    /**
     * @param {*} value
     * @param {function(value: *)} [keyCallback]
     */
    function DisjointSetItem(value, keyCallback) {
        this.value = value;
        this.keyCallback = keyCallback;
        /** @var {DisjointSetItem} this.parent */
        this.parent = null;
        this.children = {};
    }
    /**
     * @return {*}
     */
    DisjointSetItem.prototype.getKey = function () {
        // Allow user to define custom key generator.
        if (this.keyCallback) {
            return this.keyCallback(this.value);
        }
        // Otherwise use value as a key by default.
        return this.value;
    };
    /**
     * @return {DisjointSetItem}
     */
    DisjointSetItem.prototype.getRoot = function () {
        return this.isRoot() ? this : this.parent.getRoot();
    };
    /**
     * @return {boolean}
     */
    DisjointSetItem.prototype.isRoot = function () {
        return this.parent === null;
    };
    /**
     * Rank basically means the number of all ancestors.
     *
     * @return {number}
     */
    DisjointSetItem.prototype.getRank = function () {
        if (this.getChildren().length === 0) {
            return 0;
        }
        var rank = 0;
        /** @var {DisjointSetItem} child */
        this.getChildren().forEach(function (child) {
            // Count child itself.
            rank += 1;
            // Also add all children of current child.
            rank += child.getRank();
        });
        return rank;
    };
    /**
     * @return {DisjointSetItem[]}
     */
    DisjointSetItem.prototype.getChildren = function () {
        return Object.values(this.children);
    };
    /**
     * @param {DisjointSetItem} parentItem
     * @param {boolean} forceSettingParentChild
     * @return {DisjointSetItem}
     */
    DisjointSetItem.prototype.setParent = function (parentItem, forceSettingParentChild) {
        if (forceSettingParentChild === void 0) { forceSettingParentChild = true; }
        this.parent = parentItem;
        if (forceSettingParentChild) {
            parentItem.addChild(this);
        }
        return this;
    };
    /**
     * @param {DisjointSetItem} childItem
     * @return {DisjointSetItem}
     */
    DisjointSetItem.prototype.addChild = function (childItem) {
        this.children[childItem.getKey()] = childItem;
        childItem.setParent(this, false);
        return this;
    };
    return DisjointSetItem;
}());
var DisjointSet = /** @class */ (function () {
    /**
     * @param {function(value: *)} [keyCallback]
     */
    function DisjointSet(keyCallback) {
        this.keyCallback = keyCallback;
        this.items = {};
    }
    /**
     * @param {*} itemValue
     * @return {DisjointSet}
     */
    DisjointSet.prototype.makeSet = function (itemValue) {
        var disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback);
        if (!this.items[disjointSetItem.getKey()]) {
            // Add new item only in case if it not presented yet.
            this.items[disjointSetItem.getKey()] = disjointSetItem;
        }
        return this;
    };
    /**
     * Find set representation node.
     *
     * @param {*} itemValue
     * @return {(string|null)}
     */
    DisjointSet.prototype.find = function (itemValue) {
        var templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);
        // Try to find item itself;
        var requiredDisjointItem = this.items[templateDisjointItem.getKey()];
        if (!requiredDisjointItem) {
            return null;
        }
        return requiredDisjointItem.getRoot().getKey();
    };
    /**
     * Union by rank.
     *
     * @param {*} valueA
     * @param {*} valueB
     * @return {DisjointSet}
     */
    DisjointSet.prototype.union = function (valueA, valueB) {
        var rootKeyA = this.find(valueA);
        var rootKeyB = this.find(valueB);
        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }
        if (rootKeyA === rootKeyB) {
            // In case if both elements are already in the same set then just return its key.
            return this;
        }
        var rootA = this.items[rootKeyA];
        var rootB = this.items[rootKeyB];
        if (rootA.getRank() < rootB.getRank()) {
            // If rootB's tree is bigger then make rootB to be a new root.
            rootB.addChild(rootA);
            return this;
        }
        // If rootA's tree is bigger then make rootA to be a new root.
        rootA.addChild(rootB);
        return this;
    };
    /**
     * @param {*} valueA
     * @param {*} valueB
     * @return {boolean}
     */
    DisjointSet.prototype.inSameSet = function (valueA, valueB) {
        var rootKeyA = this.find(valueA);
        var rootKeyB = this.find(valueB);
        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }
        return rootKeyA === rootKeyB;
    };
    return DisjointSet;
}());
exports.default = DisjointSet;
//# sourceMappingURL=set.js.map