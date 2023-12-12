"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeaheadNode = void 0;
const lexical_1 = require("lexical");
class TypeaheadNode extends lexical_1.TextNode {
    static clone(node) {
        return new TypeaheadNode(node.__text, node.__key);
    }
    static getType() {
        return 'typeahead';
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            type: 'typeahead',
            version: 1,
        };
    }
    createDOM(config) {
        const dom = super.createDOM(config);
        dom.style.cssText = 'color: #ccc;';
        return dom;
    }
}
exports.TypeaheadNode = TypeaheadNode;
//# sourceMappingURL=TypeaheadNode.js.map