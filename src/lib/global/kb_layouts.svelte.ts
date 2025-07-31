import ContextMenu from "$lib/icons/context-menu.svelte";
import Enter from "$lib/icons/enter.svelte";
import KbDown from "$lib/icons/kb-down.svelte";
import KbLeft from "$lib/icons/kb-left.svelte";
import KbRight from "$lib/icons/kb-right.svelte";
import KbUp from "$lib/icons/kb-up.svelte";
import LeftArrow from "$lib/icons/left-arrow.svelte";
import Spacebar from "$lib/icons/spacebar.svelte";
import Tab from "$lib/icons/tab.svelte";
import Windows from "$lib/icons/windows.svelte";
import { tr } from "$lib/locale/locale.svelte";
import { Key, type KeyboardLayout, type KeyboardRows } from "$lib/types/keyboard";

const QWERTY: KeyboardRows = [
    [Key.Backquote, Key.D1, Key.D2, Key.D3, Key.D4, Key.D5, Key.D6, Key.D7, Key.D8, Key.D9, Key.D0, Key.Minus, Key.Equal, Key.Backspace],
    [Key.Tab, Key.Q, Key.W, Key.E, Key.R, Key.T, Key.Y, Key.U, Key.I, Key.O, Key.P, Key.BracketLeft, Key.BracketRight, Key.Backslash],
    [Key.CapsLock, Key.A, Key.S, Key.D, Key.F, Key.G, Key.H, Key.J, Key.K, Key.L, Key.Semicolon, Key.Quote, Key.Enter],
    [Key.ShiftLeft, Key.IntlBackslash, Key.Z, Key.X, Key.C, Key.V, Key.B, Key.N, Key.M, Key.Comma, Key.Period, Key.Slash, Key.ShiftRight],
    [Key.ControlLeft, Key.MetaLeft, Key.AltLeft, Key.Space, Key.AltRight, Key.ContextMenu, Key.ControlRight]
] as const;

const AZERTY: KeyboardRows = [
    //TODO
] as const;

const DVORAK: KeyboardRows = [
    //TODO
] as const;

const COLEMAK: KeyboardRows = [
    //TODO
] as const;

const COLEMAK_DH: KeyboardRows = [
    //TODO
] as const;

const _layouts = {
    'QWERTY': {
        rows: QWERTY,
        displays: {
            [Key.ContextMenu]: {
                icon: ContextMenu
            },
            [Key.CapsLock]:
            {
                text: tr('key.caps')
            },
            [Key.Tab]:
            {
                icon: Tab
            },
            [Key.Backspace]:
            {
                icon: LeftArrow
            },
            [Key.MetaLeft]:
            {
                icon: Windows
            },
            [Key.ArrowLeft]:
            {
                icon: KbLeft
            },
            [Key.ArrowRight]:
            {
                icon: KbRight
            },
            [Key.ArrowDown]:
            {
                icon: KbDown
            },
            [Key.ArrowUp]:
            {
                icon: KbUp
            },
            [Key.Enter]:
            {
                icon: Enter
            },
            [Key.AltLeft]:
            {
                text: tr('key.alt-left')
            },
            [Key.AltRight]:
            {
                text: tr('key.alt-right')
            },
            [Key.ControlRight]:
            {
                text: tr('key.control')
            },
            [Key.ControlLeft]:
            {
                text: tr('key.control')
            },
            [Key.Escape]:
            {
                text: tr('key.escape')
            },
            [Key.Backslash]:
            {
                text: tr('key.backslash-display')
            },
            [Key.IntlBackslash]:
            {
                text: tr('key.backslash-display')
            },
            [Key.ShiftLeft]:
            {
                text: tr('key.shift-left')
            },
            [Key.ShiftRight]:
            {
                text: tr('key.shift-right')
            },
            [Key.Minus]:
                { text: tr('key.minus-display') },
            [Key.Equal]:
                { text: tr('key.equal-display') },
            [Key.BracketLeft]:
                { text: tr('key.bracket-left-display') },
            [Key.BracketRight]:
                { text: tr('key.bracket-right-display') },
            [Key.Semicolon]:
                { text: tr('key.semicolon-display') },
            [Key.Quote]:
                { text: tr('key.quote-display') },
            [Key.Comma]:
                { text: tr('key.comma-display') },
            [Key.Period]:
                { text: tr('key.period-display') },
            [Key.Slash]:
                { text: tr('key.slash-display') },
            [Key.Backquote]:
                { text: tr('key.backquote-display') },
            [Key.Delete]:
                { text: tr('key.delete-display') },
            [Key.PageDown]:
                { text: tr('key.page-down-display') },
            [Key.PageUp]:
                { text: tr('key.page-up-display') },
            [Key.Insert]:
                { text: tr('key.insert-display') },
            [Key.PrintScreen]:
                { text: tr('key.print-screen-display') },
            [Key.ScrollLock]:
                { text: tr('key.scroll-lock-display') },
            [Key.NumLock]:
                { text: tr('key.num-lock-display') },
            [Key.NumpadDivide]:
                { text: tr('key.numpad-divide-display') },
            [Key.NumpadMultiply]:
                { text: tr('key.numpad-multiply-display') },
            [Key.NumpadSubtract]:
                { text: tr('key.numpad-subtract-display') },
            [Key.NumpadAdd]:
                { text: tr('key.numpad-add-display') },
            [Key.NumpadDecimal]:
                { text: tr('key.numpad-decimal-display') },
            [Key.NumpadEnter]:
                { icon: Enter },
            [Key.Space]:
                { icon: Spacebar },
            [Key.Home]:
                { text: tr('key.home-display') },
            [Key.End]:
                { text: tr('key.end-display') }
        }
    } satisfies KeyboardLayout
} as const;

const _layoutsKeys = Object.keys(_layouts);
export type KeyboardLayoutsType = keyof typeof _layouts;

const KeyboardLayouts = {
    get available() {
        return _layoutsKeys;
    },
    getLayout(key: keyof typeof _layouts) {
        return _layouts[key];
    }
};

export default KeyboardLayouts;