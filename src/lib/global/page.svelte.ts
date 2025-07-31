// import { browser } from "$app/environment";
import { DisplayMode, Key, type KeyboardLayout } from "$lib/types/keyboard";
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
let _layout: KeyboardLayout = $derived(KeyboardLayouts.getLayout(_layoutKey))

// if (browser)
//     window.addEventListener("keydown", async (event) => {
//         if (event.repeat) return;
//         if (event.ctrlKey) {
//             switch (event.code) {
//                 default:
//                     break;
//             }
//         }
//     });

const Page = {
    get showIntlBackslash() {
        return _showIntlBackslash;
    },
    set showIntlBackslash(value) {
        _showIntlBackslash = value;
    },

    get numpadEnabled() {
        return _numpadEnabled;
    },
    set numpadEnabled(value) {
        _numpadEnabled = value;
    },

    get hideKeyLabels() {
        return _hideKeyLabels;
    },
    set hideKeyLabels(value) {
        _hideKeyLabels = value;
    },

    get displayMode() {
        return _displayMode;
    },
    set displayMode(value) {
        _displayMode = value;
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
    }
}

export default Page;