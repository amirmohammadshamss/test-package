/// <reference types="react" />
export default function KatexRenderer({ equation, inline, onClick, }: Readonly<{
    equation: string;
    inline: boolean;
    onClick: () => void;
}>): JSX.Element;
