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
const LexicalComposerContext_1 = require("@lexical/react/LexicalComposerContext");
const utils_1 = require("@lexical/utils");
const lexical_1 = require("lexical");
const react_1 = require("react");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const useLayoutEffect_1 = __importDefault(require("../shared/src/useLayoutEffect"));
const MentionNode_1 = require("../nodes/MentionNode");
const PUNCTUATION = '\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%\'"~=<>_:;';
const NAME = '\\b[A-Z][^\\s' + PUNCTUATION + ']';
const DocumentMentionsRegex = {
    NAME,
    PUNCTUATION,
};
const CapitalizedNameMentionsRegex = new RegExp('(^|[^#])((?:' + DocumentMentionsRegex.NAME + '{' + 1 + ',})$)');
const PUNC = DocumentMentionsRegex.PUNCTUATION;
const TRIGGERS = ['@', '\\uff20'].join('');
const VALID_CHARS = '[^' + TRIGGERS + PUNC + '\\s]';
const VALID_JOINS = '(?:' +
    '\\.[ |$]|' +
    ' |' +
    '[' +
    PUNC +
    ']|' +
    ')';
const LENGTH_LIMIT = 75;
const AtSignMentionsRegex = new RegExp('(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    VALID_JOINS +
    '){0,' +
    LENGTH_LIMIT +
    '})' +
    ')$');
const ALIAS_LENGTH_LIMIT = 50;
const AtSignMentionsRegexAliasRegex = new RegExp('(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    '){0,' +
    ALIAS_LENGTH_LIMIT +
    '})' +
    ')$');
