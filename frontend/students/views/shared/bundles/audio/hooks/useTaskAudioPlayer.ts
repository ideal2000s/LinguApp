import { useCallback, useEffect, useState } from 'react';
import {
  IEventHandlerOptions,
  ITaskAudioManagerItem,
  tTaskAudioManagerItems
} from '../models';
import { TaskAudioManager } from '../classes';
import { usePageVisibility } from 'students/views/shared/hooks';
import { useAudioPreferences } from '.';

export default function useTaskAudioPlayer(
  items: tTaskAudioManagerItems | null,
  ignorePreferences = false
): TaskAudioManager | null {
  const [manager, setManager] = useState<TaskAudioManager | null>(null);
  const isPlayableCallback = useAudioPreferences();

  const handlePlay = useCallback(
    (
      options: IEventHandlerOptions,
      item: ITaskAudioManagerItem,
      onPlay?: (options: IEventHandlerOptions) => void
    ) => {
      if (!isPlayableCallback({ tags: item.tags, ignorePreferences })) {
        options.player.stop();
      } else {
        onPlay && onPlay(options);
      }
    },
    [ignorePreferences, isPlayableCallback]
  );

  useEffect(() => {
    const manager = new TaskAudioManager(
      items &&
        items.map((item) => {
          const onPlay = item.onPlay;

          return {
            ...item,
            onPlay: (options) => {
              handlePlay(options, item, onPlay);
            }
          };
        })
    );

    setManager(manager);

    return () => {
      manager?.unload();
    };
  }, [handlePlay, items]);

  const onVisibilityChange = useCallback(
    (isHidden: boolean) => {
      if (isHidden) {
        manager && manager.visibilityPause();
      } else {
        manager && manager.visibilityPlay();
      }
    },
    [manager]
  );

  usePageVisibility(onVisibilityChange);

  return manager;
}
