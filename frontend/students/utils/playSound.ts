import { Howl } from 'howler';

export const playSound = (src: string) => {
  const sound = new Howl({
    src: [src]
  });

  sound.play();
};
