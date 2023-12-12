import type { EditorConfig, LexicalNode, SerializedTextNode, Spread } from 'lexical';
import { TextNode } from 'lexical';
export type SerializedKeywordNode = Spread<{
    type: 'keyword';
    version: 1;
}, SerializedTextNode>;
export declare class KeywordNode extends TextNode {
    static getType(): string;
    static clone(node: KeywordNode): KeywordNode;
    static importJSON(serializedNode: SerializedKeywordNode): KeywordNode;
    exportJSON(): SerializedKeywordNode;
    createDOM(config: EditorConfig): HTMLElement;
    canInsertTextBefore(): boolean;
    canInsertTextAfter(): boolean;
    isTextEntity(): true;
}
export declare function $createKeywordNode(keyword: string): KeywordNode;
export declare function $isKeywordNode(node: LexicalNode | null | undefined | undefined): boolean;
