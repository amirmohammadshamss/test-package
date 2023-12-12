import './ExcalidrawModal.css';
import { ReactPortal } from 'react';
export type ExcalidrawElementFragment = {
    isDeleted?: boolean;
};
type Props = {
    closeOnClickOutside?: boolean;
    initialElements: ReadonlyArray<ExcalidrawElementFragment>;
    isShown?: boolean;
    onDelete: () => void;
    onHide: () => void;
    onSave: (elements: ReadonlyArray<ExcalidrawElementFragment>) => void;
};
export default function ExcalidrawModal({ closeOnClickOutside, onSave, initialElements, isShown, onHide, onDelete, }: Props): ReactPortal | null;
export {};
