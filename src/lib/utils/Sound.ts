import type { Key } from "$lib/global/keyboard.svelte";

export default class Sound {
    static playKey(key: Key, voiceIndex = 0, rate = 2.2, pitch = 1, volume = 1) {
    }

    private static playKeyTTS(key: Key, voiceIndex = 0, rate = 2.2, pitch = 1, volume = 1) {
        const utterance = new SpeechSynthesisUtterance(Sound.parseKey(key));
        const voices = window.speechSynthesis.getVoices();

        if (voices.length > voiceIndex)
            utterance.voice = voices[voiceIndex];

        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        window.speechSynthesis.speak(utterance);
    }

    private static parseKey(key: Key): string {
        let out = `${key}`;
        out = out.replace(/digit|key/i, '');
        return out;
    }
}