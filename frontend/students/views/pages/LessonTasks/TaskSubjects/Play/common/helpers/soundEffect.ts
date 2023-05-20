import { playSound } from 'students/utils';
import startSound from '../../common/assets/game_begins.mp3';
import finishSound from '../../common/assets/game_finish.mp3';
import successSound from '../../common/assets/match_correct.mp3';
import failSound from '../../common/assets/match_incorrect.mp3';

export const playStartSound = (): void => {
  playSound(startSound);
};

export const playFinishSound = (): void => {
  playSound(finishSound);
};

export const playSuccessSound = (): void => {
  playSound(successSound);
};

export const playFailSound = (): void => {
  playSound(failSound);
};
