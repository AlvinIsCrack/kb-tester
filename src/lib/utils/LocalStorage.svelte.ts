import { browser } from "$app/environment";

const LocalStorage = {
    getItem(key: string, fallback?: string) {
        if (!browser) return fallback;
        return localStorage.getItem(key) ?? fallback;
    },

    setItem(key: string, value: any) {
        if (!browser) return;
        localStorage.setItem(key, `${typeof value === "object" ? JSON.stringify(value) : value}`);
    }
};

export default LocalStorage;