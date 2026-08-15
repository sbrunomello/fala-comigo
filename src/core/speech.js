const DEFAULTS = { rate: 0.88, pitch: 1, volume: 1, lang: 'pt-BR' };

export class SpeechController {
  constructor(settings = {}) {
    this.settings = { ...DEFAULTS, ...settings };
  }

  update(settings = {}) {
    this.settings = { ...this.settings, ...settings };
  }

  supported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  speak(text, { interrupt = true } = {}) {
    const clean = String(text || '').trim();
    if (!clean || !this.supported()) return false;

    if (interrupt) window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = this.settings.lang;
    utterance.rate = Number(this.settings.rate) || DEFAULTS.rate;
    utterance.pitch = Number(this.settings.pitch) || DEFAULTS.pitch;
    utterance.volume = Number(this.settings.volume) || DEFAULTS.volume;

    const voices = window.speechSynthesis.getVoices();
    const ptBr = voices.find((voice) => voice.lang?.toLowerCase() === 'pt-br');
    const pt = voices.find((voice) => voice.lang?.toLowerCase().startsWith('pt'));
    utterance.voice = ptBr || pt || null;
    window.speechSynthesis.speak(utterance);
    return true;
  }
}
