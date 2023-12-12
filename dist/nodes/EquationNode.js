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
exports.$isEquationNode = exports.$createEquationNode = exports.EquationNode = void 0;
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const utils_1 = require("@lexical/utils");
const lexical_1 = require("lexical");
const React = __importStar(require("react"));
const react_1 = require("react");
const EquationEditor_1 = __importDefault(require("../ui/EquationEditor"));
const KatexRenderer_1 = __importDefault(require("../ui/KatexRenderer"));
function EquationComponent({ equation, inline, nodeKey, }) {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    const [equationValue, setEquationValue] = (0, react_1.useState)(equation);
    const [showEquationEditor, setShowEquationEditor] = (0, react_1.useState)(false);
    const inputRef = (0, react_1.useRef)(null);
    const onHide = (0, react_1.useCallback)((restoreSelection) => {
        setShowEquationEditor(false);
        editor.update(() => {
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isEquationNode(node)) {
                node.setEquation(equationValue);
                if (restoreSelection) {
                    node.selectNext(0, 0);
                }
            }
        });
    }, [editor, equationValue, nodeKey]);
    (0, react_1.useEffect)(() => {
        if (showEquationEditor) {
            return (0, utils_1.mergeRegister)(editor.registerCommand(lexical_1.SELECTION_CHANGE_COMMAND, (payload) => {
                const activeElement = document.activeElement;
                const inputElem = inputRef.current;
                if (inputElem !== activeElement) {
                    onHide();
                }
                return false;
            }, lexical_1.COMMAND_PRIORITY_HIGH), editor.registerCommand(lexical_1.KEY_ESCAPE_COMMAND, (payload) => {
                const activeElement = document.activeElement;
                const inputElem = inputRef.current;
                if (inputElem === activeElement) {
                    onHide(true);
                    return true;
                }
                return false;
            }, lexical_1.COMMAND_PRIORITY_HIGH));
        }
    }, [editor, onHide, showEquationEditor]);
    return (React.createElement(React.Fragment, null, showEquationEditor ? (React.createElement(EquationEditor_1.default, { equation: equationValue, setEquation: setEquationValue, inline: inline, inputRef: inputRef })) : (React.createElement(KatexRenderer_1.default, { equation: equationValue, inline: inline, onClick: () => {
            setShowEquationEditor(true);
        } }))));
}
class EquationNode extends lexical_1.DecoratorNode {
    static getType() {
        return 'equation';
    }
    static clone(node) {
        return new EquationNode(node.__equation, node.__inline, node.__key);
    }
    constructor(equation, inline, key) {
        super(key);
        this.__equation = equation;
        this.__inline = inline ?? false;
    }
    static importJSON(serializedNode) {
        const node = $createEquationNode(serializedNode.equation, serializedNode.inline);
        return node;
    }
    exportJSON() {
        return {
            equation: this.getEquation(),
            inline: this.__inline,
            type: 'equation',
            version: 1,
        };
    }
    createDOM(_config) {
        return document.createElement(this.__inline ? 'span' : 'div');
    }
    updateDOM(prevNode) {
        return this.__inline !== prevNode.__inline;
    }
    getEquation() {
        return this.__equation;
    }
    setEquation(equation) {
        const writable = this.getWritable();
        writable.__equation = equation;
    }
    decorate() {
        return (React.createElement(EquationComponent, { equation: this.__equation, inline: this.__inline, nodeKey: this.__key }));
    }
}
exports.EquationNode = EquationNode;
function $createEquationNode(equation = '', inline = false) {
    const equationNode = new EquationNode(equation, inline);
    return equationNode;
}
exports.$createEquationNode = $createEquationNode;
function $isEquationNode(node) {
    return node instanceof EquationNode;
}
exports.$isEquationNode = $isEquationNode;
//# sourceMappingURL=EquationNode.js.map