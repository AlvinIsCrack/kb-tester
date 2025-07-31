import { browser } from "$app/environment";
import en from "./en.json";
// import es from "./es.json";

const languages: { [code: string]: { [key: string]: string } } = {
    en,
    // es
}

let _lang: typeof en | undefined = $state(undefined);
if (browser) {
    const browserLanguage = window.navigator.language;
    _lang = languages[browserLanguage] as any;
    _lang ??= languages[browserLanguage.split('-').at(0) ?? ''] as any;
    if (!_lang) {
        console.warn('Fallback language applied')
        _lang = en;
    }
}


export function tr(key: keyof typeof en, ...args: string[]): string {
    let text = _lang?.[key] ?? en[key];
    return text;
}