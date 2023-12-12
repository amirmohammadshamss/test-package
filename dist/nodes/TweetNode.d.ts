/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
export type SerializedTweetNode = Spread<{
    id: string;
    type: 'tweet';
    version: 1;
}, SerializedDecoratorBlockNode>;
export declare class TweetNode extends DecoratorBlockNode {
    __id: string;
    static getType(): string;
    static clone(node: TweetNode): TweetNode;
    static importJSON(serializedNode: SerializedTweetNode): TweetNode;
    exportJSON(): SerializedTweetNode;
    static importDOM(): DOMConversionMap<HTMLDivElement> | null;
    exportDOM(): DOMExportOutput;
    constructor(id: string, format?: ElementFormatType, key?: NodeKey);
    getId(): string;
    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element;
    isTopLevel(): true;
}
export declare function $createTweetNode(tweetID: string): TweetNode;
export declare function $isTweetNode(node: TweetNode | LexicalNode | null | undefined): node is TweetNode;
