"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSERT_EXCALIDRAW_COMMAND = void 0;
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const lexical_1 = require("lexical");
const react_1 = require("react");
const ExcalidrawNode_1 = require("../nodes/ExcalidrawNode");
exports.INSERT_EXCALIDRAW_COMMAND = (0, lexical_1.createCommand)();
function ExcalidrawPlugin() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    (0, react_1.useEffect)(() => {
        if (!editor.hasNodes([ExcalidrawNode_1.ExcalidrawNode])) {
            throw new Error('ExcalidrawPlugin: ExcalidrawNode not registered on editor');
        }
        return editor.registerCommand(exports.INSERT_EXCALIDRAW_COMMAND, () => {
            const selection = (0, lexical_1.$getSelection)();
            if ((0, lexical_1.$isRangeSelection)(selection)) {
                const excalidrawNode = (0, ExcalidrawNode_1.$createExcalidrawNode)();
                selection.insertNodes([excalidrawNode]);
            }
            return true;
        }, lexical_1.COMMAND_PRIORITY_EDITOR);
    }, [editor]);
    return null;
}
exports.default = ExcalidrawPlugin;
//# sourceMappingURL=ExcalidrawPlugin.js.map