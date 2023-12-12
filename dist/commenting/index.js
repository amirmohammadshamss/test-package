"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommentStore = exports.CommentStore = exports.createThread = exports.createComment = void 0;
const yjs_1 = require("@lexical/yjs");
const lexical_1 = require("lexical");
const react_1 = require("react");
const yjs_2 = require("yjs");
function createUID() {
    return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
}
function createComment(content, author, id, timeStamp) {
    return {
        author,
        content,
        id: id === undefined ? createUID() : id,
        timeStamp: timeStamp === undefined ? performance.now() : timeStamp,
        type: 'comment',
    };
}
exports.createComment = createComment;
function createThread(quote, comments, id) {
    return {
        comments,
        id: id === undefined ? createUID() : id,
        quote,
        type: 'thread',
    };
}
exports.createThread = createThread;
function cloneThread(thread) {
    return {
        comments: Array.from(thread.comments),
        id: thread.id,
        quote: thread.quote,
        type: 'thread',
    };
}
function triggerOnChange(commentStore) {
    const listeners = commentStore._changeListeners;
    for (const listener of listeners) {
        listener();
    }
}
class CommentStore {
    constructor(editor) {
        this._comments = [];
        this._editor = editor;
        this._collabProvider = null;
        this._changeListeners = new Set();
    }
    isCollaborative() {
        return this._collabProvider !== null;
    }
    getComments() {
        return this._comments;
    }
    addComment(commentOrThread, thread, offset) {
        const nextComments = Array.from(this._comments);
        const sharedCommentsArray = this._getCollabComments();
        if (thread !== undefined && commentOrThread.type === 'comment') {
            for (let i = 0; i < nextComments.length; i++) {
                const comment = nextComments[i];
                if (comment.type === 'thread' && comment.id === thread.id) {
                    const newThread = cloneThread(comment);
                    nextComments.splice(i, 1, newThread);
                    const insertOffset = offset || newThread.comments.length;
                    if (this.isCollaborative() && sharedCommentsArray !== null) {
                        const parentSharedArray = sharedCommentsArray
                            .get(i)
                            .get('comments');
                        this._withRemoteTransaction(() => {
                            const sharedMap = this._createCollabSharedMap(commentOrThread);
                            parentSharedArray.insert(insertOffset, [sharedMap]);
                        });
                    }
                    newThread.comments.splice(insertOffset, 0, commentOrThread);
                    break;
                }
            }
        }
        else {
            const insertOffset = offset || nextComments.length;
            if (this.isCollaborative() && sharedCommentsArray !== null) {
                this._withRemoteTransaction(() => {
                    const sharedMap = this._createCollabSharedMap(commentOrThread);
                    sharedCommentsArray.insert(nextComments.length, [sharedMap]);
                });
            }
            nextComments.splice(insertOffset, 0, commentOrThread);
        }
        this._comments = nextComments;
        triggerOnChange(this);
    }
    deleteComment(commentOrThread, thread) {
        const nextComments = Array.from(this._comments);
        const sharedCommentsArray = this._getCollabComments();
        if (thread !== undefined) {
            for (let i = 0; i < nextComments.length; i++) {
                const nextComment = nextComments[i];
                if (nextComment.type === 'thread' && nextComment.id === thread.id) {
                    const newThread = cloneThread(nextComment);
                    nextComments.splice(i, 1, newThread);
                    const threadComments = newThread.comments;
                    if (threadComments.length === 1) {
                        const threadIndex = nextComments.indexOf(newThread);
                        if (this.isCollaborative() && sharedCommentsArray !== null) {
                            this._withRemoteTransaction(() => {
                                sharedCommentsArray.delete(threadIndex);
                            });
                        }
                        nextComments.splice(threadIndex, 1);
                    }
                    else {
                        const index = threadComments.indexOf(commentOrThread);
                        if (this.isCollaborative() && sharedCommentsArray !== null) {
                            const parentSharedArray = sharedCommentsArray
                                .get(i)
                                .get('comments');
                            this._withRemoteTransaction(() => {
                                parentSharedArray.delete(index);
                            });
                        }
                        threadComments.splice(index, 1);
                    }
                    break;
                }
            }
        }
        else {
            const index = nextComments.indexOf(commentOrThread);
            if (this.isCollaborative() && sharedCommentsArray !== null) {
                this._withRemoteTransaction(() => {
                    sharedCommentsArray.delete(index);
                });
            }
            nextComments.splice(index, 1);
        }
        this._comments = nextComments;
        triggerOnChange(this);
    }
    registerOnChange(onChange) {
        const changeListeners = this._changeListeners;
        changeListeners.add(onChange);
        return () => {
            changeListeners.delete(onChange);
        };
    }
    _withRemoteTransaction(fn) {
        const provider = this._collabProvider;
        if (provider !== null) {
            const doc = provider.doc;
            doc.transact(fn, this);
        }
    }
    _withLocalTransaction(fn) {
        const collabProvider = this._collabProvider;
        try {
            this._collabProvider = null;
            fn();
        }
        finally {
            this._collabProvider = collabProvider;
        }
    }
    _getCollabComments() {
        const provider = this._collabProvider;
        if (provider !== null) {
            const doc = provider.doc;
            return doc.get('comments', yjs_2.Array);
        }
        return null;
    }
    _createCollabSharedMap(commentOrThread) {
        const sharedMap = new yjs_2.Map();
        const type = commentOrThread.type;
        const id = commentOrThread.id;
        sharedMap.set('type', type);
        sharedMap.set('id', id);
        if (type === 'comment') {
            sharedMap.set('author', commentOrThread.author);
            sharedMap.set('content', commentOrThread.content);
            sharedMap.set('timeStamp', commentOrThread.timeStamp);
        }
        else {
            sharedMap.set('quote', commentOrThread.quote);
            const commentsArray = new yjs_2.Array();
            commentOrThread.comments.forEach((comment, i) => {
                const sharedChildComment = this._createCollabSharedMap(comment);
                commentsArray.insert(i, [sharedChildComment]);
            });
            sharedMap.set('comments', commentsArray);
        }
        return sharedMap;
    }
    registerCollaboration(provider) {
        this._collabProvider = provider;
        const sharedCommentsArray = this._getCollabComments();
        const connect = () => {
            provider.connect();
        };
        const disconnect = () => {
            try {
                provider.disconnect();
            }
            catch (e) {
            }
        };
        const unsubscribe = this._editor.registerCommand(yjs_1.TOGGLE_CONNECT_COMMAND, (payload) => {
            if (connect !== undefined && disconnect !== undefined) {
                const shouldConnect = payload;
                if (shouldConnect) {
                    console.log('Comments connected!');
                    connect();
                }
                else {
                    console.log('Comments disconnected!');
                    disconnect();
                }
            }
            return true;
        }, lexical_1.COMMAND_PRIORITY_EDITOR);
        const onSharedCommentChanges = (events, transaction) => {
            if (transaction.origin !== this) {
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    if (event instanceof yjs_2.YArrayEvent) {
                        const target = event.target;
                        const deltas = event.delta;
                        let offset = 0;
                        for (let s = 0; s < deltas.length; s++) {
                            const delta = deltas[s];
                            const insert = delta.insert;
                            const retain = delta.retain;
                            const del = delta.delete;
                            const parent = target.parent;
                            const parentThread = target === sharedCommentsArray
                                ? undefined
                                : parent instanceof yjs_2.Map &&
                                    this._comments.find((t) => t.id === parent.get('id'));
                            if (Array.isArray(insert)) {
                                insert.forEach((map) => {
                                    const id = map.get('id');
                                    const type = map.get('type');
                                    const commentOrThread = type === 'thread'
                                        ? createThread(map.get('quote'), map
                                            .get('comments')
                                            .toArray()
                                            .map((innerComment) => createComment(innerComment.get('content'), innerComment.get('author'), innerComment.get('id'), innerComment.get('timeStamp'))), id)
                                        : createComment(map.get('content'), map.get('author'), id, map.get('timeStamp'));
                                    this._withLocalTransaction(() => {
                                        this.addComment(commentOrThread, parentThread, offset);
                                    });
                                });
                            }
                            else if (typeof retain === 'number') {
                                offset += retain;
                            }
                            else if (typeof del === 'number') {
                                for (let d = 0; d < del; d++) {
                                    const commentOrThread = parentThread === undefined || parentThread === false
                                        ? this._comments[offset]
                                        : parentThread.comments[offset];
                                    this._withLocalTransaction(() => {
                                        this.deleteComment(commentOrThread, parentThread);
                                    });
                                    offset++;
                                }
                            }
                        }
                    }
                }
            }
        };
        if (sharedCommentsArray === null) {
            return () => null;
        }
        sharedCommentsArray.observeDeep(onSharedCommentChanges);
        connect();
        return () => {
            sharedCommentsArray.unobserveDeep(onSharedCommentChanges);
            unsubscribe();
            this._collabProvider = null;
        };
    }
}
exports.CommentStore = CommentStore;
function useCommentStore(commentStore) {
    const [comments, setComments] = (0, react_1.useState)(commentStore.getComments());
    (0, react_1.useEffect)(() => {
        return commentStore.registerOnChange(() => {
            setComments(commentStore.getComments());
        });
    }, [commentStore]);
    return comments;
}
exports.useCommentStore = useCommentStore;
//# sourceMappingURL=index.js.map