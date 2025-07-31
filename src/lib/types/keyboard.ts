export type KeyboardState = {
    keys: Record<string, boolean>;
};

export type MouseState = {
    buttons: Record<string, boolean>;
};

export enum KeyPressSpeed {
    Normal = 150,
    Fast = 120,
    VeryFast = 100,
    DangeourslyFast = 75
}

export enum DisplayMode {
    Default = 'default',
    KeyType = 'keytype'
}

export enum KeyType {
    Alpha = "alpha",
    Modifier = "modifier",
    System = "system",
    EnterAndEditing = "enter-editing",
    Navigation = "navigation",
    Function = "function",
    NumericKeypad = "numpad",
    LockKeys = "lock"
}

/**
 * Representa los valores de `event.code` para las teclas físicas del teclado.
 * Estos valores son independientes del layout (idioma) del teclado.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
 */
export enum Key {
    // --- Teclas Alfanuméricas (Sección principal) ---

    // Letras
    A = "KeyA",
    B = "KeyB",
    C = "KeyC",
    D = "KeyD",
    E = "KeyE",
    F = "KeyF",
    G = "KeyG",
    H = "KeyH",
    I = "KeyI",
    J = "KeyJ",
    K = "KeyK",
    L = "KeyL",
    M = "KeyM",
    N = "KeyN",
    O = "KeyO",
    P = "KeyP",
    Q = "KeyQ",
    R = "KeyR",
    S = "KeyS",
    T = "KeyT",
    U = "KeyU",
    V = "KeyV",
    W = "KeyW",
    X = "KeyX",
    Y = "KeyY",
    Z = "KeyZ",

    // Números (fila superior)
    D0 = "Digit0",
    D1 = "Digit1",
    D2 = "Digit2",
    D3 = "Digit3",
    D4 = "Digit4",
    D5 = "Digit5",
    D6 = "Digit6",
    D7 = "Digit7",
    D8 = "Digit8",
    D9 = "Digit9",

    // --- Teclas de Puntuación y Símbolos ---
    Backquote = "Backquote",   // `
    Minus = "Minus",           // -
    Equal = "Equal",           // =
    BracketLeft = "BracketLeft",   // [
    BracketRight = "BracketRight",  // ]
    Backslash = "Backslash",     // \
    Semicolon = "Semicolon",     // ;
    Quote = "Quote",           // '
    Comma = "Comma",           // ,
    Period = "Period",         // .
    Slash = "Slash",           // /
    IntlBackslash = 'IntlBackslash',

    // --- Teclas de Modificadores ---
    AltLeft = "AltLeft",
    AltRight = "AltRight",
    ControlLeft = "ControlLeft",
    ControlRight = "ControlRight",
    ShiftLeft = "ShiftLeft",
    ShiftRight = "ShiftRight",
    MetaLeft = "MetaLeft",       // Tecla Windows Izquierda / Command Izquierda
    MetaRight = "MetaRight",     // Tecla Windows Derecha / Command Derecha

    // --- Teclas de Control y Espacio en Blanco ---
    Enter = "Enter",
    Tab = "Tab",
    Space = "Space",
    Backspace = "Backspace",
    Escape = "Escape",
    CapsLock = "CapsLock",
    ContextMenu = "ContextMenu",

    // --- Teclas de Navegación y Edición ---
    Insert = "Insert",
    Delete = "Delete",
    Home = "Home",
    End = "End",
    PageUp = "PageUp",
    PageDown = "PageDown",

    // --- Teclas de Dirección (Flechas) ---
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    ArrowLeft = "ArrowLeft",
    ArrowRight = "ArrowRight",

    // --- Teclas de Función ---
    F1 = "F1",
    F2 = "F2",
    F3 = "F3",
    F4 = "F4",
    F5 = "F5",
    F6 = "F6",
    F7 = "F7",
    F8 = "F8",
    F9 = "F9",
    F10 = "F10",
    F11 = "F11",
    F12 = "F12",
    F13 = "F13",
    F14 = "F14",
    F15 = "F15",
    F16 = "F16",
    F17 = "F17",
    F18 = "F18",
    F19 = "F19",
    F20 = "F20",

