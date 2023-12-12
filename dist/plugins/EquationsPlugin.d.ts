/// <reference types="react" />
import type { LexicalCommand } from 'lexical';
import 'katex/dist/katex.css';
type CommandPayload = {
    equation: string;
    inline: boolean;
};
export declare const INSERT_EQUATION_COMMAND: LexicalCommand<CommandPayload>;
export default function EquationsPlugin(): JSX.Element | null;
export {};
