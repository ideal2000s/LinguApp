# Sample 1 

```typescript jsx
import React, { FC, useEffect, useState } from 'react';

import bgMusic1 from 'students/views/pages/Games/Flashcard/assets/bg_music.mp3';
import bgMusic2 from 'students/views/pages/Games/MatchWord/assets/bg_music.mp3';
import bgMusic3 from 'students/views/pages/Games/WordNodes/assets/bg_music.mp3';
import bgMusic4 from 'students/views/pages/Games/WordWaterfall/assets/bg_music.mp3';

import { useTaskAudioPlayer } from 'students/views/shared/bundles/audio/hooks';
import { ITaskAudioManagerOptions } from 'students/views/shared/bundles/audio/models';

const TaskAudioManager: FC = () => {  
  const [playerOptions, setPlayerOptions] = useState<ITaskAudioManagerOptions | null>(
    null
  );

  useEffect(() => {
    setPlayerOptions({
      items: [
        {
          id: 'bgMusic1',
          src: bgMusic1,
          autoplay: true,
          loop: true,
          volume: 1
        },
        {
          id: 'bgMusic2',
          src: bgMusic2,
          autoplay: false,
          loop: true,
          volume: 1
        },
        {
          id: 'bgMusic3',
          src: bgMusic3,
          autoplay: false,
          loop: true,
          volume: 1
        },
        {
          id: 'bgMusic4',
          src: bgMusic4,
          autoplay: false,
          loop: true,
          volume: 1
        }
      ]
    });
  }, []);

  useTaskAudioPlayer(playerOptions);

  return <div>Task Audio Manager</div>;
};
```

# Sample 2

```typescript jsx
import React, { FC, useEffect, useState } from 'react';

import bgMusic1 from 'students/views/pages/Games/Flashcard/assets/bg_music.mp3';
import bgMusic2 from 'students/views/pages/Games/MatchWord/assets/bg_music.mp3';
import bgMusic3 from 'students/views/pages/Games/WordNodes/assets/bg_music.mp3';
import bgMusic4 from 'students/views/pages/Games/WordWaterfall/assets/bg_music.mp3';

import { useTaskAudioPlayer } from 'students/views/shared/bundles/audio/hooks';
import { ITaskAudioManagerOptions } from 'students/views/shared/bundles/audio/models';

const TaskAudioManager: FC = () => {  
  const manager = useTaskAudioPlayer(null);

  useEffect(() => {
    manager?.add({
      id: 'bgMusic4',
      tags: ['background', 'play'],
      src: bgMusic4,
      autoplay: false,
      loop: true,
      volume: 1,
      progressInterval: 100,
      onProgress: (progress) => {
        console.log(progress);
      }
    });

    setTimeout(() => {
      manager?.getByTag('background').forEach((item) => {
        item.player.play();
      });
    }, 5000);
  }, [manager]);

  return <div>Task Audio Manager</div>;
};
```
