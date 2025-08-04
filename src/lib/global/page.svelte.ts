import { DisplayMode, Key, KeyboardType, type KeyboardRows } from "$lib/global/keyboard.svelte";
import { getKeyboardConfig } from "$lib/utils/KeyboardHelper";
import LocalStorage from "$lib/utils/LocalStorage.svelte";
import type { KeyboardLayoutsType as KeyboardLayoutsKeys } from "./kb_layouts.svelte";
import KeyboardLayouts from "./kb_layouts.svelte";

let _showHelp = $state(LocalStorage.getItem('visitedBefore') === undefined);
let _showOptions = $state(false);
let _hideKeyLabels = $state(LocalStorage.getItem('hideKeyLabels') === "true")
let _showIntlBackslash = $state(LocalStorage.getItem('showIntlBackslash') === "true")
let _singlePressDetection = $state(LocalStorage.getItem('singlePressDetection') === 'true')

let _keyboardType: KeyboardType = $state(LocalStorage.getItem('keyboardType', KeyboardType.FullSize) as any);
let _keyboardConfig = $derived(getKeyboardConfig(_keyboardType))
let _displayMode: DisplayMode = $state(LocalStorage.getItem('displayMode', DisplayMode.Default) as any);
let _selectedKeys: Key[] = $state([]);

let _layoutKey: KeyboardLayoutsKeys = $state(LocalStorage.getItem('layoutKey', 'QWERTY') as any)
let _layout: KeyboardRows = $derived(KeyboardLayouts.getLayout(_layoutKey))
LocalStorage.setItem('visitedBefore', 1);

const Page = {
    get showIntlBackslash() {
        return _showIntlBackslash;
    },
    set showIntlBackslash(value) {
        _showIntlBackslash = value;
        localStorage.setItem('showIntlBackslash', `${value}`);
    },

    get hideKeyLabels() {
        return _hideKeyLabels;
    },
    set hideKeyLabels(value) {
        _hideKeyLabels = value;
        localStorage.setItem('hideKeyLabels', `${value}`);
    },

    get displayMode() {
        return _displayMode;
    },
    set displayMode(value) {
        _displayMode = value;
        localStorage.setItem('displayMode', value);
    },

    get showHelp() {
        return _showHelp
    },
    set showHelp(value) {
        _showHelp = value;
    },

    get showOptions() {
        return _showOptions;
    },
    set showOptions(value) {
        _showOptions = value;
    },

    get layout() {
        return _layout;
    },

    get layoutKey() {
        return _layoutKey;
    },
    set layoutKey(value) {
        _layoutKey = value;
        localStorage.setItem('layoutKey', value);
    },

    get keyboardType() {
        return _keyboardType;
    },
    set keyboardType(value) {
        _keyboardType = value;
        localStorage.setItem('keyboardType', value);
    },

    get singlePressDetection() {
        return _singlePressDetection;
    },
    set singlePressDetection(value) {
        _singlePressDetection = value;
        localStorage.setItem('singlePressDetection', `${value}`);
    },

    get keyboardConfig() {
        return _keyboardConfig;
    }
}

export default Page;