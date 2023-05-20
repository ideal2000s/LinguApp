import {
  ITaskAudioManagerItem,
  tTaskAudioManagerItems,
  ITaskAudioRepositoryCollectionItem,
  tTaskAudioRepositoryCollection
} from '../models';
import { TaskAudioRepository } from '.';

export default class TaskAudioManager {
  private repository: TaskAudioRepository;

  constructor(items: tTaskAudioManagerItems | null) {
    this.repository = new TaskAudioRepository(items);
  }

  /**
   * Add new audio
   */
  add(item: ITaskAudioManagerItem): void {
    this.repository.add(item);
  }

  /**
   * Unsubscribe track progress for all audio
   */
  unsubscribe(): void {
    this.repository.findAll()?.forEach((item) => {
      item.player.unsubscribe();
    });
  }

  /**
   * Unload and destroy a player object.
   * This will immediately stop all sounds attached to this sound and remove it from the cache.
   */
  unload(): void {
    this.repository.findAll()?.forEach((item) => {
      item.player.unload();
    });
  }

  /**
   * Stop all audio
   */
  stop(): void {
    this.repository.findByStatus('played').forEach((item) => {
      item.player.stop();
    });
  }

  /**
   * Pause all played audio
   */
  visibilityPause(): void {
    this.repository.findByStatus('played').forEach((item) => {
      item.player.visibilityPause();
    });
  }

  /**
   * Play all audio that was paused by visibility reason
   */
  visibilityPlay(): void {
    this.repository.findByStatus('visible-paused').forEach((item) => {
      item.player.play();
    });
  }

  /**
   * Get audio by id: configured player, id, tags and many other information ...
   *
   * @param id
   */
  getById(id: string | number): ITaskAudioRepositoryCollectionItem | null {
    return this.repository.findOneById(id);
  }

  /**
   * Get audio by tag: configured player, id, tags and many other information ...
   *
   * @param tag
   */
  getByTag(tag: string): tTaskAudioRepositoryCollection {
    return this.repository.findByTag(tag);
  }

  /**
   * Play audio by id
   *
   * @param id
   */
  playById(id: string | number): void {
    const item = this.repository.findOneById(id);

    item && item.player.play();
  }
}
