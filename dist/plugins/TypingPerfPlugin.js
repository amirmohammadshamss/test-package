"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useReport_1 = __importDefault(require("../hooks/useReport"));
const validInputTypes = new Set([
    'insertText',
    'insertCompositionText',
    'insertFromComposition',
    'insertLineBreak',
    'insertParagraph',
    'deleteCompositionText',
    'deleteContentBackward',
    'deleteByComposition',
    'deleteContent',
    'deleteContentForward',
    'deleteWordBackward',
    'deleteWordForward',
    'deleteHardLineBackward',
    'deleteSoftLineBackward',
    'deleteHardLineForward',
    'deleteSoftLineForward',
]);
function TypingPerfPlugin() {
    const report = (0, useReport_1.default)();
    (0, react_1.useEffect)(() => {
        let start = 0;
        let timerId;
        let keyPressTimerId;
        let log = [];
        let invalidatingEvent = false;
        const measureEventEnd = function logKeyPress() {
            if (keyPressTimerId != null) {
                if (invalidatingEvent) {
                    invalidatingEvent = false;
                }
                else {
                    log.push(performance.now() - start);
                }
                clearTimeout(keyPressTimerId);
                keyPressTimerId = null;
            }
        };
        const measureEventStart = function measureEvent() {
            if (timerId != null) {
                clearTimeout(timerId);
                timerId = null;
            }
            keyPressTimerId = window.setTimeout(measureEventEnd, 0);
            timerId = setTimeout(() => {
                const total = log.reduce((a, b) => a + b, 0);
                const reportedText = 'Typing Perf: ' + Math.round((total / log.length) * 100) / 100 + 'ms';
                report(reportedText);
                log = [];
            }, 2000);
            start = performance.now();
        };
        const beforeInputHandler = function beforeInputHandler(event) {
            if (!validInputTypes.has(event.inputType) || invalidatingEvent) {
                invalidatingEvent = false;
                return;
            }
            measureEventStart();
        };
        const keyDownHandler = function keyDownHandler(event) {
            const keyCode = event.keyCode;
            if (keyCode === 8 || keyCode === 13) {
                measureEventStart();
            }
        };
        const pasteHandler = function pasteHandler() {
            invalidatingEvent = true;
        };
        const cutHandler = function cutHandler() {
            invalidatingEvent = true;
        };
        window.addEventListener('keydown', keyDownHandler, true);
        window.addEventListener('selectionchange', measureEventEnd, true);
        window.addEventListener('beforeinput', beforeInputHandler, true);
        window.addEventListener('paste', pasteHandler, true);
        window.addEventListener('cut', cutHandler, true);
        return () => {
            window.removeEventListener('keydown', keyDownHandler, true);
            window.removeEventListener('selectionchange', measureEventEnd, true);
            window.removeEventListener('beforeinput', beforeInputHandler, true);
            window.removeEventListener('paste', pasteHandler, true);
            window.removeEventListener('cut', cutHandler, true);
        };
    }, [report]);
    return null;
}
exports.default = TypingPerfPlugin;
//# sourceMappingURL=TypingPerfPlugin.js.map