const SUGGESTION_LIST_LENGTH_LIMIT = 5;
const mentionsCache = new Map();
const dummyMentionsData = [
    'Aayla Secura',
    'Adi Gallia',
    'Admiral Dodd Rancit',
    'Admiral Firmus Piett',
    'Admiral Gial Ackbar',
    'Admiral Ozzel',
    'Admiral Raddus',
    'Admiral Terrinald Screed',
    'Admiral Trench',
    'Admiral U.O. Statura',
    'Agen Kolar',
    'Agent Kallus',
    'Aiolin and Morit Astarte',
    'Aks Moe',
    'Almec',
    'Alton Kastle',
    'Amee',
    'AP-5',
    'Armitage Hux',
    'Artoo',
    'Arvel Crynyd',
    'Asajj Ventress',
    'Aurra Sing',
    'AZI-3',
    'Bala-Tik',
    'Barada',
    'Bargwill Tomder',
    'Baron Papanoida',
    'Barriss Offee',
    'Baze Malbus',
    'Bazine Netal',
    'BB-8',
    'BB-9E',
    'Ben Quadinaros',
    'Berch Teller',
    'Beru Lars',
    'Bib Fortuna',
    'Biggs Darklighter',
    'Black Krrsantan',
    'Bo-Katan Kryze',
    'Boba Fett',
    'Bobbajo',
    'Bodhi Rook',
    'Borvo the Hutt',
    'Boss Nass',
    'Bossk',
    'Breha Antilles-Organa',
    'Bren Derlin',
    'Brendol Hux',
    'BT-1',
    'C-3PO',
    'C1-10P',
    'Cad Bane',
    'Caluan Ematt',
    'Captain Gregor',
    'Captain Phasma',
    'Captain Quarsh Panaka',
    'Captain Rex',
    'Carlist Rieekan',
    'Casca Panzoro',
    'Cassian Andor',
    'Cassio Tagge',
    'Cham Syndulla',
    'Che Amanwe Papanoida',
    'Chewbacca',
    'Chi Eekway Papanoida',
    'Chief Chirpa',
    'Chirrut Îmwe',
    'Ciena Ree',
    'Cin Drallig',
    'Clegg Holdfast',
    'Cliegg Lars',
    'Coleman Kcaj',
    'Coleman Trebor',
    'Colonel Kaplan',
    'Commander Bly',
    'Commander Cody (CC-2224)',
    'Commander Fil (CC-3714)',
    'Commander Fox',
    'Commander Gree',
    'Commander Jet',
    'Commander Wolffe',
    'Conan Antonio Motti',
    'Conder Kyl',
    'Constable Zuvio',
    'Cordé',
    'Cpatain Typho',
    'Crix Madine',
    'Cut Lawquane',
    'Dak Ralter',
    'Dapp',
    'Darth Bane',
    'Darth Maul',
    'Darth Tyranus',
    'Daultay Dofine',
    'Del Meeko',
    'Delian Mors',
    'Dengar',
    'Depa Billaba',
    'Derek Klivian',
    'Dexter Jettster',
    'Dineé Ellberger',
    'DJ',
    'Doctor Aphra',
    'Doctor Evazan',
    'Dogma',
    'Dormé',
    'Dr. Cylo',
    'Droidbait',
    'Droopy McCool',
    'Dryden Vos',
    'Dud Bolt',
    'Ebe E. Endocott',
    'Echuu Shen-Jon',
    'Eeth Koth',
    'Eighth Brother',
    'Eirtaé',
    'Eli Vanto',
    'Ellé',
    'Ello Asty',
    'Embo',
    'Eneb Ray',
    'Enfys Nest',
    'EV-9D9',
    'Evaan Verlaine',
    'Even Piell',
    'Ezra Bridger',
    'Faro Argyus',
    'Feral',
    'Fifth Brother',
    'Finis Valorum',
    'Finn',
    'Fives',
    'FN-1824',
    'FN-2003',
    'Fodesinbeed Annodue',
    'Fulcrum',
    'FX-7',
    'GA-97',
    'Galen Erso',
    'Gallius Rax',
    'Garazeb "Zeb" Orrelios',
    'Gardulla the Hutt',
    'Garrick Versio',
    'Garven Dreis',
    'Gavyn Sykes',
    'Gideon Hask',
    'Gizor Dellso',
    'Gonk droid',
    'Grand Inquisitor',
    'Greeata Jendowanian',
    'Greedo',
    'Greer Sonnel',
    'Grievous',
    'Grummgar',
    'Gungi',
    'Hammerhead',
    'Han Solo',
    'Harter Kalonia',
    'Has Obbit',
    'Hera Syndulla',
    'Hevy',
    'Hondo Ohnaka',
    'Huyang',
    'Iden Versio',
    'IG-88',
    'Ima-Gun Di',
    'Inquisitors',
    'Inspector Thanoth',
    'Jabba',
    'Jacen Syndulla',
    'Jan Dodonna',
    'Jango Fett',
    'Janus Greejatus',
    'Jar Jar Binks',
    'Jas Emari',
    'Jaxxon',
    'Jek Tono Porkins',
    'Jeremoch Colton',
    'Jira',
    'Jobal Naberrie',
    'Jocasta Nu',
    'Joclad Danva',
    'Joh Yowza',
    'Jom Barell',
    'Joph Seastriker',
    'Jova Tarkin',
    'Jubnuk',
    'Jyn Erso',
    'K-2SO',
    'Kanan Jarrus',
    'Karbin',
    'Karina the Great',
    'Kes Dameron',
    'Ketsu Onyo',
    'Ki-Adi-Mundi',
    'King Katuunko',
    'Kit Fisto',
    'Kitster Banai',
    'Klaatu',
    'Klik-Klak',
    'Korr Sella',
    'Kylo Ren',
    'L3-37',
    'Lama Su',
    'Lando Calrissian',
    'Lanever Villecham',
    'Leia Organa',
    'Letta Turmond',
    'Lieutenant Kaydel Ko Connix',
    'Lieutenant Thire',
    'Lobot',
    'Logray',
    'Lok Durd',
    'Longo Two-Guns',
    'Lor San Tekka',
    'Lorth Needa',
    'Lott Dod',
    'Luke Skywalker',
    'Lumat',
    'Luminara Unduli',
    'Lux Bonteri',
    'Lyn Me',
    'Lyra Erso',
    'Mace Windu',
    'Malakili',
    'Mama the Hutt',
    'Mars Guo',
    'Mas Amedda',
    'Mawhonic',
    'Max Rebo',
    'Maximilian Veers',
    'Maz Kanata',
    'ME-8D9',
    'Meena Tills',
    'Mercurial Swift',
    'Mina Bonteri',
    'Miraj Scintel',
    'Mister Bones',
    'Mod Terrik',
    'Moden Canady',
    'Mon Mothma',
    'Moradmin Bast',
    'Moralo Eval',
    'Morley',
    'Mother Talzin',
    'Nahdar Vebb',
    'Nahdonnis Praji',
    'Nien Nunb',
    'Niima the Hutt',
    'Nines',
    'Norra Wexley',
    'Nute Gunray',
    'Nuvo Vindi',
    'Obi-Wan Kenobi',
    'Odd Ball',
    'Ody Mandrell',
    'Omi',
    'Onaconda Farr',
    'Oola',
    'OOM-9',
    'Oppo Rancisis',
    'Orn Free Taa',
    'Oro Dassyne',
    'Orrimarko',
    'Osi Sobeck',
    'Owen Lars',
    'Pablo-Jill',
    'Padmé Amidala',
    'Pagetti Rook',
    'Paige Tico',
    'Paploo',
    'Petty Officer Thanisson',
    'Pharl McQuarrie',
    'Plo Koon',
    'Po Nudo',
    'Poe Dameron',
    'Poggle the Lesser',
    'Pong Krell',
    'Pooja Naberrie',
    'PZ-4CO',
    'Quarrie',
    'Quay Tolsite',
    'Queen Apailana',
    'Queen Jamillia',
    'Queen Neeyutnee',
    'Qui-Gon Jinn',
    'Quiggold',
    'Quinlan Vos',
    'R2-D2',
    'R2-KT',
    'R3-S6',
    'R4-P17',
    'R5-D4',
    'RA-7',
    'Rabé',
    'Rako Hardeen',
    'Ransolm Casterfo',
    'Rappertunie',
    'Ratts Tyerell',
    'Raymus Antilles',
    'Ree-Yees',
    'Reeve Panzoro',
    'Rey',
    'Ric Olié',
    'Riff Tamson',
    'Riley',
    'Rinnriyin Di',
    'Rio Durant',
    'Rogue Squadron',
    'Romba',
    'Roos Tarpals',
    'Rose Tico',
    'Rotta the Hutt',
    'Rukh',
    'Rune Haako',
    'Rush Clovis',
    'Ruwee Naberrie',
    'Ryoo Naberrie',
    'Sabé',
    'Sabine Wren',
    'Saché',
    'Saelt-Marae',
    'Saesee Tiin',
    'Salacious B. Crumb',
    'San Hill',
    'Sana Starros',
    'Sarco Plank',
    'Sarkli',
    'Satine Kryze',
    'Savage Opress',
    'Sebulba',
    'Senator Organa',
    'Sergeant Kreel',
    'Seventh Sister',
    'Shaak Ti',
    'Shara Bey',
    'Shmi Skywalker',
    'Shu Mai',
    'Sidon Ithano',
    'Sifo-Dyas',
    'Sim Aloo',
    'Siniir Rath Velus',
    'Sio Bibble',
    'Sixth Brother',
    'Slowen Lo',
    'Sly Moore',
    'Snaggletooth',
    'Snap Wexley',
    'Snoke',
    'Sola Naberrie',
    'Sora Bulq',
    'Strono Tuggs',
    'Sy Snootles',
    'Tallissan Lintra',
    'Tarfful',
    'Tasu Leech',
    'Taun We',
    'TC-14',
    'Tee Watt Kaa',
    'Teebo',
    'Teedo',
    'Teemto Pagalies',
    'Temiri Blagg',
    'Tessek',
    'Tey How',
    'Thane Kyrell',
    'The Bendu',
    'The Smuggler',
    'Thrawn',
    'Tiaan Jerjerrod',
    'Tion Medon',
    'Tobias Beckett',
    'Tulon Voidgazer',
    'Tup',
    'U9-C4',
    'Unkar Plutt',
    'Val Beckett',
    'Vanden Willard',
    'Vice Admiral Amilyn Holdo',
    'Vober Dand',
    'WAC-47',
    'Wag Too',
    'Wald',
    'Walrus Man',
    'Warok',
    'Wat Tambor',
    'Watto',
    'Wedge Antilles',
    'Wes Janson',
    'Wicket W. Warrick',
    'Wilhuff Tarkin',
    'Wollivan',
    'Wuher',
    'Wullf Yularen',
    'Xamuel Lennox',
    'Yaddle',
    'Yarael Poof',
    'Yoda',
    'Zam Wesell',
    'Zev Senesca',
    'Ziro the Hutt',
    'Zuckuss',
];
const dummyLookupService = {
    search(string, callback) {
        setTimeout(() => {
            const results = dummyMentionsData.filter((mention) => mention.toLowerCase().includes(string.toLowerCase()));
            if (results.length === 0) {
                callback(null);
            }
            else {
                callback(results);
            }
        }, 500);
    },
};
function useMentionLookupService(mentionString) {
    const [results, setResults] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const cachedResults = mentionsCache.get(mentionString);
        if (cachedResults === null) {
            return;
        }
        else if (cachedResults !== undefined) {
            setResults(cachedResults);
            return;
        }
        mentionsCache.set(mentionString, null);
        dummyLookupService.search(mentionString, (newResults) => {
            mentionsCache.set(mentionString, newResults);
            setResults(newResults);
        });
    }, [mentionString]);
    return results;
}
function MentionsTypeaheadItem({ index, isSelected, onClick, onMouseEnter, result, }) {
    const liRef = (0, react_1.useRef)(null);
    let className = 'item';
    if (isSelected) {
        className += ' selected';
    }
    return (React.createElement("li", { key: result, tabIndex: -1, className: className, ref: liRef, role: "option", "aria-selected": isSelected, id: 'typeahead-item-' + index, onMouseEnter: onMouseEnter, onClick: onClick }, result));
}
function MentionsTypeahead({ close, editor, resolution, }) {
    const divRef = (0, react_1.useRef)(null);
    const match = resolution.match;
    const results = useMentionLookupService(match.matchingString);
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const div = divRef.current;
        const rootElement = editor.getRootElement();
        if (results !== null && div !== null && rootElement !== null) {
            const range = resolution.range;
            const { left, top, height } = range.getBoundingClientRect();
            div.style.top = `${top + height + 2}px`;
            div.style.left = `${left - 14}px`;
            div.style.display = 'block';
            rootElement.setAttribute('aria-controls', 'mentions-typeahead');
            return () => {
                div.style.display = 'none';
                rootElement.removeAttribute('aria-controls');
            };
        }
    }, [editor, resolution, results]);
    const applyCurrentSelected = (0, react_1.useCallback)(() => {
        if (results === null || selectedIndex === null) {
            return;
        }
        const selectedEntry = results[selectedIndex];
        close();
        createMentionNodeFromSearchResult(editor, selectedEntry, match);
    }, [close, match, editor, results, selectedIndex]);
    const updateSelectedIndex = (0, react_1.useCallback)((index) => {
        const rootElem = editor.getRootElement();
        if (rootElem !== null) {
            rootElem.setAttribute('aria-activedescendant', 'typeahead-item-' + index);
            setSelectedIndex(index);
        }
    }, [editor]);
    (0, react_1.useEffect)(() => {
        return () => {
            const rootElem = editor.getRootElement();
            if (rootElem !== null) {
                rootElem.removeAttribute('aria-activedescendant');
            }
        };
    }, [editor]);
    (0, useLayoutEffect_1.default)(() => {
        if (results === null) {
            setSelectedIndex(null);
        }
        else if (selectedIndex === null) {
            updateSelectedIndex(0);
        }
    }, [results, selectedIndex, updateSelectedIndex]);
    (0, react_1.useEffect)(() => {
        return (0, utils_1.mergeRegister)(editor.registerCommand(lexical_1.KEY_ARROW_DOWN_COMMAND, (payload) => {
            const event = payload;
            if (results !== null && selectedIndex !== null) {
                if (selectedIndex < SUGGESTION_LIST_LENGTH_LIMIT - 1 &&
                    selectedIndex !== results.length - 1) {
                    updateSelectedIndex(selectedIndex + 1);
                }
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            return true;
        }, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_ARROW_UP_COMMAND, (payload) => {
            const event = payload;
            if (results !== null && selectedIndex !== null) {
                if (selectedIndex !== 0) {
                    updateSelectedIndex(selectedIndex - 1);
                }
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            return true;
        }, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_ESCAPE_COMMAND, (payload) => {
            const event = payload;
            if (results === null || selectedIndex === null) {
                return false;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            close();
            return true;
        }, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_TAB_COMMAND, (payload) => {
            const event = payload;
            if (results === null || selectedIndex === null) {
                return false;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            applyCurrentSelected();
            return true;
        }, lexical_1.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical_1.KEY_ENTER_COMMAND, (event) => {
            if (results === null || selectedIndex === null) {
                return false;
            }
            if (event !== null) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            applyCurrentSelected();
            return true;
        }, lexical_1.COMMAND_PRIORITY_LOW));
    }, [
        applyCurrentSelected,
        close,
        editor,
        results,
        selectedIndex,
        updateSelectedIndex,
    ]);
    if (results === null) {
        return null;
    }
    return (React.createElement("div", { "aria-label": "Suggested mentions", id: "mentions-typeahead", ref: divRef, role: "listbox" },
        React.createElement("ul", null, results.slice(0, SUGGESTION_LIST_LENGTH_LIMIT).map((result, i) => (React.createElement(MentionsTypeaheadItem, { index: i, isSelected: i === selectedIndex, onClick: () => {
                setSelectedIndex(i);
                applyCurrentSelected();
            }, onMouseEnter: () => {
                setSelectedIndex(i);
            }, key: result, result: result }))))));
}
function checkForCapitalizedNameMentions(text, minMatchLength) {
    const match = CapitalizedNameMentionsRegex.exec(text);
    if (match !== null) {
        const maybeLeadingWhitespace = match[1];
        const matchingString = match[2];
        if (matchingString != null && matchingString.length >= minMatchLength) {
            return {
                leadOffset: match.index + maybeLeadingWhitespace.length,
                matchingString,
                replaceableString: matchingString,
            };
        }
    }
    return null;
}
function checkForAtSignMentions(text, minMatchLength) {
    let match = AtSignMentionsRegex.exec(text);
    if (match === null) {
        match = AtSignMentionsRegexAliasRegex.exec(text);
    }
    if (match !== null) {
        const maybeLeadingWhitespace = match[1];
        const matchingString = match[3];
        if (matchingString.length >= minMatchLength) {
            return {
                leadOffset: match.index + maybeLeadingWhitespace.length,
                matchingString,
                replaceableString: match[2],
            };
        }
    }
    return null;
}
function getPossibleMentionMatch(text) {
    const match = checkForAtSignMentions(text, 1);
    return match === null ? checkForCapitalizedNameMentions(text, 3) : match;
}
function getTextUpToAnchor(selection) {
    const anchor = selection.anchor;
    if (anchor.type !== 'text') {
        return null;
    }
    const anchorNode = anchor.getNode();
    if (!anchorNode.isSimpleText()) {
        return null;
    }
    const anchorOffset = anchor.offset;
    return anchorNode.getTextContent().slice(0, anchorOffset);
}
function tryToPositionRange(match, range) {
    const domSelection = window.getSelection();
    if (domSelection === null || !domSelection.isCollapsed) {
        return false;
    }
    const anchorNode = domSelection.anchorNode;
    const startOffset = match.leadOffset;
    const endOffset = domSelection.anchorOffset;
    try {
        if (anchorNode) {
            range.setStart(anchorNode, startOffset);
            range.setEnd(anchorNode, endOffset);
        }
    }
    catch (error) {
        return false;
    }
    return true;
}
function getMentionsTextToSearch(editor) {
    let text = null;
    editor.getEditorState().read(() => {
        const selection = (0, lexical_1.$getSelection)();
        if (!(0, lexical_1.$isRangeSelection)(selection)) {
            return;
        }
        text = getTextUpToAnchor(selection);
    });
    return text;
}
function getMentionOffset(documentText, entryText, offset) {
    let triggerOffset = offset;
    for (let ii = triggerOffset; ii <= entryText.length; ii++) {
        if (documentText.substr(-ii) === entryText.substr(0, ii)) {
            triggerOffset = ii;
        }
    }
    return triggerOffset;
}
function createMentionNodeFromSearchResult(editor, entryText, match) {
    editor.update(() => {
        const selection = (0, lexical_1.$getSelection)();
        if (!(0, lexical_1.$isRangeSelection)(selection) || !selection.isCollapsed()) {
            return;
        }
        const anchor = selection.anchor;
        if (anchor.type !== 'text') {
            return;
        }
        const anchorNode = anchor.getNode();
        if (!anchorNode.isSimpleText()) {
            return;
        }
        const selectionOffset = anchor.offset;
        const textContent = anchorNode.getTextContent().slice(0, selectionOffset);
        const characterOffset = match.replaceableString.length;
        const mentionOffset = getMentionOffset(textContent, entryText, characterOffset);
        const startOffset = selectionOffset - mentionOffset;
        if (startOffset < 0) {
            return;
        }
        let nodeToReplace;
        if (startOffset === 0) {
            [nodeToReplace] = anchorNode.splitText(selectionOffset);
        }
        else {
            [, nodeToReplace] = anchorNode.splitText(startOffset, selectionOffset);
        }
        const mentionNode = (0, MentionNode_1.$createMentionNode)(entryText);
        nodeToReplace.replace(mentionNode);
        mentionNode.select();
    });
}
function isSelectionOnEntityBoundary(editor, offset) {
    if (offset !== 0) {
        return false;
    }
    return editor.getEditorState().read(() => {
        const selection = (0, lexical_1.$getSelection)();
        if ((0, lexical_1.$isRangeSelection)(selection)) {
            const anchor = selection.anchor;
            const anchorNode = anchor.getNode();
            const prevSibling = anchorNode.getPreviousSibling();
            return (0, lexical_1.$isTextNode)(prevSibling) && prevSibling.isTextEntity();
        }
        return false;
    });
}
function useMentions(editor) {
    const [resolution, setResolution] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!editor.hasNodes([MentionNode_1.MentionNode])) {
            throw new Error('MentionsPlugin: MentionNode not registered on editor');
        }
    }, [editor]);
    (0, react_1.useEffect)(() => {
        let activeRange = document.createRange();
        let previousText = null;
        const updateListener = () => {
            const range = activeRange;
            const text = getMentionsTextToSearch(editor);
            if (text === previousText || range === null) {
                return;
            }
            previousText = text;
            if (text === null) {
                return;
            }
            const match = getPossibleMentionMatch(text);
            if (match !== null &&
                !isSelectionOnEntityBoundary(editor, match.leadOffset)) {
                const isRangePositioned = tryToPositionRange(match, range);
                if (isRangePositioned !== null) {
                    (0, react_1.startTransition)(() => setResolution({
                        match,
                        range,
                    }));
                    return;
                }
            }
            (0, react_1.startTransition)(() => setResolution(null));
        };
        const removeUpdateListener = editor.registerUpdateListener(updateListener);
        return () => {
            activeRange = null;
            removeUpdateListener();
        };
    }, [editor]);
    const closeTypeahead = (0, react_1.useCallback)(() => {
        setResolution(null);
    }, []);
    return resolution === null || editor === null
        ? null
        : (0, react_dom_1.createPortal)(React.createElement(MentionsTypeahead, { close: closeTypeahead, resolution: resolution, editor: editor }), document.body);
}
function MentionsPlugin() {
    const [editor] = (0, LexicalComposerContext_1.useLexicalComposerContext)();
    return useMentions(editor);
}
exports.default = MentionsPlugin;
//# sourceMappingURL=MentionsPlugin.js.map