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
exports.$isImageNode = exports.$createImageNode = exports.ImageNode = void 0;
require("./ImageNode.css");
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const LexicalHashtagPlugin_1 = require("@lexical/react/LexicalHashtagPlugin");
const LexicalLinkPlugin_1 = require("@lexical/react/LexicalLinkPlugin");
const LexicalNestedComposer_1 = require("@lexical/react/LexicalNestedComposer");
const LexicalRichTextPlugin_1 = require("@lexical/react/LexicalRichTextPlugin");
const LexicalTablePlugin_1 = require("@lexical/react/LexicalTablePlugin");
const useLexicalNodeSelection_1 = require("@lexical/react/useLexicalNodeSelection");
const utils_1 = require("@lexical/utils");
const lexical_1 = require("lexical");
const React = __importStar(require("react"));
const react_1 = require("react");
const SettingsContext_1 = require("../context/SettingsContext");
const SharedHistoryContext_1 = require("../context/SharedHistoryContext");
const EmojisPlugin_1 = __importDefault(require("../plugins/EmojisPlugin"));
const ImagesPlugin_1 = __importDefault(require("../plugins/ImagesPlugin"));
const KeywordsPlugin_1 = __importDefault(require("../plugins/KeywordsPlugin"));
const MentionsPlugin_1 = __importDefault(require("../plugins/MentionsPlugin"));
const TableActionMenuPlugin_1 = __importDefault(require("../plugins/TableActionMenuPlugin"));
const TreeViewPlugin_1 = __importDefault(require("../plugins/TreeViewPlugin"));
const ContentEditable_1 = __importDefault(require("../ui/ContentEditable"));
const ImageResizer_1 = __importDefault(require("../ui/ImageResizer"));
const Placeholder_1 = __importDefault(require("../ui/Placeholder"));
const imageCache = new Set();
function useSuspenseImage(src) {
    if (!imageCache.has(src)) {
        throw new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageCache.add(src);
                resolve(null);
            };
        });
    }
}
function convertImageElement(domNode) {
    if (domNode instanceof HTMLImageElement) {
        const { alt: altText, src } = domNode;
        const node = $createImageNode({ altText, src });
        return { node };
    }
    return null;
}
function LazyImage({ altText, className, imageRef, src, width, height, maxWidth, }) {
    useSuspenseImage(src);
    return (React.createElement("img", { className: className || undefined, src: src, alt: altText, ref: imageRef, style: {
            height,
            maxWidth,
            width,
        }, draggable: "false" }));
}
function ImageComponent({ src, altText, nodeKey, width, height, maxWidth, resizable, showCaption, caption, }) {
    const ref = (0, react_1.useRef)(null);
    const [isSelected, setSelected, clearSelection] = (0, useLexicalNodeSelection_1.useLexicalNodeSelection)(nodeKey);
    const [isResizing, setIsResizing] = (0, react_1.useState)(false);
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    const [selection, setSelection] = (0, react_1.useState)(null);
    const onDelete = (0, react_1.useCallback)((payload) => {
        if (isSelected && (0, lexical_1.$isNodeSelection)((0, lexical_1.$getSelection)())) {
            const event = payload;
            event.preventDefault();
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isImageNode(node)) {
                node.remove();
            }
            setSelected(false);
        }
        return false;
    }, [isSelected, nodeKey, setSelected]);
    (0, react_1.useEffect)(() => {
        return (0, utils_1.mergeRegister)(editor.registerUpdateListener(({ editorState }) => {
        }), editor.registerCommand(lexical_1.CLICK_COMMAND, (payload) => {
            const event = payload;
            if (isResizing) {
                return true;
            }
            if (event.target === ref.current) {
                if (!event.shiftKey) {
                    clearSelection();
                }
                setSelected(!isSelected);
                return true;
            }
            return false;
        }, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_DELETE_COMMAND, onDelete, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_BACKSPACE_COMMAND, onDelete, lexical_1.COMMAND_PRIORITY_LOW));
    }, [
        clearSelection,
        editor,
        isResizing,
        isSelected,
        nodeKey,
        onDelete,
        setSelected,
    ]);
    const setShowCaption = () => {
        editor.update(() => {
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isImageNode(node)) {
                node.setShowCaption(true);
            }
        });
    };
    const onResizeEnd = (nextWidth, nextHeight) => {
        setTimeout(() => {
            setIsResizing(false);
        }, 200);
        editor.update(() => {
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isImageNode(node)) {
                node.setWidthAndHeight(nextWidth, nextHeight);
            }
        });
    };
    const onResizeStart = () => {
        setIsResizing(true);
    };
    const { historyState } = (0, SharedHistoryContext_1.useSharedHistoryContext)();
    const { settings: { showNestedEditorTreeView }, } = (0, SettingsContext_1.useSettings)();
    const draggable = isSelected && (0, lexical_1.$isNodeSelection)(selection);
    const isFocused = (0, lexical_1.$isNodeSelection)(selection) && (isSelected || isResizing);
    return (React.createElement(react_1.Suspense, { fallback: null },
        React.createElement(React.Fragment, null,
            React.createElement("div", { draggable: draggable },
                React.createElement(LazyImage, { className: isFocused ? 'focused' : null, src: src, altText: altText, imageRef: ref, width: width, height: height, maxWidth: maxWidth })),
            showCaption && (React.createElement("div", { className: "image-caption-container" },
                React.createElement(LexicalNestedComposer_1.LexicalNestedComposer, { initialEditor: caption },
                    React.createElement(MentionsPlugin_1.default, null),
                    React.createElement(LexicalTablePlugin_1.TablePlugin, null),
                    React.createElement(TableActionMenuPlugin_1.default, null),
                    React.createElement(ImagesPlugin_1.default, null),
                    React.createElement(LexicalLinkPlugin_1.LinkPlugin, null),
                    React.createElement(EmojisPlugin_1.default, null),
                    React.createElement(LexicalHashtagPlugin_1.HashtagPlugin, null),
                    React.createElement(KeywordsPlugin_1.default, null),
                    React.createElement(LexicalRichTextPlugin_1.RichTextPlugin, { contentEditable: React.createElement(ContentEditable_1.default, { className: "ImageNode__contentEditable" }), placeholder: React.createElement(Placeholder_1.default, { className: "ImageNode__placeholder" }, "Enter a caption..."), ErrorBoundary: undefined }),
                    showNestedEditorTreeView === true ? React.createElement(TreeViewPlugin_1.default, null) : null))),
            resizable && isFocused && (React.createElement(ImageResizer_1.default, { showCaption: showCaption, setShowCaption: setShowCaption, editor: editor, imageRef: ref, maxWidth: maxWidth, onResizeStart: onResizeStart, onResizeEnd: onResizeEnd })))));
}
class ImageNode extends lexical_1.DecoratorNode {
    static getType() {
        return 'image';
    }
    static clone(node) {
        return new ImageNode(node.__src, node.__altText, node.__maxWidth, node.__width, node.__height, node.__showCaption, node.__caption, node.__key);
    }
    static importJSON(serializedNode) {
        const { altText, height, width, maxWidth, caption, src, showCaption } = serializedNode;
        const node = $createImageNode({
            altText,
            height,
            maxWidth,
            showCaption,
            src,
            width,
        });
        const nestedEditor = node.__caption;
        const editorState = nestedEditor.parseEditorState(caption.editorState);
        if (!editorState.isEmpty()) {
            nestedEditor.setEditorState(editorState);
        }
        return node;
    }
    exportDOM() {
        const element = document.createElement('img');
        element.setAttribute('src', this.__src);
        element.setAttribute('alt', this.__altText);
        return { element };
    }
    static importDOM() {
        return {
            img: (node) => ({
                conversion: convertImageElement,
                priority: 0,
            }),
        };
    }
    constructor(src, altText, maxWidth, width, height, showCaption, caption, key) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__maxWidth = maxWidth;
        this.__width = width || 'inherit';
        this.__height = height || 'inherit';
        this.__showCaption = showCaption || false;
        this.__caption = caption || (0, lexical_1.createEditor)();
    }
    exportJSON() {
        return {
            altText: this.getAltText(),
            caption: this.__caption.toJSON(),
            height: this.__height === 'inherit' ? 0 : this.__height,
            maxWidth: this.__maxWidth,
            showCaption: this.__showCaption,
            src: this.getSrc(),
            type: 'image',
            version: 1,
            width: this.__width === 'inherit' ? 0 : this.__width,
        };
    }
    setWidthAndHeight(width, height) {
        const writable = this.getWritable();
        writable.__width = width;
        writable.__height = height;
    }
    setShowCaption(showCaption) {
        const writable = this.getWritable();
        writable.__showCaption = showCaption;
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
    getSrc() {
        return this.__src;
    }
    getAltText() {
        return this.__altText;
    }
    decorate() {
        return (React.createElement(ImageComponent, { src: this.__src, altText: this.__altText, width: this.__width, height: this.__height, maxWidth: this.__maxWidth, nodeKey: this.getKey(), showCaption: this.__showCaption, caption: this.__caption, resizable: true }));
    }
}
exports.ImageNode = ImageNode;
function $createImageNode({ altText, height, maxWidth = 500, src, width, showCaption, caption, key, }) {
    return new ImageNode(src, altText, maxWidth, width, height, showCaption, caption, key);
}
exports.$createImageNode = $createImageNode;
function $isImageNode(node) {
    return node instanceof ImageNode;
}
exports.$isImageNode = $isImageNode;
//# sourceMappingURL=ImageNode.js.map