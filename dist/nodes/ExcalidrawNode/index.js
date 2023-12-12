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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isExcalidrawNode = exports.$createExcalidrawNode = exports.ExcalidrawNode = void 0;
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const useLexicalNodeSelection_1 = require("@lexical/react/useLexicalNodeSelection");
const utils_1 = require("@lexical/utils");
const lexical_1 = require("lexical");
const React = __importStar(require("react"));
const react_1 = require("react");
const ImageResizer_1 = __importDefault(require("../../ui/ImageResizer"));
const ExcalidrawImage_1 = __importDefault(require("./ExcalidrawImage"));
function ExcalidrawComponent({ nodeKey, data, }) {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    const imageContainerRef = (0, react_1.useRef)(null);
    const buttonRef = (0, react_1.useRef)(null);
    const [isSelected, setSelected, clearSelection] = (0, useLexicalNodeSelection_1.useLexicalNodeSelection)(nodeKey);
    const [isResizing, setIsResizing] = (0, react_1.useState)(false);
    const onDelete = (0, react_1.useCallback)((event) => {
        if (isSelected && (0, lexical_1.$isNodeSelection)((0, lexical_1.$getSelection)())) {
            event.preventDefault();
            editor.update(() => {
                const node = (0, lexical_1.$getNodeByKey)(nodeKey);
                if ($isExcalidrawNode(node)) {
                    node.remove();
                }
                setSelected(false);
            });
        }
        return false;
    }, [editor, isSelected, nodeKey, setSelected]);
    (0, react_1.useEffect)(() => {
        return (0, utils_1.mergeRegister)(editor.registerCommand(lexical_1.CLICK_COMMAND, (event) => {
            const buttonElem = buttonRef.current;
            const eventTarget = event.target;
            if (isResizing) {
                return true;
            }
            if (buttonElem !== null && buttonElem.contains(eventTarget)) {
                if (!event.shiftKey) {
                    clearSelection();
                }
                setSelected(!isSelected);
                if (event.detail > 1) {
                }
                return true;
            }
            return false;
        }, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_DELETE_COMMAND, onDelete, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_BACKSPACE_COMMAND, onDelete, lexical_1.COMMAND_PRIORITY_LOW));
    }, [clearSelection, editor, isSelected, isResizing, onDelete, setSelected]);
    const deleteNode = (0, react_1.useCallback)(() => {
    }, [editor, nodeKey]);
    const setData = (newData) => {
        return editor.update(() => {
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isExcalidrawNode(node)) {
                if (newData.length > 0) {
                    node.setData(JSON.stringify(newData));
                }
                else {
                    node.remove();
                }
            }
        });
    };
    const onResizeStart = () => {
        setIsResizing(true);
    };
    const onResizeEnd = () => {
        setTimeout(() => {
            setIsResizing(false);
        }, 200);
    };
    const elements = (0, react_1.useMemo)(() => JSON.parse(data), [data]);
    return (React.createElement(React.Fragment, null, elements.length > 0 && (React.createElement("button", { ref: buttonRef, className: `excalidraw-button ${isSelected ? 'selected' : ''}` },
        React.createElement(ExcalidrawImage_1.default, { imageContainerRef: imageContainerRef, className: "image", elements: elements }),
        (isSelected || isResizing) && (React.createElement(ImageResizer_1.default, { showCaption: true, setShowCaption: () => null, imageRef: imageContainerRef, editor: editor, onResizeStart: onResizeStart, onResizeEnd: onResizeEnd }))))));
}
function convertExcalidrawElement(domNode) {
    const excalidrawData = domNode.getAttribute('data-lexical-excalidraw-json');
    if (excalidrawData) {
        const node = $createExcalidrawNode();
        node.__data = excalidrawData;
        return {
            node,
        };
    }
    return null;
}
class ExcalidrawNode extends lexical_1.DecoratorNode {
    static getType() {
        return 'excalidraw';
    }
    static clone(node) {
        return new ExcalidrawNode(node.__data, node.__key);
    }
    static importJSON(serializedNode) {
        return new ExcalidrawNode(serializedNode.data);
    }
    exportJSON() {
        return {
            data: this.__data,
            type: 'excalidraw',
            version: 1,
        };
    }
    constructor(data = '[]', key) {
        super(key);
        this.__data = data;
    }
    createDOM(config) {
        const span = document.createElement('span');
        const theme = config.theme;
        const className = theme.image;
        if (className !== undefined) {
            span.className = className;
        }
        return span;
    }
    updateDOM() {
        return false;
    }
    static importDOM() {
        return {
            span: (domNode) => {
                if (!domNode.hasAttribute('data-lexical-excalidraw-json')) {
                    return null;
                }
                return {
                    conversion: convertExcalidrawElement,
                    priority: 1,
                };
            },
        };
    }
    exportDOM(editor) {
        const element = document.createElement('span');
        const content = editor.getElementByKey(this.getKey());
        if (content !== null) {
            const svg = content.querySelector('svg');
            if (svg !== null) {
                element.innerHTML = svg.outerHTML;
            }
        }
        element.setAttribute('data-lexical-excalidraw-json', this.__data);
        return { element };
    }
    setData(data) {
        const self = this.getWritable();
        self.__data = data;
    }
    decorate(editor, config) {
        return React.createElement(ExcalidrawComponent, { nodeKey: this.getKey(), data: this.__data });
    }
}
exports.ExcalidrawNode = ExcalidrawNode;
function $createExcalidrawNode() {
    return new ExcalidrawNode();
}
exports.$createExcalidrawNode = $createExcalidrawNode;
function $isExcalidrawNode(node) {
    return node instanceof ExcalidrawNode;
}
exports.$isExcalidrawNode = $isExcalidrawNode;
//# sourceMappingURL=index.js.map