    // --- Teclado Numérico (Numpad) ---
    NumLock = "NumLock",
    Numpad0 = "Numpad0",
    Numpad1 = "Numpad1",
    Numpad2 = "Numpad2",
    Numpad3 = "Numpad3",
    Numpad4 = "Numpad4",
    Numpad5 = "Numpad5",
    Numpad6 = "Numpad6",
    Numpad7 = "Numpad7",
    Numpad8 = "Numpad8",
    Numpad9 = "Numpad9",
    NumpadAdd = "NumpadAdd",
    NumpadSubtract = "NumpadSubtract",
    NumpadMultiply = "NumpadMultiply",
    NumpadDivide = "NumpadDivide",
    NumpadDecimal = "NumpadDecimal",
    NumpadEnter = "NumpadEnter",

    // --- Otras Teclas ---
    PrintScreen = "PrintScreen",
    ScrollLock = "ScrollLock",
    Pause = "Pause",
    Unidentified = "Unidentified" // Cuando el navegador no puede identificar la tecla
}

export interface KeyboardLayout {
    rows: KeyboardRows;
    displays: {
        [key: string]: {
            icon?: any;
            text?: string;
        }
    }
}

export type KeyboardRows = Key[][];

export enum KeyLocation {
    Standard = 0,
    Left = 1,
    Right = 2,
    Numpad = 3,
    Mobile = 4,
    Joystick = 5
}

