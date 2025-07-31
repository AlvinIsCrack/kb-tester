export default class Time {
    static formatMS(ms: number): string {
        if (ms < 0) ms = -ms;
        const time = {
            m: Math.floor(ms / 60000) % 60,
            s: Math.floor(ms / 1000) % 60,
            ms: Math.floor(ms) % 1000
        };
        return Object.entries(time)
            .filter(val => val[1] !== 0)
            .map(([key, val]) => `${val}${key}`)
            .at(0) ?? '';
    }
}