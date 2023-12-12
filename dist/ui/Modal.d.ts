import './Modal.css';
import { ReactNode } from 'react';
export default function Modal({ onClose, children, title, closeOnClickOutside, }: {
    children: ReactNode;
    closeOnClickOutside?: boolean;
    onClose: () => void;
    title: string;
}): JSX.Element;
