"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSERT_IMAGE_COMMAND = void 0;
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const utils_1 = require("@lexical/utils");
const lexical_1 = require("lexical");
const react_1 = require("react");
const getDOMSelection_1 = __importDefault(require("../shared/src/getDOMSelection"));
const ImageNode_1 = require("../nodes/ImageNode");
exports.INSERT_IMAGE_COMMAND = (0, lexical_1.createCommand)();
function ImagesPlugin() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    (0, react_1.useEffect)(() => {
        if (!editor.hasNodes([ImageNode_1.ImageNode])) {
            throw new Error('ImagesPlugin: ImageNode not registered on editor');
        }
        return (0, utils_1.mergeRegister)(editor.registerCommand(exports.INSERT_IMAGE_COMMAND, (payload) => {
            const selection = (0, lexical_1.$getSelection)();
            if ((0, lexical_1.$isRangeSelection)(selection)) {
                if ((0, lexical_1.$isRootNode)(selection.anchor.getNode())) {
                    selection.insertParagraph();
                }
                const imageNode = (0, ImageNode_1.$createImageNode)(payload);
                selection.insertNodes([imageNode]);
            }
            return true;
        }, lexical_1.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical_1.DRAGSTART_COMMAND, (event) => {
            return onDragStart(event);
        }, lexical_1.COMMAND_PRIORITY_HIGH), editor.registerCommand(lexical_1.DRAGOVER_COMMAND, (event) => {
            return onDragover(event);
        }, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.DROP_COMMAND, (event) => {
            return onDrop(event, editor);
        }, lexical_1.COMMAND_PRIORITY_HIGH));
    }, [editor]);
    return null;
}
exports.default = ImagesPlugin;
const TRANSPARENT_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const img = document.createElement('img');
img.src = TRANSPARENT_IMAGE;
function onDragStart(event) {
    const node = getImageNodeInSelection();
    if (!node) {
        return false;
    }
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) {
        return false;
    }
    dataTransfer.setData('text/plain', '_');
    dataTransfer.setDragImage(img, 0, 0);
    dataTransfer.setData('application/x-lexical-drag', JSON.stringify({
        data: {
            altText: node.__altText,
            caption: node.__caption,
            height: node.__height,
            key: node.getKey(),
            maxWidth: node.__maxWidth,
            showCaption: node.__showCaption,
            src: node.__src,
            width: node.__width,
        },
        type: 'image',
    }));
    return true;
}
function onDragover(event) {
    const node = getImageNodeInSelection();
    if (!node) {
        return false;
    }
    if (!canDropImage(event)) {
        event.preventDefault();
    }
    return true;
}
function onDrop(event, editor) {
    const node = getImageNodeInSelection();
    if (!node) {
        return false;
    }
    const data = getDragImageData(event);
    if (!data) {
        return false;
    }
    event.preventDefault();
    if (canDropImage(event)) {
        const range = getDragSelection(event);
        node.remove();
        const rangeSelection = (0, lexical_1.$createRangeSelection)();
        if (range !== null && range !== undefined) {
            rangeSelection.applyDOMRange(range);
        }
        (0, lexical_1.$setSelection)(rangeSelection);
        editor.dispatchCommand(exports.INSERT_IMAGE_COMMAND, data);
    }
    return true;
}
function getImageNodeInSelection() {
    const selection = (0, lexical_1.$getSelection)();
    if (!(0, lexical_1.$isNodeSelection)(selection)) {
        return null;
    }
    const nodes = selection.getNodes();
    const node = nodes[0];
    return (0, ImageNode_1.$isImageNode)(node) ? node : null;
}
function getDragImageData(event) {
    const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
    if (!dragData) {
        return null;
    }
    const { type, data } = JSON.parse(dragData);
    if (type !== 'image') {
        return null;
    }
    return data;
}
function canDropImage(event) {
    const target = event.target;
    return !!(target &&
        target instanceof HTMLElement &&
        !target.closest('code, span.editor-image') &&
        target.parentElement &&
        target.parentElement.closest('div.ContentEditable__root'));
}
function getDragSelection(event) {
    let range;
    const domSelection = (0, getDOMSelection_1.default)();
    if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(event.clientX, event.clientY);
    }
    else if (event.rangeParent && domSelection !== null) {
        domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
        range = domSelection.getRangeAt(0);
    }
    else {
        throw Error(`Cannot get the selection when dragging`);
    }
    return range;
}
//# sourceMappingURL=ImagesPlugin.js.map