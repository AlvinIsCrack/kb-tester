import { Key, KeyboardType } from '$lib/global/keyboard.svelte';

type KeyboardConfig = {
    showFunctionRow: boolean;
    showNavigation: boolean;
    showNumpad: boolean;
    showArrows: boolean;
    specialKeys: Key[];
};

export function getKeyboardConfig(type: KeyboardType): KeyboardConfig {
    switch (type) {
        case KeyboardType.FullSize:
            return {
                showFunctionRow: true,
                showNavigation: true,
                showNumpad: true,
                showArrows: true,
                specialKeys: [Key.PrintScreen, Key.ScrollLock, Key.Pause]
            };

        case KeyboardType.TKL:
            return {
                showFunctionRow: true,
                showNavigation: true,
                showNumpad: false,
                showArrows: true,
                specialKeys: [Key.PrintScreen, Key.ScrollLock, Key.Pause]
            };

        // case KeyboardType.Compact75:
        //     return {
        //         showFunctionRow: true,
        //         showNavigation: true,
        //         showNumpad: false,
        //         showArrows: true,
        //         specialKeys: []
        //     };

        // case KeyboardType.Compact65:
        //     return {
        //         showFunctionRow: false,
        //         showNavigation: false,
        //         showNumpad: false,
        //         showArrows: true,
        //         specialKeys: []
        //     };

        case KeyboardType.Compact60:
            return {
                showFunctionRow: false,
                showNavigation: false,
                showNumpad: false,
                showArrows: false,
                specialKeys: []
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