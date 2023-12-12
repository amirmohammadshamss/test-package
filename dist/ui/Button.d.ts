import './Button.css';
import { ReactNode } from 'react';
export default function Button({ 'data-test-id': dataTestId, children, className, onClick, disabled, small, title, }: {
    'data-test-id'?: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick: () => void;
    small?: boolean;
    title?: string;
}): JSX.Element;
