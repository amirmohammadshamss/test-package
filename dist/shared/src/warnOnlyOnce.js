"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function warnOnlyOnce(message) {
    let run = false;
    return () => {
        if (!run) {
            console.warn(message);
        }
        run = true;
    };
}
exports.default = warnOnlyOnce;
//# sourceMappingURL=warnOnlyOnce.js.map