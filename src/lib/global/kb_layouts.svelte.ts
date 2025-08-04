
import { Key, type KeyboardRows } from "$lib/global/keyboard.svelte";

const QWERTY: KeyboardRows = [
    [Key.Backquote, Key.D1, Key.D2, Key.D3, Key.D4, Key.D5, Key.D6, Key.D7, Key.D8, Key.D9, Key.D0, Key.Minus, Key.Equal, Key.Backspace],
    [Key.Tab, Key.Q, Key.W, Key.E, Key.R, Key.T, Key.Y, Key.U, Key.I, Key.O, Key.P, Key.BracketLeft, Key.BracketRight, Key.Backslash],
    [Key.CapsLock, Key.A, Key.S, Key.D, Key.F, Key.G, Key.H, Key.J, Key.K, Key.L, Key.Semicolon, Key.Quote, Key.Enter],
    [Key.ShiftLeft, Key.IntlBackslash, Key.Z, Key.X, Key.C, Key.V, Key.B, Key.N, Key.M, Key.Comma, Key.Period, Key.Slash, Key.ShiftRight],
    [Key.ControlLeft, Key.MetaLeft, Key.AltLeft, Key.Space, Key.AltRight, Key.ContextMenu, Key.ControlRight]
] as const;

const AZERTY: KeyboardRows = [
    [Key.Backquote, Key.D1, Key.D2, Key.D3, Key.D4, Key.D5, Key.D6, Key.D7, Key.D8, Key.D9, Key.D0, Key.Minus, Key.Equal, Key.Backspace],
    [Key.Tab, Key.A, Key.Z, Key.E, Key.R, Key.T, Key.Y, Key.U, Key.I, Key.O, Key.P, Key.BracketLeft, Key.BracketRight, Key.Backslash],
    [Key.CapsLock, Key.Q, Key.S, Key.D, Key.F, Key.G, Key.H, Key.J, Key.K, Key.L, Key.M, Key.Quote, Key.Enter],
    [Key.ShiftLeft, Key.IntlBackslash, Key.W, Key.X, Key.C, Key.V, Key.B, Key.N, Key.Comma, Key.Semicolon, Key.Period, Key.Slash, Key.ShiftRight],
    [Key.ControlLeft, Key.MetaLeft, Key.AltLeft, Key.Space, Key.AltRight, Key.ContextMenu, Key.ControlRight]
] as const;

const DVORAK: KeyboardRows = [
    [Key.Backquote, Key.D1, Key.D2, Key.D3, Key.D4, Key.D5, Key.D6, Key.D7, Key.D8, Key.D9, Key.D0, Key.BracketLeft, Key.BracketRight, Key.Backspace],
    [Key.Tab, Key.Quote, Key.Comma, Key.Period, Key.P, Key.Y, Key.F, Key.G, Key.C, Key.R, Key.L, Key.Slash, Key.Equal, Key.Backslash],
    [Key.CapsLock, Key.A, Key.O, Key.E, Key.U, Key.I, Key.D, Key.H, Key.T, Key.N, Key.S, Key.Minus, Key.Enter],
    [Key.ShiftLeft, Key.IntlBackslash, Key.Semicolon, Key.Q, Key.J, Key.K, Key.X, Key.B, Key.M, Key.W, Key.V, Key.Z, Key.ShiftRight],
    [Key.ControlLeft, Key.MetaLeft, Key.AltLeft, Key.Space, Key.AltRight, Key.ContextMenu, Key.ControlRight]
] as const;

const COLEMAK: KeyboardRows = [
    [Key.Backquote, Key.D1, Key.D2, Key.D3, Key.D4, Key.D5, Key.D6, Key.D7, Key.D8, Key.D9, Key.D0, Key.Minus, Key.Equal, Key.Backspace],
    [Key.Tab, Key.Q, Key.W, Key.F, Key.P, Key.G, Key.J, Key.L, Key.U, Key.Y, Key.Semicolon, Key.BracketLeft, Key.BracketRight, Key.Backslash],
    [Key.CapsLock, Key.A, Key.R, Key.S, Key.T, Key.D, Key.H, Key.N, Key.E, Key.I, Key.O, Key.Quote, Key.Enter],
    [Key.ShiftLeft, Key.IntlBackslash, Key.Z, Key.X, Key.C, Key.V, Key.B, Key.K, Key.M, Key.Comma, Key.Period, Key.Slash, Key.ShiftRight],
    [Key.ControlLeft, Key.MetaLeft, Key.AltLeft, Key.Space, Key.AltRight, Key.ContextMenu, Key.ControlRight]
] as const;

const _layouts = $derived(
    {
        QWERTY,
        AZERTY,
        DVORAK,
        COLEMAK,
    }
);

const _layoutsKeys = Object.keys(_layouts);
export type KeyboardLayoutsType = keyof typeof _layouts;

const KeyboardLayouts = {
    get available() {
        return _layoutsKeys;
    },
    get layout() {
        return _layouts;
    }
};

export default KeyboardLayouts;