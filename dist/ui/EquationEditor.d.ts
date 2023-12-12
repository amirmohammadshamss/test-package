/// <reference types="react" />
import './EquationEditor.css';
type BaseEquationEditorProps = {
    equation: string;
    inline: boolean;
    inputRef: {
        current: null | HTMLInputElement | HTMLTextAreaElement;
    };
    setEquation: (equation: string) => void;
};
export default function EquationEditor({ equation, setEquation, inline, inputRef, }: BaseEquationEditorProps): JSX.Element;
export {};
