/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
export type SerializedExcalidrawNode = Spread<{
    data: string;
    type: 'excalidraw';
    version: 1;
}, SerializedLexicalNode>;
export declare class ExcalidrawNode extends DecoratorNode<JSX.Element> {
    __data: string;
    static getType(): string;
    static clone(node: ExcalidrawNode): ExcalidrawNode;
    static importJSON(serializedNode: SerializedExcalidrawNode): ExcalidrawNode;
    exportJSON(): SerializedExcalidrawNode;
    constructor(data?: string, key?: NodeKey);
    createDOM(config: EditorConfig): HTMLElement;
    updateDOM(): false;
    static importDOM(): DOMConversionMap<HTMLSpanElement> | null;
    exportDOM(editor: LexicalEditor): DOMExportOutput;
    setData(data: string): void;
    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element;
}
export declare function $createExcalidrawNode(): ExcalidrawNode;
export declare function $isExcalidrawNode(node: LexicalNode | null): node is ExcalidrawNode;
