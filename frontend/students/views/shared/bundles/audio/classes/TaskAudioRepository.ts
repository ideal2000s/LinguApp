import {
  ITaskAudioManagerItem,
  ITaskAudioRepositoryCollectionItem,
  tHowlAudioPlayerStatus,
  tTaskAudioRepositoryCollection
} from '../models';
import { HowlAudioPlayer } from '.';

export default class TaskAudioRepository {
  private collection: tTaskAudioRepositoryCollection = [];

  constructor(items: ITaskAudioManagerItem[] | null) {
    items &&
      items.forEach((item) => {
        this.add(item);
      });
  }

  add(item: ITaskAudioManagerItem): void {
    try {
      const entity = {
        id: item.id,
        tags: item.tags || [],
        player: new HowlAudioPlayer(item)
      };

      this.collection.push(entity);
    } catch (e) {
      item.onError && item.onError(e.message);
    }
  }

  findAll(): tTaskAudioRepositoryCollection {
    return this.collection;
  }

  findByStatus(status: tHowlAudioPlayerStatus): tTaskAudioRepositoryCollection {
    return this.collection.filter((item) => status === item.player.status);
  }

  findOneById(id: string | number): ITaskAudioRepositoryCollectionItem | null {
    const item = this.collection.filter((item) => id === item.id);

    return item.length > 0 ? item[0] : null;
  }

  findByTag(tag: string): tTaskAudioRepositoryCollection {
    return this.collection.filter((item) => {
      return item.tags.filter((ctag) => tag === ctag).length;
    });
  }
}
