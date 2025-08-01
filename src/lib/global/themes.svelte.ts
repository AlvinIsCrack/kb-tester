import { browser } from "$app/environment";

enum ThemesEnum {
    Dark = 'dark',
    Light = 'light',
    Matrix = 'matrix',
    Sakura = 'sakura',
    Hazard = 'hazard',
    Toxic = 'toxic',
}

let currentTheme: ThemesEnum = $state(ThemesEnum.Dark);
function setCurrentTheme(value: ThemesEnum) {
    localStorage.setItem('theme', value);

    if (currentTheme === ThemesEnum.Dark)
        document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', currentTheme);
}

if (browser) {
    currentTheme = localStorage.getItem('theme') as any ?? ThemesEnum.Dark;
    setCurrentTheme(currentTheme);
}

const Themes = {
    get available() {
        return Object.keys(ThemesEnum);
    },

    get current() {
        return currentTheme;
    },
    set current(value) {
        currentTheme = value;
        setCurrentTheme(value);
    }
};

export default Themes;