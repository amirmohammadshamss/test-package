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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./ExcalidrawModal.css");
const React = __importStar(require("react"));
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const Button_1 = __importDefault(require("../../ui/Button"));
const Modal_1 = __importDefault(require("../../ui/Modal"));
function ExcalidrawModal({ closeOnClickOutside = false, onSave, initialElements, isShown = false, onHide, onDelete, }) {
    const excaliDrawModelRef = (0, react_1.useRef)(null);
    const [discardModalOpen, setDiscardModalOpen] = (0, react_1.useState)(false);
    const [elements, setElements] = (0, react_1.useState)(initialElements);
    (0, react_1.useEffect)(() => {
        if (excaliDrawModelRef.current !== null) {
            excaliDrawModelRef.current.focus();
        }
    }, []);
    (0, react_1.useEffect)(() => {
        let modalOverlayElement = null;
        const clickOutsideHandler = (event) => {
            const target = event.target;
            if (excaliDrawModelRef.current !== null &&
                !excaliDrawModelRef.current.contains(target) &&
                closeOnClickOutside) {
                onDelete();
            }
        };
        if (excaliDrawModelRef.current !== null) {
            modalOverlayElement = excaliDrawModelRef.current?.parentElement;
            if (modalOverlayElement !== null) {
                modalOverlayElement?.addEventListener('click', clickOutsideHandler);
            }
        }
        return () => {
            if (modalOverlayElement !== null) {
                modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
            }
        };
    }, [closeOnClickOutside, onDelete]);
    const save = () => {
        if (elements.filter((el) => !el.isDeleted).length > 0) {
            onSave(elements);
        }
        else {
            onDelete();
        }
        onHide();
    };
    const discard = () => {
        if (elements.filter((el) => !el.isDeleted).length === 0) {
            onDelete();
        }
        else {
            setDiscardModalOpen(true);
        }
    };
    function ShowDiscardDialog() {
        return (React.createElement(Modal_1.default, { title: "Discard", onClose: () => {
                setDiscardModalOpen(false);
            }, closeOnClickOutside: true },
            "Are you sure you want to discard the changes?",
            React.createElement("div", { className: "ExcalidrawModal__discardModal" },
                React.createElement(Button_1.default, { onClick: () => {
                        setDiscardModalOpen(false);
                        onHide();
                    } }, "Discard"),
                ' ',
                React.createElement(Button_1.default, { onClick: () => {
                        setDiscardModalOpen(false);
                    } }, "Cancel"))));
    }
    if (isShown === false) {
        return null;
    }
    const onChange = (els) => {
        setElements(els);
    };
    return (0, react_dom_1.createPortal)(React.createElement("div", { className: "ExcalidrawModal__overlay", role: "dialog" },
        React.createElement("div", { className: "ExcalidrawModal__modal", ref: excaliDrawModelRef, tabIndex: -1 },
            React.createElement("div", { className: "ExcalidrawModal__row" },
                discardModalOpen && React.createElement(ShowDiscardDialog, null),
                React.createElement("div", { className: "ExcalidrawModal__actions" },
                    React.createElement("button", { className: "action-button", onClick: discard }, "Discard"),
                    React.createElement("button", { className: "action-button", onClick: save }, "Save"))))), document.body);
}
exports.default = ExcalidrawModal;
//# sourceMappingURL=ExcalidrawModal.js.map