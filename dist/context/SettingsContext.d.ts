import type { SettingName } from '../appSettings';
import { ReactNode } from 'react';
type SettingsContextShape = {
    setOption: (name: SettingName, value: boolean) => void;
    settings: Record<SettingName, boolean>;
};
export declare const SettingsContext: ({ children, }: {
    children: ReactNode;
}) => JSX.Element;
export declare const useSettings: () => SettingsContextShape;
export {};
