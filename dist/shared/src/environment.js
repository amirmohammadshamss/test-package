"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_IOS = exports.IS_SAFARI = exports.CAN_USE_BEFORE_INPUT = exports.IS_FIREFOX = exports.IS_APPLE = exports.CAN_USE_DOM = void 0;
exports.CAN_USE_DOM = typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined';
const documentMode = exports.CAN_USE_DOM && 'documentMode' in document ? document.documentMode : null;
exports.IS_APPLE = exports.CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
exports.IS_FIREFOX = exports.CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
exports.CAN_USE_BEFORE_INPUT = exports.CAN_USE_DOM && 'InputEvent' in window && !documentMode
    ? 'getTargetRanges' in new window.InputEvent('input')
    : false;
exports.IS_SAFARI = exports.CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
exports.IS_IOS = exports.CAN_USE_DOM &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream;
//# sourceMappingURL=environment.js.map