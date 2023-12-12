import type { Spread } from 'lexical';
import { DOMConversionMap, DOMExportOutput, EditorConfig, LexicalNode, NodeKey, SerializedTextNode, TextNode } from 'lexical';
export type SerializedMentionNode = Spread<{
    mentionName: string;
    type: 'mention';
    version: 1;
}, SerializedTextNode>;
export declare class MentionNode extends TextNode {
    __mention: string;
    static getType(): string;
    static clone(node: MentionNode): MentionNode;
    static importJSON(serializedNode: SerializedMentionNode): MentionNode;
    constructor(mentionName: string, text?: string, key?: NodeKey);
    exportJSON(): SerializedMentionNode;
    createDOM(config: EditorConfig): HTMLElement;
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    isTextEntity(): true;
}
export declare function $createMentionNode(mentionName: string): MentionNode;
export declare function $isMentionNode(node: LexicalNode | null | undefined): node is MentionNode;
