"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$createTypeaheadNode = exports.TypeaheadNode = void 0;
const lexical_1 = require("lexical");
class TypeaheadNode extends lexical_1.TextNode {
    static clone(node) {
        return new TypeaheadNode(node.__text, node.__key);
    }
    static getType() {
        return 'typeahead';
    }
    static importJSON(serializedNode) {
        const node = $createTypeaheadNode(serializedNode.text);
        node.setFormat(serializedNode.format);
        node.setDetail(serializedNode.detail);
        node.setMode(serializedNode.mode);
        node.setStyle(serializedNode.style);
        return node;
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
function $createTypeaheadNode(text) {
    return new TypeaheadNode(text).setMode('inert');
}
exports.$createTypeaheadNode = $createTypeaheadNode;
//# sourceMappingURL=TypeaheadNode.js.map