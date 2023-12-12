import { ReactNode } from 'react';
type Suggestion = null | string;
type PublishFn = (newSuggestion: Suggestion) => void;
type HookShape = [suggestion: Suggestion, setSuggestion: PublishFn];
export declare const SharedAutocompleteContext: ({ children, }: {
    children: ReactNode;
}) => JSX.Element;
export declare const useSharedAutocompleteContext: () => HookShape;
export {};
