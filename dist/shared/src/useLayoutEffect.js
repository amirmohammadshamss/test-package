"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const canUseDOM_1 = require("../../shared/src/canUseDOM");
const useLayoutEffectImpl = canUseDOM_1.CAN_USE_DOM
    ? react_1.useLayoutEffect
    : react_1.useEffect;
exports.default = useLayoutEffectImpl;
//# sourceMappingURL=useLayoutEffect.js.map