"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSERT_EQUATION_COMMAND = void 0;
require("katex/dist/katex.css");
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const lexical_1 = require("lexical");
const react_1 = require("react");
const EquationNode_1 = require("../nodes/EquationNode");
exports.INSERT_EQUATION_COMMAND = (0, lexical_1.createCommand)();
function EquationsPlugin() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    (0, react_1.useEffect)(() => {
        if (!editor.hasNodes([EquationNode_1.EquationNode])) {
            throw new Error('EquationsPlugins: EquationsNode not registered on editor');
        }
        return editor.registerCommand(exports.INSERT_EQUATION_COMMAND, (payload) => {
            const { equation, inline } = payload;
            const selection = (0, lexical_1.$getSelection)();
            if ((0, lexical_1.$isRangeSelection)(selection)) {
                const equationNode = (0, EquationNode_1.$createEquationNode)(equation, inline);
                selection.insertNodes([equationNode]);
            }
            return true;
        }, lexical_1.COMMAND_PRIORITY_EDITOR);
    }, [editor]);
    return null;
}
exports.default = EquationsPlugin;
//# sourceMappingURL=EquationsPlugin.js.map