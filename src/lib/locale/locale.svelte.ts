import { browser } from "$app/environment";
import en from "./en.json";
import es from "./es.json";

const languages: { [code: string]: { [key: string]: string } } = {
    en,
    es
}

let _lang: typeof en = $state((() => {
    if (!browser) return en;

    const browserLanguage = window.navigator.language;
    let lang: typeof en = languages[browserLanguage] as any;
    lang ??= languages[browserLanguage.split('-').at(0) ?? ''] as any;
    if (!lang) {
        console.warn('Fallback language applied')
        lang = en;
    }
    return lang;
})());


export function tr(key: keyof typeof en, ...args: string[]): string | undefined {
    let text = _lang?.[key] ?? en[key];
    return text;
}