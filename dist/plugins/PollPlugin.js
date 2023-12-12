"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSERT_POLL_COMMAND = void 0;
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const lexical_1 = require("lexical");
const react_1 = require("react");
const PollNode_1 = require("../nodes/PollNode");
exports.INSERT_POLL_COMMAND = (0, lexical_1.createCommand)();
function PollPlugin() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    (0, react_1.useEffect)(() => {
        if (!editor.hasNodes([PollNode_1.PollNode])) {
            throw new Error('PollPlugin: PollNode not registered on editor');
        }
        return editor.registerCommand(exports.INSERT_POLL_COMMAND, (payload) => {
            const selection = (0, lexical_1.$getSelection)();
            if ((0, lexical_1.$isRangeSelection)(selection)) {
                const question = payload;
                const pollNode = (0, PollNode_1.$createPollNode)(question);
                if ((0, lexical_1.$isRootNode)(selection.anchor.getNode())) {
                    selection.insertParagraph();
                }
                selection.insertNodes([pollNode]);
            }
            return true;
        }, lexical_1.COMMAND_PRIORITY_EDITOR);
    }, [editor]);
    return null;
}
exports.default = PollPlugin;
//# sourceMappingURL=PollPlugin.js.map