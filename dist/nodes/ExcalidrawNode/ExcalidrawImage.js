"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const excalidraw_1 = require("@excalidraw/excalidraw");
const React = __importStar(require("react"));
const react_1 = require("react");
const removeStyleFromSvg_HACK = (svg) => {
    const styleTag = svg?.firstElementChild?.firstElementChild;
    const viewBox = svg.getAttribute('viewBox');
    if (viewBox != null) {
        const viewBoxDimensions = viewBox.split(' ');
        svg.setAttribute('width', viewBoxDimensions[2]);
        svg.setAttribute('height', viewBoxDimensions[3]);
    }
    if (styleTag && styleTag.tagName === 'style') {
        styleTag.remove();
    }
};
function ExcalidrawImage({ elements, imageContainerRef, appState = null, rootClassName = null, }) {
    const [Svg, setSvg] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const setContent = async () => {
            if (appState === null) {
                return;
            }
            const svg = await (0, excalidraw_1.exportToSvg)({
                appState,
                elements,
                files: null,
            });
            removeStyleFromSvg_HACK(svg);
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('display', 'block');
            setSvg(svg);
        };
        setContent();
    }, [elements, appState]);
    return (React.createElement("div", { ref: imageContainerRef, className: rootClassName ?? '', dangerouslySetInnerHTML: { __html: Svg?.outerHTML ?? '' } }));
}
exports.default = ExcalidrawImage;
//# sourceMappingURL=ExcalidrawImage.js.map