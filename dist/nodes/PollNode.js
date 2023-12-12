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
exports.$isPollNode = exports.$createPollNode = exports.PollNode = void 0;
require("./PollNode.css");
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const useLexicalNodeSelection_1 = require("@lexical/react/useLexicalNodeSelection");
const utils_1 = require("@lexical/utils");
const lexical_1 = require("lexical");
const React = __importStar(require("react"));
const react_1 = require("react");
const Button_1 = __importDefault(require("../ui/Button"));
const join_classes_1 = __importDefault(require("../utils/join-classes"));
function createUID() {
    return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
}
function createPollOption(text = '') {
    return {
        text,
        uid: createUID(),
        votes: [],
    };
}
function cloneOption(option, text, votes) {
    return {
        text,
        uid: option.uid,
        votes: votes || Array.from(option.votes),
    };
}
function getTotalVotes(options) {
    return options.reduce((totalVotes, next) => {
        return totalVotes + next.votes.length;
    }, 0);
}
function PollOptionComponent({ option, index, options, totalVotes, withPollNode, }) {
    const checkboxRef = (0, react_1.useRef)(null);
    const votesArray = option.votes;
    const votes = votesArray.length;
    const text = option.text;
    return (React.createElement("div", { className: "PollNode__optionContainer" },
        React.createElement("div", { className: (0, join_classes_1.default)('PollNode__optionCheckboxWrapper') }),
        React.createElement("div", { className: "PollNode__optionInputWrapper" },
            React.createElement("div", { className: "PollNode__optionInputVotes", style: { width: `${votes === 0 ? 0 : (votes / totalVotes) * 100}%` } }),
            React.createElement("span", { className: "PollNode__optionInputVotesCount" }, votes > 0 && (votes === 1 ? '1 vote' : `${votes} votes`)),
            React.createElement("input", { className: "PollNode__optionInput", type: "text", value: text, onChange: (e) => {
                    withPollNode((node) => {
                        node.setOptionText(option, e.target.value);
                    });
                }, placeholder: `Option ${index + 1}` })),
        React.createElement("button", { disabled: options.length < 3, className: (0, join_classes_1.default)('PollNode__optionDelete', options.length < 3 && 'PollNode__optionDeleteDisabled'), "arial-label": "Remove", onClick: () => {
                withPollNode((node) => {
                    node.deleteOption(option);
                });
            } })));
}
function PollComponent({ question, options, nodeKey, }) {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    const totalVotes = (0, react_1.useMemo)(() => getTotalVotes(options), [options]);
    const [isSelected, setSelected, clearSelection] = (0, useLexicalNodeSelection_1.useLexicalNodeSelection)(nodeKey);
    const [selection, setSelection] = (0, react_1.useState)(null);
    const ref = (0, react_1.useRef)(null);
    const onDelete = (0, react_1.useCallback)((payload) => {
        if (isSelected && (0, lexical_1.$isNodeSelection)((0, lexical_1.$getSelection)())) {
            const event = payload;
            event.preventDefault();
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isPollNode(node)) {
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
            if (event.target === ref.current) {
                if (!event.shiftKey) {
                    clearSelection();
                }
                setSelected(!isSelected);
                return true;
            }
            return false;
        }, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_DELETE_COMMAND, onDelete, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_BACKSPACE_COMMAND, onDelete, lexical_1.COMMAND_PRIORITY_LOW));
    }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);
    const withPollNode = (cb) => {
        editor.update(() => {
            const node = (0, lexical_1.$getNodeByKey)(nodeKey);
            if ($isPollNode(node)) {
                cb(node);
            }
        });
    };
    const addOption = () => {
        withPollNode((node) => {
            node.addOption(createPollOption());
        });
    };
    const isFocused = (0, lexical_1.$isNodeSelection)(selection) && isSelected;
    return (React.createElement("div", { className: `PollNode__container ${isFocused ? 'focused' : ''}`, ref: ref },
        React.createElement("div", { className: "PollNode__inner" },
            React.createElement("h2", { className: "PollNode__heading" }, question),
            options.map((option, index) => {
                const key = option.uid;
                return (React.createElement(PollOptionComponent, { key: key, withPollNode: withPollNode, option: option, index: index, options: options, totalVotes: totalVotes }));
            }),
            React.createElement("div", { className: "PollNode__footer" },
                React.createElement(Button_1.default, { onClick: addOption, small: true }, "Add Option")))));
}
function convertPollElement(domNode) {
    const question = domNode.getAttribute('data-lexical-poll-question');
    if (question !== null) {
        const node = $createPollNode(question);
        return { node };
    }
    return null;
}
class PollNode extends lexical_1.DecoratorNode {
    static getType() {
        return 'poll';
    }
    static clone(node) {
        return new PollNode(node.__question, node.__options, node.__key);
    }
    static importJSON(serializedNode) {
        const node = $createPollNode(serializedNode.question);
        serializedNode.options.forEach(node.addOption);
        return node;
    }
    constructor(question, options, key) {
        super(key);
        this.__question = question;
        this.__options = options || [createPollOption(), createPollOption()];
    }
    exportJSON() {
        return {
            options: this.__options,
            question: this.__question,
            type: 'poll',
            version: 1,
        };
    }
    addOption(option) {
        const self = this.getWritable();
        const options = Array.from(self.__options);
        options.push(option);
        self.__options = options;
    }
    deleteOption(option) {
        const self = this.getWritable();
        const options = Array.from(self.__options);
        const index = options.indexOf(option);
        options.splice(index, 1);
        self.__options = options;
    }
    setOptionText(option, text) {
        const self = this.getWritable();
        const clonedOption = cloneOption(option, text);
        const options = Array.from(self.__options);
        const index = options.indexOf(option);
        options[index] = clonedOption;
        self.__options = options;
    }
    toggleVote(option, clientID) {
        const self = this.getWritable();
        const votes = option.votes;
        const votesClone = Array.from(votes);
        const voteIndex = votes.indexOf(clientID);
        if (voteIndex === -1) {
            votesClone.push(clientID);
        }
        else {
            votesClone.splice(voteIndex, 1);
        }
        const clonedOption = cloneOption(option, option.text, votesClone);
        const options = Array.from(self.__options);
        const index = options.indexOf(option);
        options[index] = clonedOption;
        self.__options = options;
    }
    static importDOM() {
        return {
            span: (domNode) => {
                if (!domNode.hasAttribute('data-lexical-poll-question')) {
                    return null;
                }
                return {
                    conversion: convertPollElement,
                    priority: 2,
                };
            },
        };
    }
    exportDOM() {
        const element = document.createElement('span');
        element.setAttribute('data-lexical-poll-question', this.__question);
        return { element };
    }
    createDOM() {
        const elem = document.createElement('span');
        elem.style.display = 'inline-block';
        return elem;
    }
    updateDOM() {
        return false;
    }
    decorate() {
        return (React.createElement(PollComponent, { question: this.__question, options: this.__options, nodeKey: this.__key }));
    }
}
exports.PollNode = PollNode;
function $createPollNode(question) {
    return new PollNode(question);
}
exports.$createPollNode = $createPollNode;
function $isPollNode(node) {
    return node instanceof PollNode;
}
exports.$isPollNode = $isPollNode;
//# sourceMappingURL=PollNode.js.map