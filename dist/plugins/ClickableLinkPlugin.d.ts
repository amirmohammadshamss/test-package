/// <reference types="react" />
import type { LinkNode } from '@lexical/link';
type LinkFilter = (event: MouseEvent, linkNode: LinkNode) => boolean;
export default function ClickableLinkPlugin({ filter, newTab, }: {
    filter?: LinkFilter;
    newTab?: boolean;
}): JSX.Element | null;
export {};
