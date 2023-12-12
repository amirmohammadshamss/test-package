"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appSettings_1 = require("./appSettings");
const urlSearchParams = new URLSearchParams(window.location.search);
for (const param of Object.keys(appSettings_1.DEFAULT_SETTINGS)) {
    if (urlSearchParams.has(param)) {
        try {
            const value = JSON.parse(urlSearchParams.get(param) ?? 'true');
            appSettings_1.DEFAULT_SETTINGS[param] = Boolean(value);
        }
        catch (error) {
            console.warn(`Unable to parse query parameter "${param}"`);
        }
    }
}
if (appSettings_1.DEFAULT_SETTINGS.disableBeforeInput) {
    delete window.InputEvent.prototype.getTargetRanges;
}
//# sourceMappingURL=setupEnv.js.map