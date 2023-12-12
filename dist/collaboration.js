"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebsocketProvider = void 0;
const y_websocket_1 = require("y-websocket");
const yjs_1 = require("yjs");
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const WEBSOCKET_ENDPOINT = params.get('collabEndpoint') || 'ws://localhost:1234';
const WEBSOCKET_SLUG = 'playground';
const WEBSOCKET_ID = params.get('collabId') || '0';
function createWebsocketProvider(id, yjsDocMap) {
    let doc = yjsDocMap.get(id);
    if (doc === undefined) {
        doc = new yjs_1.Doc();
        yjsDocMap.set(id, doc);
    }
    else {
        doc.load();
    }
    return new y_websocket_1.WebsocketProvider(WEBSOCKET_ENDPOINT, WEBSOCKET_SLUG + '/' + WEBSOCKET_ID + '/' + id, doc, {
        connect: false,
    });
}
exports.createWebsocketProvider = createWebsocketProvider;
//# sourceMappingURL=collaboration.js.map