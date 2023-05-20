import { Howl } from 'howler';
import { IAudioPlayer, IAudioPlayerOptions, tHowlAudioPlayerStatus } from '../models';

export default class HowlAudioPlayer implements IAudioPlayer {
  private engine: Howl;
  private readonly progressInterval: number;
  private progressReq: number | null;
  private currentTrackId: number | undefined;
  private onProgress: IAudioPlayerOptions['onProgress'];
  public status: tHowlAudioPlayerStatus;

  constructor({
    src,
    preload,
    progressInterval = 1000,
    autoplay = false,
    loop = false,
    volume = 1,
    onProgress,
    onStop,
    onPause,
    onLoad,
    onMute,
    onVolume,
    onRate,
    onSeek,
    onFade,
    onUnlock,
    onEnd,
    onPlay,
    onError
  }: IAudioPlayerOptions) {
    if (!src.length) {
      throw new Error('Howl is not initialized');
    }

    this.progressInterval = progressInterval;
    this.onProgress = onProgress;
    this.progressReq = null;
    this.currentTrackId = undefined;
    this.status = 'added';

    this.engine = new Howl({
      src,
      preload,
      autoplay,
      loop,
      volume,
      onstop: (soundId: number) => {
        this.status = 'stopped';

        this.stopAnimateProgress();

        onStop &&
          onStop({
            player: this,
            soundId
          });
      },
      onpause: (soundId: number) => {
        this.stopAnimateProgress();

        onPause &&
          onPause({
            player: this,
            soundId
          });
      },
      onload: (soundId: number) => {
        onLoad &&
          onLoad({
            player: this,
            soundId
          });
      },
      onmute: (soundId: number) => {
        onMute &&
          onMute({
            player: this,
            soundId
          });
      },
      onvolume: (soundId: number) => {
        onVolume &&
          onVolume({
            player: this,
            soundId
          });
      },
      onrate: (soundId: number) => {
        onRate &&
          onRate({
            player: this,
            soundId
          });
      },
      onseek: (soundId: number) => {
        onSeek &&
          onSeek({
            player: this,
            soundId
          });
      },
      onfade: (soundId: number) => {
        onFade &&
          onFade({
            player: this,
            soundId
          });
      },
      onunlock: (soundId: number) => {
        onUnlock &&
          onUnlock({
            player: this,
            soundId
          });
      },
      onend: (soundId: number) => {
        this.status = 'ended';

        this.onProgress && this.onProgress(100);

        this.stopAnimateProgress();

        onEnd &&
          onEnd({
            player: this,
            soundId
          });
      },
      onplay: (soundId: number) => {
        this.status = 'played';

        this.onProgress && this.startAnimateProgress();

        onPlay &&
          onPlay({
            player: this,
            soundId
          });
      },
      onloaderror: (soundId, error) => {
        onError && onError(error);
      },
      onplayerror: (soundId, error) => {
        onError && onError(error);
      }
    });
  }

  play(id?: number): void {
    this.currentTrackId = id;

    this.engine.play(id);
  }

  stop(id?: number): void {
    this.currentTrackId = id;

    this.engine.stop(id);
  }

  pause(id?: number): void {
    this.currentTrackId = id;

    this.status = 'paused';

    this.engine.pause(id);
  }

  visibilityPause(id?: number): void {
    this.pause(id);

    this.status = 'visible-paused';
  }

  togglePlay(id?: number): void {
    this.playing(id) ? this.pause(id) : this.play(id);
  }

  playing(id?: number): boolean {
    this.currentTrackId = id;

    return this.engine.playing(id);
  }

  mute(mute: boolean, id?: number): void {
    this.engine.mute(mute, id);
  }

  volume(value?: number): Howl | number {
    if (value) {
      return this.engine.volume(value);
    } else {
      return this.engine.volume();
    }
  }

  unsubscribe(): void {
    this.onProgress = undefined;
  }

  /**
   * Unload and destroy a Howl object.
   * This will immediately stop all sounds attached to this sound and remove it from the cache.
   */
  unload(): void {
    this.beforeUnload();

    this.engine.unload();
  }

  beforeUnload(): void {
    this.stopAnimateProgress();

    this.unsubscribe();
  }

  private startAnimateProgress() {
    let start = Date.now();
    const animate = () => {
      if (start + this.progressInterval < Date.now()) {
        start = Date.now();
        const seek = this.engine.seek();

        if (typeof seek === 'number') {
          const progress = (seek / this.engine.duration(this.currentTrackId)) * 100;

          this.onProgress && this.onProgress(progress);
        }
      }

      if (this.engine.playing(this.currentTrackId)) {
        this.progressReq = window.requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private stopAnimateProgress() {
    if (this.progressReq) {
      cancelAnimationFrame(this.progressReq);
    }
  }
}
