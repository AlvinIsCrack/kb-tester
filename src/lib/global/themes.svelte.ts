import { browser } from "$app/environment";
import LocalStorage from "$lib/utils/LocalStorage.svelte";

enum ThemesEnum {
    Dark = 'dark',
    Light = 'light',
    Matrix = 'matrix',
    Sakura = 'sakura',
    Hazard = 'hazard',
    Toxic = 'toxic',
}

let currentTheme: ThemesEnum = $state(LocalStorage.getItem('theme', !browser ? ThemesEnum.Light : window.matchMedia?.('(prefers-color-scheme: dark)').matches ? ThemesEnum.Dark : ThemesEnum.Light) as any);

const Themes = {
    get available() {
        return Object.entries(ThemesEnum);
    },

    get current() {
        return currentTheme;
    },

    set current(value) {
        currentTheme = value;
        LocalStorage.setItem('theme', value);
        if (currentTheme === ThemesEnum.Dark)
            document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', currentTheme);
    }
};

export default Themes;