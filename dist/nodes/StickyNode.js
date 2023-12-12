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
exports.$createStickyNode = exports.$isStickyNode = exports.StickyNode = void 0;
require("./StickyNode.css");
const LexicalCollaborationPlugin_1 = require("@lexical/react/LexicalCollaborationPlugin");
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const LexicalHistoryPlugin_1 = require("@lexical/react/LexicalHistoryPlugin");
const LexicalNestedComposer_1 = require("@lexical/react/LexicalNestedComposer");
const LexicalPlainTextPlugin_1 = require("@lexical/react/LexicalPlainTextPlugin");
const lexical_1 = require("lexical");
const React = __importStar(require("react"));
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const getDOMSelection_1 = __importDefault(require("../shared/src/getDOMSelection"));
const collaboration_1 = require("../collaboration");
const SharedHistoryContext_1 = require("../context/SharedHistoryContext");
const StickyEditorTheme_1 = __importDefault(require("../themes/StickyEditorTheme"));
const ContentEditable_1 = __importDefault(require("../ui/ContentEditable"));
const Placeholder_1 = __importDefault(require("../ui/Placeholder"));
function positionSticky(stickyElem, positioning) {
    const style = stickyElem.style;
    const rootElementRect = positioning.rootElementRect;
    const rectLeft = rootElementRect !== null ? rootElementRect.left : 0;
    const rectTop = rootElementRect !== null ? rootElementRect.top : 0;
    style.top = rectTop + positioning.y + 'px';
    style.left = rectLeft + positioning.x + 'px';
}
function StickyComponent({ x, y, nodeKey, color, caption, }) {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    const stickyContainerRef = (0, react_1.useRef)(null);
    const positioningRef = (0, react_1.useRef)({
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
        rootElementRect: null,
        x: 0,
        y: 0,
    });
    const { yjsDocMap } = (0, LexicalCollaborationPlugin_1.useCollaborationContext)();
    const isCollab = yjsDocMap.get('main') !== undefined;
    (0, react_1.useEffect)(() => {
        const position = positioningRef.current;
        position.x = x;
        position.y = y;
        const stickyContainer = stickyContainerRef.current;
        if (stickyContainer !== null) {
            positionSticky(stickyContainer, position);
        }
    }, [x, y]);
    (0, getDOMSelection_1.default)(() => {
        const position = positioningRef.current;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                const { target } = entry;
                position.rootElementRect = target.getBoundingClientRect();
                const stickyContainer = stickyContainerRef.current;
                if (stickyContainer !== null) {
                    positionSticky(stickyContainer, position);
                }
            }
        });
        const removeRootListener = editor.registerRootListener((nextRootElem, prevRootElem) => {
            if (prevRootElem !== null) {
                resizeObserver.unobserve(prevRootElem);
            }
            if (nextRootElem !== null) {
                resizeObserver.observe(nextRootElem);
            }
        });
        const handleWindowResize = () => {
            const rootElement = editor.getRootElement();
            const stickyContainer = stickyContainerRef.current;
            if (rootElement !== null && stickyContainer !== null) {
                position.rootElementRect = rootElement.getBoundingClientRect();
                positionSticky(stickyContainer, position);
            }
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
            removeRootListener();
        };
    }, [editor]);
    (0, react_1.useEffect)(() => {
        const stickyContainer = stickyContainerRef.current;
        if (stickyContainer !== null) {
            setTimeout(() => {
                stickyContainer.style.setProperty('transition', 'top 0.3s ease 0s, left 0.3s ease 0s');
            }, 500);
        }
    }, []);
    const handlePointerMove = (event) => {
        const stickyContainer = stickyContainerRef.current;
        const positioning = positioningRef.current;
        const rootElementRect = positioning.rootElementRect;
        if (stickyContainer !== null &&
            positioning.isDragging &&
            rootElementRect !== null) {
            positioning.x = event.pageX - positioning.offsetX - rootElementRect.left;
            positioning.y = event.pageY - positioning.offsetY - rootElementRect.top;
            positionSticky(stickyContainer, positioning);
        }
    };
    const handlePointerUp = (event) => {
        const stickyContainer = stickyContainerRef.current;
        const positioning = positioningRef.current;
        if (stickyContainer !== null) {
            positioning.isDragging = false;
            stickyContainer.classList.remove('dragging');
            editor.update(() => {
                const node = (0, lexical_1.$getNodeByKey)(nodeKey);
                if ($isStickyNode(node)) {
                    node.setPosition(positioning.x, positioning.y);
                }
            });
        }
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
    };
    const handleDelete = () => {
        editor.update(() => {
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isStickyNode(node)) {
                node.remove();
            }
        });
    };
    const handleColorChange = () => {
        editor.update(() => {
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isStickyNode(node)) {
                node.toggleColor();
            }
        });
    };
    const { historyState } = (0, SharedHistoryContext_1.useSharedHistoryContext)();
    return (React.createElement("div", { ref: stickyContainerRef, className: "sticky-note-container" },
        React.createElement("div", { className: `sticky-note ${color}`, onPointerDown: (event) => {
                const stickyContainer = stickyContainerRef.current;
                if (stickyContainer == null ||
                    event.button === 2 ||
                    event.target !== stickyContainer.firstChild) {
                    return;
                }
                const stickContainer = stickyContainer;
                const positioning = positioningRef.current;
                if (stickContainer !== null) {
                    const { top, left } = stickContainer.getBoundingClientRect();
                    positioning.offsetX = event.clientX - left;
                    positioning.offsetY = event.clientY - top;
                    positioning.isDragging = true;
                    stickContainer.classList.add('dragging');
                    document.addEventListener('pointermove', handlePointerMove);
                    document.addEventListener('pointerup', handlePointerUp);
                    event.preventDefault();
                }
            } },
            React.createElement("button", { onClick: handleDelete, className: "delete", "aria-label": "Delete sticky note", title: "Delete" }, "X"),
            React.createElement("button", { onClick: handleColorChange, className: "color", "aria-label": "Change sticky note color", title: "Color" },
                React.createElement("i", { className: "bucket" })),
            React.createElement(LexicalNestedComposer_1.LexicalNestedComposer, { initialEditor: caption, initialTheme: StickyEditorTheme_1.default },
                isCollab ? (React.createElement(LexicalCollaborationPlugin_1.CollaborationPlugin, { id: caption.getKey(), providerFactory: collaboration_1.createWebsocketProvider, shouldBootstrap: true })) : (React.createElement(LexicalHistoryPlugin_1.HistoryPlugin, { externalHistoryState: historyState })),
                React.createElement(LexicalPlainTextPlugin_1.PlainTextPlugin, { contentEditable: React.createElement(ContentEditable_1.default, { className: "StickyNode__contentEditable" }), placeholder: React.createElement(Placeholder_1.default, { className: "StickyNode__placeholder" }, "What's up?"), initialEditorState: null })))));
}
class StickyNode extends lexical_1.DecoratorNode {
    static getType() {
        return 'sticky';
    }
    static clone(node) {
        return new StickyNode(node.__x, node.__y, node.__color, node.__caption, node.__key);
    }
    static importJSON(serializedNode) {
        return new StickyNode(serializedNode.xOffset, serializedNode.yOffset, serializedNode.color, serializedNode.caption);
    }
    constructor(x, y, color, caption, key) {
        super(key);
        this.__x = x;
        this.__y = y;
        this.__caption = caption || (0, lexical_1.createEditor)();
        this.__color = color;
    }
    exportJSON() {
        return {
            caption: this.__caption,
            color: this.__color,
            type: 'sticky',
            version: 1,
            xOffset: this.__x,
            yOffset: this.__y,
        };
    }
    createDOM(config) {
        const div = document.createElement('div');
        div.style.display = 'contents';
        return div;
    }
    updateDOM() {
        return false;
    }
    setPosition(x, y) {
        const writable = this.getWritable();
        writable.__x = x;
        writable.__y = y;
        (0, lexical_1.$setSelection)(null);
    }
    toggleColor() {
        const writable = this.getWritable();
        writable.__color = writable.__color === 'pink' ? 'yellow' : 'pink';
    }
    decorate(editor, config) {
        return (0, react_dom_1.createPortal)(React.createElement(StickyComponent, { color: this.__color, x: this.__x, y: this.__y, nodeKey: this.getKey(), caption: this.__caption }), document.body);
    }
    isIsolated() {
        return true;
    }
}
exports.StickyNode = StickyNode;
function $isStickyNode(node) {
    return node instanceof StickyNode;
}
exports.$isStickyNode = $isStickyNode;
function $createStickyNode(xOffset, yOffset) {
    return new StickyNode(xOffset, yOffset, 'yellow');
}
exports.$createStickyNode = $createStickyNode;
//# sourceMappingURL=StickyNode.js.map