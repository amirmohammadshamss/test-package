"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSERT_YOUTUBE_COMMAND = void 0;
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const lexical_1 = require("lexical");
const react_1 = require("react");
const YouTubeNode_1 = require("../nodes/YouTubeNode");
exports.INSERT_YOUTUBE_COMMAND = (0, lexical_1.createCommand)();
function YouTubePlugin() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    (0, react_1.useEffect)(() => {
        if (!editor.hasNodes([YouTubeNode_1.YouTubeNode])) {
            throw new Error('YouTubePlugin: YouTubeNode not registered on editor');
        }
        return editor.registerCommand(exports.INSERT_YOUTUBE_COMMAND, (payload) => {
            const selection = (0, lexical_1.$getSelection)();
            const youTubeNode = (0, YouTubeNode_1.$createYouTubeNode)(payload);
            if ((0, lexical_1.$isRangeSelection)(selection)) {
                const focusNode = selection.focus.getNode();
                focusNode.getTopLevelElementOrThrow().insertAfter(youTubeNode);
            }
            else if ((0, lexical_1.$isNodeSelection)(selection)) {
                const nodes = selection.getNodes();
                nodes[nodes.length - 1]
                    .getTopLevelElementOrThrow()
                    .insertAfter(youTubeNode);
            }
            else {
                const root = (0, lexical_1.$getRoot)();
                root.append(youTubeNode);
            }
            const paragraphNode = (0, lexical_1.$createParagraphNode)();
            youTubeNode.insertAfter(paragraphNode);
            paragraphNode.select();
            return true;
        }, lexical_1.COMMAND_PRIORITY_EDITOR);
    }, [editor]);
    return null;
}
exports.default = YouTubePlugin;
//# sourceMappingURL=YouTubePlugin.js.map