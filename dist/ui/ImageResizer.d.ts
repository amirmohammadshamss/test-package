/// <reference types="react" />
import type { LexicalEditor } from 'lexical';
export default function ImageResizer({ onResizeStart, onResizeEnd, imageRef, maxWidth, editor, showCaption, setShowCaption, }: {
    editor: LexicalEditor;
    imageRef: {
        current: null | HTMLElement;
    };
    maxWidth?: number;
    onResizeEnd: (width: 'inherit' | number, height: 'inherit' | number) => void;
    onResizeStart: () => void;
    setShowCaption: (show: boolean) => void;
    showCaption: boolean;
}): JSX.Element;
