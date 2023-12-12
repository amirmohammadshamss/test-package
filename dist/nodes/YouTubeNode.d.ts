/// <reference types="react" />
import type { EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
export type SerializedYouTubeNode = Spread<{
    videoID: string;
    type: 'youtube';
    version: 1;
}, SerializedDecoratorBlockNode>;
export declare class YouTubeNode extends DecoratorBlockNode {
    __id: string;
    static getType(): string;
    static clone(node: YouTubeNode): YouTubeNode;
    static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode;
    exportJSON(): SerializedYouTubeNode;
    constructor(id: string, format?: ElementFormatType, key?: NodeKey);
    updateDOM(): false;
    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element;
    isTopLevel(): true;
}
export declare function $createYouTubeNode(videoID: string): YouTubeNode;
export declare function $isYouTubeNode(node: YouTubeNode | LexicalNode | null | undefined): node is YouTubeNode;
