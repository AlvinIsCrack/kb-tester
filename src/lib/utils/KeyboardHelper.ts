import { Key, KeyboardType, type KeyboardRows } from '$lib/global/keyboard.svelte';
import Page from '$lib/global/page.svelte';

type KeyboardConfig = {
    showNumpad: boolean;
    showArrows: boolean;
    specialKeys: Key[];
    fnKeys?: KeyboardRows;
    mainKeys: KeyboardRows;
    navKeys?: Key[];
    compact?: boolean;
};

const fnKeys = [[Key.Escape],
[Key.F1, Key.F2, Key.F3, Key.F4],
[Key.F5, Key.F6, Key.F7, Key.F8],
[Key.F9, Key.F10, Key.F11, Key.F12]];

const navKeys = [Key.Insert, Key.Home, Key.PageUp, Key.Delete, Key.End, Key.PageDown];

export function getKeyboardConfig(type: KeyboardType): KeyboardConfig {
    const mainKeys = Page.layout;

    switch (type) {
        case KeyboardType.FullSize:
            return {
                showNumpad: true,
                showArrows: true,
                specialKeys: [Key.PrintScreen, Key.ScrollLock, Key.Pause],
                fnKeys,
                mainKeys,
                navKeys
            };

        case KeyboardType.TKL:
            return {
                showNumpad: false,
                showArrows: true,
                specialKeys: [Key.PrintScreen, Key.ScrollLock, Key.Pause],
                fnKeys,
                mainKeys,
                navKeys
            };

        case KeyboardType.Compact75:
            return {
                showNumpad: false,
                showArrows: true,
                specialKeys: [],
                compact: true,
                fnKeys: [...fnKeys, [Key.Delete]],
                mainKeys: [
                    mainKeys[0],
                    mainKeys[1],
                    mainKeys[2],
                    [...mainKeys[3], Key.Air],
                    [...mainKeys[4], Key.Air, Key.Air],
                ],
                navKeys: [Key.Home, Key.End, Key.PageUp, Key.PageDown]
            };

        case KeyboardType.Compact65:
            return {
                showNumpad: false,
                showArrows: true,
                specialKeys: [],
                compact: true,
                mainKeys: [
                    mainKeys[0],
                    mainKeys[1],
                    mainKeys[2],
                    [...mainKeys[3], Key.Air],
                    [...mainKeys[4], Key.Air, Key.Air],
                ],
                navKeys: [Key.Home, Key.PageUp, Key.PageDown, Key.End]
            };

        case KeyboardType.Compact60:
            return {
                showNumpad: false,
                showArrows: false,
                specialKeys: [],
                mainKeys
            };

        // case KeyboardType.Layout1800:
        //     return {
        //         showFunctionRow: true,
        //         showNavigation: true,
        //         showNumpad: true,
        //         showArrows: true,
        //         specialKeys: [Key.PrintScreen, Key.ScrollLock, Key.Pause]
        //     };

        // case KeyboardType.Compact40:
        //     return {
        //         showFunctionRow: false,
        //         showNavigation: false,
        //         showNumpad: false,
        //         showArrows: false,
        //         specialKeys: []
        //     };

        default:
            return getKeyboardConfig(KeyboardType.FullSize);
    }
}