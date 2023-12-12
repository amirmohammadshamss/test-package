/// <reference types="react" />
import type { LexicalCommand } from 'lexical';
import { ImagePayload } from '../nodes/ImageNode';
export type InsertImagePayload = Readonly<ImagePayload>;
export declare const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload>;
export default function ImagesPlugin(): JSX.Element | null;
declare global {
    interface DragEvent {
        rangeOffset?: number;
        rangeParent?: Node;
    }
}
