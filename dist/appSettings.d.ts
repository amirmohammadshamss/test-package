export type SettingName = 'disableBeforeInput' | 'measureTypingPerf' | 'isRichText' | 'isCollab' | 'isCharLimit' | 'isMaxLength' | 'isCharLimitUtf8' | 'isAutocomplete' | 'showTreeView' | 'showNestedEditorTreeView' | 'emptyEditor';
export type Settings = Record<SettingName, boolean>;
export declare const isDevPlayground: boolean;
export declare const DEFAULT_SETTINGS: Settings;
