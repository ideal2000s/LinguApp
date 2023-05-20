import { Howl } from 'howler';
import { HowlAudioPlayer } from './classes';

export interface IEventHandlerOptions {
  player: any;
  soundId: number;
}

export interface IAudioPlayerOptions {
  src: string | string[];
  preload?: boolean;
  progressInterval?: number;
  autoplay?: boolean;
  autoPlayDelay?: number;
  loop?: boolean;
  volume?: number;
  onProgress?: (progress: number) => void;
  onStop?: (options: IEventHandlerOptions) => void;
  onPause?: (options: IEventHandlerOptions) => void;
  onLoad?: (options: IEventHandlerOptions) => void;
  onMute?: (options: IEventHandlerOptions) => void;
  onVolume?: (options: IEventHandlerOptions) => void;
  onRate?: (options: IEventHandlerOptions) => void;
  onSeek?: (options: IEventHandlerOptions) => void;
  onFade?: (options: IEventHandlerOptions) => void;
  onUnlock?: (options: IEventHandlerOptions) => void;
  onEnd?: (options: IEventHandlerOptions) => void;
  onPlay?: (options: IEventHandlerOptions) => void;
  onError?: (error: unknown) => void;
}

export interface IAudioPlayer {
  play: (id?: number) => void;
  stop: (id?: number) => void;
  pause: (id?: number) => void;
  visibilityPause: (id?: number) => void;
  togglePlay: (id?: number) => void;
  playing: (id?: number) => boolean;
  mute: (mute: boolean, id?: number) => void;
  volume: (value?: number) => Howl | number;
  unload: () => void;
  unsubscribe: () => void;
}

export type tHowlAudioPlayerStatus =
  | 'added'
  | 'played'
  | 'stopped'
  | 'paused'
  | 'ended'
  | 'visible-paused';

export type tTaskAudioTags = (AudioTags | string)[];

export interface ITaskAudioManagerItem extends IAudioPlayerOptions {
  id: string | number;
  tags?: tTaskAudioTags;
}

export type tTaskAudioManagerItems = ITaskAudioManagerItem[];

export interface ITaskAudioManagerOptions {
  soundEffects?: boolean;
  musicPlayback?: boolean;
}

export interface ITaskAudioRepositoryCollectionItem {
  id: string | number;
  tags: tTaskAudioTags;
  player: HowlAudioPlayer;
}

export type tTaskAudioRepositoryCollection = ITaskAudioRepositoryCollectionItem[];

export enum AudioTags {
  SoundEffects = 'sound-effects',
  MusicPlayback = 'music-playback'
}
