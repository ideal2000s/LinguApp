export interface AudioEffect {
  src: string;
  audio: HTMLAudioElement;
}

export class AudioEffect {
  constructor(src = '') {
    this.src = src;
    if (src) {
      this.audio = new Audio(src);
    }
  }

  load(): void {
    this.audio.load();
  }

  play(): Promise<void> {
    return this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }
}

export interface AudioEffects {
  receivedEffect: AudioEffect | null;
  sentEffect: AudioEffect | null;
}
export class AudioEffects {
  constructor({ sentUrl, receivedUrl }: { sentUrl: string; receivedUrl: string }) {
    this.receivedEffect = receivedUrl ? new AudioEffect(receivedUrl) : null;
    this.sentEffect = sentUrl ? new AudioEffect(sentUrl) : null;
  }
}
