"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSERT_TWEET_COMMAND = void 0;
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const lexical_1 = require("lexical");
const react_1 = require("react");
const TweetNode_1 = require("../nodes/TweetNode");
exports.INSERT_TWEET_COMMAND = (0, lexical_1.createCommand)();
function TwitterPlugin() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    (0, react_1.useEffect)(() => {
        if (!editor.hasNodes([TweetNode_1.TweetNode])) {
            throw new Error('TwitterPlugin: TweetNode not registered on editor');
        }
        return editor.registerCommand(exports.INSERT_TWEET_COMMAND, (payload) => {
            const selection = (0, lexical_1.$getSelection)();
            const tweetNode = (0, TweetNode_1.$createTweetNode)(payload);
            if ((0, lexical_1.$isRangeSelection)(selection)) {
                const focusNode = selection.focus.getNode();
                focusNode.getTopLevelElementOrThrow().insertAfter(tweetNode);
            }
            else if ((0, lexical_1.$isNodeSelection)(selection)) {
                const nodes = selection.getNodes();
                nodes[nodes.length - 1]
                    .getTopLevelElementOrThrow()
                    .insertAfter(tweetNode);
            }
            else {
                const root = (0, lexical_1.$getRoot)();
                root.append(tweetNode);
            }
            const paragraphNode = (0, lexical_1.$createParagraphNode)();
            tweetNode.insertAfter(paragraphNode);
            paragraphNode.select();
            return true;
        }, lexical_1.COMMAND_PRIORITY_EDITOR);
    }, [editor]);
    return null;
}
exports.default = TwitterPlugin;
//# sourceMappingURL=TwitterPlugin.js.map