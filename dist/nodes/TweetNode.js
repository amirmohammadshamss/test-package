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
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isTweetNode = exports.$createTweetNode = exports.TweetNode = void 0;
const LexicalBlockWithAlignableContents_1 = require("@lexical/react/LexicalBlockWithAlignableContents");
const LexicalDecoratorBlockNode_1 = require("@lexical/react/LexicalDecoratorBlockNode");
const React = __importStar(require("react"));
const react_1 = require("react");
const WIDGET_SCRIPT_URL = 'https://platform.twitter.com/widgets.js';
const getHasScriptCached = () => document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
function convertTweetElement(domNode) {
    const id = domNode.getAttribute('data-lexical-tweet-id');
    if (id) {
        const node = $createTweetNode(id);
        return { node };
    }
    return null;
}
function TweetComponent({ className, format, loadingComponent, nodeKey, onError, onLoad, tweetID, }) {
    const containerRef = (0, react_1.useRef)(null);
    const previousTweetIDRef = (0, react_1.useRef)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const createTweet = (0, react_1.useCallback)(async () => {
        try {
            await window.twttr.widgets.createTweet(tweetID, containerRef.current);
            setIsLoading(false);
            if (onLoad) {
                onLoad();
            }
        }
        catch (error) {
            if (onError) {
                onError(String(error));
            }
        }
    }, [onError, onLoad, tweetID]);
    (0, react_1.useEffect)(() => {
        if (tweetID !== previousTweetIDRef.current) {
            setIsLoading(true);
            if (!getHasScriptCached()) {
                const script = document.createElement('script');
                script.src = WIDGET_SCRIPT_URL;
                script.async = true;
                document.body?.appendChild(script);
                script.onload = createTweet;
                if (onError) {
                    script.onerror = onError;
                }
            }
            else {
                createTweet();
            }
            if (previousTweetIDRef) {
                previousTweetIDRef.current = tweetID;
            }
        }
    }, [createTweet, onError, tweetID]);
    return (React.createElement(LexicalBlockWithAlignableContents_1.BlockWithAlignableContents, { className: className, format: format, nodeKey: nodeKey },
        isLoading ? loadingComponent : null,
        React.createElement("div", { style: { display: 'inline-block', width: '550px' }, ref: containerRef })));
}
class TweetNode extends LexicalDecoratorBlockNode_1.DecoratorBlockNode {
    static getType() {
        return 'tweet';
    }
    static clone(node) {
        return new TweetNode(node.__id, node.__format, node.__key);
    }
    static importJSON(serializedNode) {
        const node = $createTweetNode(serializedNode.id);
        node.setFormat(serializedNode.format);
        return node;
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            id: this.getId(),
            type: 'tweet',
            version: 1,
        };
    }
    static importDOM() {
        return {
            div: (domNode) => {
                if (!domNode.hasAttribute('data-lexical-tweet-id')) {
                    return null;
                }
                return {
                    conversion: convertTweetElement,
                    priority: 2,
                };
            },
        };
    }
    exportDOM() {
        const element = document.createElement('div');
        element.setAttribute('data-lexical-tweet-id', this.__id);
        return { element };
    }
    constructor(id, format, key) {
        super(format, key);
        this.__id = id;
    }
    getId() {
        return this.__id;
    }
    decorate(editor, config) {
        const embedBlockTheme = config.theme.embedBlock || {};
        const className = {
            base: embedBlockTheme.base || '',
            focus: embedBlockTheme.focus || '',
        };
        return (React.createElement(TweetComponent, { className: className, format: this.__format, loadingComponent: "Loading...", nodeKey: this.getKey(), tweetID: this.__id }));
    }
    isTopLevel() {
        return true;
    }
}
exports.TweetNode = TweetNode;
function $createTweetNode(tweetID) {
    return new TweetNode(tweetID);
}
exports.$createTweetNode = $createTweetNode;
function $isTweetNode(node) {
    return node instanceof TweetNode;
}
exports.$isTweetNode = $isTweetNode;
//# sourceMappingURL=TweetNode.js.map