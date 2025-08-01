import { browser } from "$app/environment";
import { Key, KeyPressSpeed, type KeyboardState, type MouseState } from "$lib/global/keyboard.svelte";
import Sound from "$lib/utils/Sound";

let _initialized = $state(false);

let keyboard: KeyboardState = $state({
    keys: {}
})

let _keyboardLog: Key[] = $state([]);
let _keyboardPressTimes: { [key: string]: number[] } = {};
let _recentFastPresses: { [key: string]: number } = $state({});
let _totalKeyPress = $state(0);

const _data = $derived({
    totalKeypresses: _totalKeyPress
});

let _lastMouseDelta = 0;
let mouse: MouseState = $state({
    buttons: {},
});

function reset() {
    _keyboardPressTimes = {};
    keyboard.keys = {};
    mouse.buttons = {};
    _totalKeyPress = 0;
}

function getSpeedOfKey(key: string) {
    const times = _keyboardPressTimes[key];
    if (!times?.at(1)) return KeyPressSpeed.Normal;
    const delta = times.at(-1)! - times.at(-2)!;

    if (delta >= KeyPressSpeed.Normal) return KeyPressSpeed.Normal;
    if (delta >= KeyPressSpeed.Fast) return KeyPressSpeed.Fast;
    if (delta >= KeyPressSpeed.VeryFast) return KeyPressSpeed.VeryFast;
    return KeyPressSpeed.DangeourslyFast;
}

function wasRecentlyFast(key: string) {
    return key in _recentFastPresses;
}

if (browser) {
    window.addEventListener('keydown', async (event) => {
        console.debug(event);
        event.preventDefault();
        if (event.repeat) return;

        if (event.code === Key.ControlLeft) {
            await new Promise((r) => setTimeout(r, 2));
            if (keyboard.keys[Key.AltRight]) return;
        }

        if (event.ctrlKey) {
            switch (event.code) {
                case Key.R:
                    reset();
                    return;
                case Key.C:
                    _keyboardLog = [];
                    return;
                default:
                    break;
            }
        }

        Sound.playKey(event.code as Key);

        keyboard.keys[event.code] = true;
        _keyboardLog.push(event.code as Key);
        if (!(event.code in _keyboardPressTimes)) _keyboardPressTimes[event.code] = [];
        _keyboardPressTimes[event.code].push(Date.now());
        _totalKeyPress += 1;

        const speed = getSpeedOfKey(event.code);
        const FAST_PRESS_TIMEOUT = 400;

        if (speed !== KeyPressSpeed.Normal) {
            // Si ya hay un temporizador para esta tecla, lo limpiamos para reiniciarlo.
            if (_recentFastPresses[event.code]) {
                clearTimeout(_recentFastPresses[event.code]);
            }
            // Creamos un nuevo temporizador que eliminará la tecla del estado de "reciente".
            _recentFastPresses[event.code] = window.setTimeout(() => {
                delete _recentFastPresses[event.code];
            }, FAST_PRESS_TIMEOUT);
        }
    });

    window.addEventListener("keyup", (event) => {
        event.preventDefault();
        keyboard.keys[event.code] = false;
    });

    window.addEventListener("mousedown", (event) => {
        mouse.buttons[event.button] = true;
    });

    window.addEventListener("mouseup", (event) => {
        mouse.buttons[event.button] = false;
    });

    window.addEventListener("blur", (event) => {
        keyboard.keys = {};
        mouse.buttons = {};
    })

    window.addEventListener("wheel", (event) => {
        mouse.buttons["wheel"] = true;
        if (event.deltaY === _lastMouseDelta)
            mouse.buttons["wheel"] = false;
        _lastMouseDelta = event.deltaY;
    });

    setTimeout(() => {
        _initialized = true;
    }, 500);
}
const Input = {
    get data() {
        return _data;
    },
    get log() {
        return _keyboardLog;
    },
    get keyboard() {
        return keyboard;
    },
    get mouse() {
        return mouse;
    },
    get initialized() {
        return _initialized
    },

    reset,
    clearKeylog() {
        _keyboardLog = [];
    },

    getSpeedOfKey,
    wasPressed(key: string) {
        return key in _keyboardPressTimes;
    },

    wasRecentlyFast,
    timesPressed(key: string) {
        return _keyboardPressTimes[key]?.length ?? 0;
    }
};

export default Input;