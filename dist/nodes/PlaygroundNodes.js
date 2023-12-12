"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("@lexical/code");
const hashtag_1 = require("@lexical/hashtag");
const link_1 = require("@lexical/link");
const list_1 = require("@lexical/list");
const mark_1 = require("@lexical/mark");
const overflow_1 = require("@lexical/overflow");
const LexicalHorizontalRuleNode_1 = require("@lexical/react/LexicalHorizontalRuleNode");
const rich_text_1 = require("@lexical/rich-text");
const table_1 = require("@lexical/table");
const AutocompleteNode_1 = require("./AutocompleteNode");
const EmojiNode_1 = require("./EmojiNode");
const EquationNode_1 = require("./EquationNode");
const ExcalidrawNode_1 = require("./ExcalidrawNode");
const ImageNode_1 = require("./ImageNode");
const KeywordNode_1 = require("./KeywordNode");
const MentionNode_1 = require("./MentionNode");
const PollNode_1 = require("./PollNode");
const StickyNode_1 = require("./StickyNode");
const TweetNode_1 = require("./TweetNode");
const TypeaheadNode_1 = require("./TypeaheadNode");
const YouTubeNode_1 = require("./YouTubeNode");
const PlaygroundNodes = [
    rich_text_1.HeadingNode,
    list_1.ListNode,
    list_1.ListItemNode,
    rich_text_1.QuoteNode,
    code_1.CodeNode,
    table_1.TableNode,
    table_1.TableCellNode,
    table_1.TableRowNode,
    hashtag_1.HashtagNode,
    code_1.CodeHighlightNode,
    link_1.AutoLinkNode,
    link_1.LinkNode,
    overflow_1.OverflowNode,
    PollNode_1.PollNode,
    StickyNode_1.StickyNode,
    ImageNode_1.ImageNode,
    MentionNode_1.MentionNode,
    EmojiNode_1.EmojiNode,
    ExcalidrawNode_1.ExcalidrawNode,
    EquationNode_1.EquationNode,
    AutocompleteNode_1.AutocompleteNode,
    TypeaheadNode_1.TypeaheadNode,
    KeywordNode_1.KeywordNode,
    LexicalHorizontalRuleNode_1.HorizontalRuleNode,
    TweetNode_1.TweetNode,
    YouTubeNode_1.YouTubeNode,
    mark_1.MarkNode,
];
exports.default = PlaygroundNodes;
//# sourceMappingURL=PlaygroundNodes.js.map