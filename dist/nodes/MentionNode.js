"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isMentionNode = exports.$createMentionNode = exports.MentionNode = void 0;
const lexical_1 = require("lexical");
function convertMentionElement(domNode) {
    const textContent = domNode.textContent;
    if (textContent !== null) {
        const node = $createMentionNode(textContent);
        return {
            node,
        };
    }
    return null;
}
const mentionStyle = 'background-color: rgba(24, 119, 232, 0.2)';
class MentionNode extends lexical_1.TextNode {
    static getType() {
        return 'mention';
    }
    static clone(node) {
        return new MentionNode(node.__mention, node.__text, node.__key);
    }
    static importJSON(serializedNode) {
        const node = $createMentionNode(serializedNode.mentionName);
        node.setTextContent(serializedNode.text);
        node.setFormat(serializedNode.format);
        node.setDetail(serializedNode.detail);
        node.setMode(serializedNode.mode);
        node.setStyle(serializedNode.style);
        return node;
    }
    constructor(mentionName, text, key) {
        super(text ?? mentionName, key);
        this.__mention = mentionName;
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            mentionName: this.__mention,
            type: 'mention',
            version: 1,
        };
    }
    createDOM(config) {
        const dom = super.createDOM(config);
        dom.style.cssText = mentionStyle;
        dom.className = 'mention';
        return dom;
    }
    exportDOM() {
        const element = document.createElement('span');
        element.setAttribute('data-lexical-mention', 'true');
        element.textContent = this.__text;
        return { element };
    }
    static importDOM() {
        return {
            span: (domNode) => {
                if (!domNode.hasAttribute('data-lexical-mention')) {
                    return null;
                }
                return {
                    conversion: convertMentionElement,
                    priority: 1,
                };
            },
        };
    }
    isTextEntity() {
        return true;
    }
}
exports.MentionNode = MentionNode;
function $createMentionNode(mentionName) {
    const mentionNode = new MentionNode(mentionName);
    mentionNode.setMode('segmented').toggleDirectionless();
    return mentionNode;
}
exports.$createMentionNode = $createMentionNode;
function $isMentionNode(node) {
    return node instanceof MentionNode;
}
exports.$isMentionNode = $isMentionNode;
//# sourceMappingURL=MentionNode.js.map