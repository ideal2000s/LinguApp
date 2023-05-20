import { useCallback, useEffect } from 'react';
import { IMarkWordAudioItem, tStatefulStatement } from 'students/models/lessonTasks';
import { useAnimateScenarios } from 'students/views/shared/hooks';

const COMMON_ANIMATION_TIME = 0.7;

export const sentenceInitAnimate = { opacity: 0 };
const sentenceAnimateScenarios = [
  {
    name: 'sentence-init-1',
    animate: {
      y: [-160, -40],
      opacity: [0, 1],
      transition: {
        duration: COMMON_ANIMATION_TIME,
        type: 'easeOut'
      }
    }
  },
  {
    name: 'sentence-init-2',
    animate: {
      y: [-40, 0],
      transition: {
        delay: COMMON_ANIMATION_TIME,
        duration: COMMON_ANIMATION_TIME,
        type: 'easeOut'
      }
    }
  },
  {
    name: 'sentence-reset',
    animate: {
      y: [0, 250],
      opacity: [1, 0],
      transition: {
        duration: COMMON_ANIMATION_TIME,
        type: 'easeIn'
      }
    }
  }
];

export const audioInitAnimate = { opacity: 0, height: 0 };
const audioAnimateScenarios = [
  {
    name: 'audio-init',
    animate: {
      height: '90px',
      opacity: [0, 1],
      y: [-200, 0],
      transition: {
        delay: COMMON_ANIMATION_TIME,
        duration: COMMON_ANIMATION_TIME,
        type: 'easeOut'
      }
    }
  },
  {
    name: 'audio-reset',
    animate: {
      height: 0,
      opacity: [1, 0],
      y: [0, 200],
      transition: {
        duration: COMMON_ANIMATION_TIME,
        type: 'easeIn'
      }
    }
  }
];

export const wordInitAnimate = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  scale: 1,
  color: '#ffffff'
};
const wordItemAnimateScenarios = [
  {
    name: 'wordItem-reset',
    animate: {
      scale: 1,
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
];

export const useCustomAnimations = (
  item: IMarkWordAudioItem
): [Record<string, any>, Record<string, any>] => {
  const [sentenceAnimationInstance, sentenceAnimate] = useAnimateScenarios(
    sentenceAnimateScenarios
  );

  const [audioAnimationInstance, audioAnimate] = useAnimateScenarios(
    audioAnimateScenarios
  );

  const [wordItemAnimationInstance, wordItemAnimate] = useAnimateScenarios(
    wordItemAnimateScenarios
  );

  const sentence_initialFirstAnimation = useCallback(
    (): Promise<void> => sentenceAnimate(['sentence-init-1']),
    [sentenceAnimate]
  );

  const sentence_initialSecondAnimation = useCallback(
    (): Promise<void> => sentenceAnimate(['sentence-init-2']),
    [sentenceAnimate]
  );

  const sentence_resetAnimation = useCallback(
    (): Promise<void> => sentenceAnimate(['sentence-reset']),
    [sentenceAnimate]
  );

  const audio_initialAnimation = useCallback(
    (): Promise<void> => audioAnimate(['audio-init']),
    [audioAnimate]
  );

  const audio_resetAnimation = useCallback(
    (): Promise<void> => audioAnimate(['audio-reset']),
    [audioAnimate]
  );

  const wordItem_startWordAnimation = useCallback(
    (word: tStatefulStatement, isPermanent: boolean): Promise<any> =>
      wordItemAnimationInstance.start((aWord: tStatefulStatement) =>
        aWord.word === word.word && aWord.index === word.index
          ? {
              scale: [1, 1.06, 1],
              color: [
                '#ffffff',
                aWord.solution ? '#55EEAE' : '#ff0000',
                isPermanent || aWord.solution ? '#55EEAE' : '#ffffff'
              ],
              backgroundColor: [
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.2)',
                isPermanent ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0)'
              ],
              transition: {
                scale: {
                  duration: 0.6
                },
                color: {
                  duration: 0.5
                },
                backgroundColor: {
                  duration: COMMON_ANIMATION_TIME,
                  type: 'easeIn'
                }
              }
            }
          : {}
      ),
    [wordItemAnimationInstance]
  );

  const wordItem_resetAnimation = useCallback(
    (): Promise<void> => wordItemAnimate(['wordItem-reset']),
    [wordItemAnimate]
  );

  const resetAllAnimations = useCallback(
    () =>
      Promise.all([
        sentence_resetAnimation(),
        audio_resetAnimation(),
        wordItem_resetAnimation()
      ]),
    [sentence_resetAnimation, audio_resetAnimation, wordItem_resetAnimation]
  );

  useEffect(() => {
    const startAnimation = async () => {
      await sentenceAnimationInstance.stop();
      await audioAnimationInstance.stop();
      await wordItemAnimationInstance.stop();

      await sentence_initialFirstAnimation();

      audio_initialAnimation();

      sentence_initialSecondAnimation();
    };

    startAnimation();
  }, [
    item,
    sentenceAnimationInstance,
    sentence_initialFirstAnimation,
    sentence_initialSecondAnimation,
    audioAnimationInstance,
    audio_initialAnimation,
    wordItemAnimationInstance
  ]);

  return [
    {
      sentenceAnimationInstance,
      audioAnimationInstance,
      wordItemAnimationInstance
    },
    {
      resetAllAnimations,
      wordItem_startWordAnimation
    }
  ];
};
