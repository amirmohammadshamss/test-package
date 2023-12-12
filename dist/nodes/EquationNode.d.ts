/// <reference types="react" />
import type { EditorConfig, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
export type SerializedEquationNode = Spread<{
    type: 'equation';
    equation: string;
    inline: boolean;
}, SerializedLexicalNode>;
export declare class EquationNode extends DecoratorNode<JSX.Element> {
    __equation: string;
    __inline: boolean;
    static getType(): string;
    static clone(node: EquationNode): EquationNode;
    constructor(equation: string, inline?: boolean, key?: NodeKey);
    static importJSON(serializedNode: SerializedEquationNode): EquationNode;
    exportJSON(): SerializedEquationNode;
    createDOM(_config: EditorConfig): HTMLElement;
    updateDOM(prevNode: EquationNode): boolean;
    getEquation(): string;
    setEquation(equation: string): void;
    decorate(): JSX.Element;
}
export declare function $createEquationNode(equation?: string, inline?: boolean): EquationNode;
export declare function $isEquationNode(node: LexicalNode | null | undefined): node is EquationNode;
