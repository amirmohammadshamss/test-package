/// <reference types="react" />
import type { Spread } from 'lexical';
import { DecoratorNode, EditorConfig, NodeKey, SerializedLexicalNode } from 'lexical';
export type SerializedAutocompleteNode = Spread<{
    type: 'autocomplete';
    version: 1;
    uuid: string;
}, SerializedLexicalNode>;
export declare class AutocompleteNode extends DecoratorNode<JSX.Element | null> {
    __uuid: string;
    static clone(node: AutocompleteNode): AutocompleteNode;
    static getType(): 'autocomplete';
    static importJSON(serializedNode: SerializedAutocompleteNode): AutocompleteNode;
    exportJSON(): SerializedAutocompleteNode;
    constructor(uuid: string, key?: NodeKey);
    updateDOM(prevNode: unknown, dom: HTMLElement, config: EditorConfig): boolean;
    createDOM(config: EditorConfig): HTMLElement;
    decorate(): JSX.Element | null;
}
export declare function $createAutocompleteNode(uuid: string): AutocompleteNode;
