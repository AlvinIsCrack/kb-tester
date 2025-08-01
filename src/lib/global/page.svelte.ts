// import { browser } from "$app/environment";
import { browser } from "$app/environment";
import { DisplayMode, Key, type KeyboardRows } from "$lib/global/keyboard.svelte";
import type { KeyboardLayoutsType as KeyboardLayoutsKeys } from "./kb_layouts.svelte";
import KeyboardLayouts from "./kb_layouts.svelte";

let _showOptions = $state(false);
let _showEdit = $state(false);
let _hideKeyLabels = $state(false)
let _showIntlBackslash = $state(false)

let _displayMode: DisplayMode = $state(DisplayMode.Default);
let _selectedKeys: Key[] = $state([]);
let _numpadEnabled = $state(true);

let _layoutKey: KeyboardLayoutsKeys = $state('QWERTY')
let _layout: KeyboardRows = $derived(KeyboardLayouts.getLayout(_layoutKey))

if (browser) {
    _showIntlBackslash = (localStorage.getItem('showIntlBackslash') === "true");
    _numpadEnabled = (localStorage.getItem('numpadEnabled') === "true");
    _hideKeyLabels = (localStorage.getItem('hideKeyLabels') === "true");
    _displayMode = localStorage.getItem('displayMode') as any ?? DisplayMode.Default;
    _layoutKey = localStorage.getItem('layoutKey') as any ?? 'QWERTY';
}

const Page = {
    get showIntlBackslash() {
        return _showIntlBackslash;
    },
    set showIntlBackslash(value) {
        _showIntlBackslash = value;
        localStorage.setItem('showIntlBackslash', `${value}`);
    },

    get numpadEnabled() {
        return _numpadEnabled;
    },
    set numpadEnabled(value) {
        _numpadEnabled = value;
        localStorage.setItem('numpadEnabled', `${value}`);
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

    get showOptions() {
        return _showOptions;
    },
    set showOptions(value) {
        _showOptions = value;
    },

    get editDrawer() {
        return _showEdit;
    },
    set editDrawer(value) {
        _showEdit = value;
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
    }
}

export default Page;