export const keyTypeMapping: Record<Key, KeyType> = {
    // --- KeyType.Alpha ---
    // Includes all letters, the number row, punctuation, and space.
    [Key.A]: KeyType.Alpha,
    [Key.B]: KeyType.Alpha,
    [Key.C]: KeyType.Alpha,
    [Key.D]: KeyType.Alpha,
    [Key.E]: KeyType.Alpha,
    [Key.F]: KeyType.Alpha,
    [Key.G]: KeyType.Alpha,
    [Key.H]: KeyType.Alpha,
    [Key.I]: KeyType.Alpha,
    [Key.J]: KeyType.Alpha,
    [Key.K]: KeyType.Alpha,
    [Key.L]: KeyType.Alpha,
    [Key.M]: KeyType.Alpha,
    [Key.N]: KeyType.Alpha,
    [Key.O]: KeyType.Alpha,
    [Key.P]: KeyType.Alpha,
    [Key.Q]: KeyType.Alpha,
    [Key.R]: KeyType.Alpha,
    [Key.S]: KeyType.Alpha,
    [Key.T]: KeyType.Alpha,
    [Key.U]: KeyType.Alpha,
    [Key.V]: KeyType.Alpha,
    [Key.W]: KeyType.Alpha,
    [Key.X]: KeyType.Alpha,
    [Key.Y]: KeyType.Alpha,
    [Key.Z]: KeyType.Alpha,
    [Key.D0]: KeyType.Alpha,
    [Key.D1]: KeyType.Alpha,
    [Key.D2]: KeyType.Alpha,
    [Key.D3]: KeyType.Alpha,
    [Key.D4]: KeyType.Alpha,
    [Key.D5]: KeyType.Alpha,
    [Key.D6]: KeyType.Alpha,
    [Key.D7]: KeyType.Alpha,
    [Key.D8]: KeyType.Alpha,
    [Key.D9]: KeyType.Alpha,
    [Key.Backquote]: KeyType.Alpha,
    [Key.Minus]: KeyType.Alpha,
    [Key.Equal]: KeyType.Alpha,
    [Key.BracketLeft]: KeyType.Alpha,
    [Key.BracketRight]: KeyType.Alpha,
    [Key.Backslash]: KeyType.Alpha,
    [Key.Semicolon]: KeyType.Alpha,
    [Key.Quote]: KeyType.Alpha,
    [Key.Comma]: KeyType.Alpha,
    [Key.Period]: KeyType.Alpha,
    [Key.Slash]: KeyType.Alpha,
    [Key.IntlBackslash]: KeyType.Alpha,
    [Key.Space]: KeyType.Alpha,

    // --- KeyType.Modifier ---
    // Keys that modify the behavior of other keys.
    [Key.AltLeft]: KeyType.Modifier,
    [Key.AltRight]: KeyType.Modifier,
    [Key.ControlLeft]: KeyType.Modifier,
    [Key.ControlRight]: KeyType.Modifier,
    [Key.ShiftLeft]: KeyType.Modifier,
    [Key.ShiftRight]: KeyType.Modifier,

    // --- KeyType.EnterAndEditing ---
    // Keys used for text entry control and editing.
    [Key.Enter]: KeyType.EnterAndEditing,
    [Key.NumpadEnter]: KeyType.EnterAndEditing,
    [Key.Backspace]: KeyType.EnterAndEditing,
    [Key.Delete]: KeyType.EnterAndEditing,
    [Key.Insert]: KeyType.EnterAndEditing,
    [Key.Tab]: KeyType.EnterAndEditing,

    // --- KeyType.Navigation ---
    // Keys used for navigating within documents or interfaces.
    [Key.ArrowUp]: KeyType.Navigation,
    [Key.ArrowDown]: KeyType.Navigation,
    [Key.ArrowLeft]: KeyType.Navigation,
    [Key.ArrowRight]: KeyType.Navigation,
    [Key.Home]: KeyType.Navigation,
    [Key.End]: KeyType.Navigation,
    [Key.PageUp]: KeyType.Navigation,
    [Key.PageDown]: KeyType.Navigation,

    // --- KeyType.Function ---
    // The function keys (F1-F20).
    [Key.F1]: KeyType.Function,
    [Key.F2]: KeyType.Function,
    [Key.F3]: KeyType.Function,
    [Key.F4]: KeyType.Function,
    [Key.F5]: KeyType.Function,
    [Key.F6]: KeyType.Function,
    [Key.F7]: KeyType.Function,
    [Key.F8]: KeyType.Function,
    [Key.F9]: KeyType.Function,
    [Key.F10]: KeyType.Function,
    [Key.F11]: KeyType.Function,
    [Key.F12]: KeyType.Function,
    [Key.F13]: KeyType.Function,
    [Key.F14]: KeyType.Function,
    [Key.F15]: KeyType.Function,
    [Key.F16]: KeyType.Function,
    [Key.F17]: KeyType.Function,
    [Key.F18]: KeyType.Function,
    [Key.F19]: KeyType.Function,
    [Key.F20]: KeyType.Function,

    // --- KeyType.NumericKeypad ---
    // All keys located on the numeric keypad.
    [Key.Numpad0]: KeyType.NumericKeypad,
    [Key.Numpad1]: KeyType.NumericKeypad,
    [Key.Numpad2]: KeyType.NumericKeypad,
    [Key.Numpad3]: KeyType.NumericKeypad,
    [Key.Numpad4]: KeyType.NumericKeypad,
    [Key.Numpad5]: KeyType.NumericKeypad,
    [Key.Numpad6]: KeyType.NumericKeypad,
    [Key.Numpad7]: KeyType.NumericKeypad,
    [Key.Numpad8]: KeyType.NumericKeypad,
    [Key.Numpad9]: KeyType.NumericKeypad,
    [Key.NumpadAdd]: KeyType.NumericKeypad,
    [Key.NumpadSubtract]: KeyType.NumericKeypad,
    [Key.NumpadMultiply]: KeyType.NumericKeypad,
    [Key.NumpadDivide]: KeyType.NumericKeypad,
    [Key.NumpadDecimal]: KeyType.NumericKeypad,

    // --- KeyType.LockKeys ---
    // Keys that toggle a state on or off.
    [Key.CapsLock]: KeyType.LockKeys,
    [Key.NumLock]: KeyType.LockKeys,
    [Key.ScrollLock]: KeyType.LockKeys,

    // --- KeyType.System ---
    // System-level or special-purpose keys.
    [Key.Escape]: KeyType.System,
    [Key.PrintScreen]: KeyType.System,
    [Key.Pause]: KeyType.System,
    [Key.ContextMenu]: KeyType.System,
    [Key.Unidentified]: KeyType.System,
    [Key.MetaLeft]: KeyType.System,
    [Key.MetaRight]: KeyType.System,
};
