/// <reference types="react" />
import { ExcalidrawElement, NonDeleted } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';
type ImageType = 'svg' | 'canvas';
type Props = {
    appState?: Partial<Omit<AppState, 'offsetTop' | 'offsetLeft'>> | null;
    className?: string;
    elements: NonDeleted<ExcalidrawElement>[];
    height?: number | null;
    imageContainerRef: {
        current: null | HTMLDivElement;
    };
    imageType?: ImageType;
    rootClassName?: string | null;
    width?: number | null;
};
export default function ExcalidrawImage({ elements, imageContainerRef, appState, rootClassName, }: Props): JSX.Element;
export {};
