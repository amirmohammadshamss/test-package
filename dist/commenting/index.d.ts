import type { LexicalEditor } from 'lexical';
import { WebsocketProvider } from 'y-websocket';
import { Array as YArray, Map as YMap } from 'yjs';
export type Comment = {
    author: string;
    content: string;
    id: string;
    timeStamp: number;
    type: 'comment';
};
export type Thread = {
    comments: Array<Comment>;
    id: string;
    quote: string;
    type: 'thread';
};
export type Comments = Array<Thread | Comment>;
export declare function createComment(content: string, author: string, id?: string, timeStamp?: number): Comment;
export declare function createThread(quote: string, comments: Array<Comment>, id?: string): Thread;
export declare class CommentStore {
    _editor: LexicalEditor;
    _comments: Comments;
    _changeListeners: Set<() => void>;
    _collabProvider: null | WebsocketProvider;
    constructor(editor: LexicalEditor);
    isCollaborative(): boolean;
    getComments(): Comments;
    addComment(commentOrThread: Comment | Thread, thread?: Thread, offset?: number): void;
    deleteComment(commentOrThread: Comment | Thread, thread?: Thread): void;
    registerOnChange(onChange: () => void): () => void;
    _withRemoteTransaction(fn: () => void): void;
    _withLocalTransaction(fn: () => void): void;
    _getCollabComments(): null | YArray<any>;
    _createCollabSharedMap(commentOrThread: Comment | Thread): YMap<any>;
    registerCollaboration(provider: WebsocketProvider): () => void;
}
export declare function useCommentStore(commentStore: CommentStore): Comments;
