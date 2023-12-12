import type { Spread } from 'lexical';
import { EditorConfig, SerializedTextNode, TextNode } from 'lexical';
export type SerializedTypeaheadNode = Spread<{
    type: 'typeahead';
    version: 1;
}, SerializedTextNode>;
export declare class TypeaheadNode extends TextNode {
    static clone(node: TypeaheadNode): TypeaheadNode;
    static getType(): 'typeahead';
    static importJSON(serializedNode: SerializedTypeaheadNode): TypeaheadNode;
    exportJSON(): SerializedTypeaheadNode;
    createDOM(config: EditorConfig): HTMLElement;
}
export declare function $createTypeaheadNode(text: string): TypeaheadNode;
