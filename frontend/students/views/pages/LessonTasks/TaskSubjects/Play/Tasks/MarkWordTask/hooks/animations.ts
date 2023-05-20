import { useCallback, useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { IMarkWordItem, tStatefulStatementItem } from 'students/models/lessonTasks';

const COMMON_ANIMATION_TIME = 0.7;

const useCustomAnimations = (
  item: IMarkWordItem
): [Record<string, any>, Record<string, any>] => {
  const sentenceAnimationInstance = useAnimation();
  const imageAnimationInstance = useAnimation();
  const wordItemAnimationInstance = useAnimation();

  const sentence_setInitialState = useCallback(
    (): void =>
      sentenceAnimationInstance.set({
        opacity: 0
      }),
    [sentenceAnimationInstance]
  );

  const sentence_initialFirstAnimation = useCallback(
    (): Promise<any> =>
      sentenceAnimationInstance.start({
        y: [-160, -40],
        opacity: [0, 1],
        transition: {
          duration: COMMON_ANIMATION_TIME,
          type: 'easeOut'
        }
      }),
    [sentenceAnimationInstance]
  );

  const sentence_initialSecondAnimation = useCallback(
    (): Promise<any> =>
      sentenceAnimationInstance.start({
        y: [-40, 0],
        transition: {
          delay: COMMON_ANIMATION_TIME,
          duration: COMMON_ANIMATION_TIME,
          type: 'easeOut'
        }
      }),
    [sentenceAnimationInstance]
  );

  const sentence_resetAnimation = useCallback(
    (): Promise<any> =>
      sentenceAnimationInstance.start({
        y: [0, 250],
        opacity: [1, 0],
        transition: {
          duration: COMMON_ANIMATION_TIME,
          type: 'easeIn'
        }
      }),
    [sentenceAnimationInstance]
  );

  const image_setInitialState = useCallback(
    (): void =>
      imageAnimationInstance.set({
        height: 0,
        opacity: 0
      }),
    [imageAnimationInstance]
  );

  const image_initialAnimation = useCallback(
    (): Promise<any> =>
      imageAnimationInstance.start({
        height: '200px',
        opacity: [0, 1],
        y: [-200, 0],
        transition: {
          delay: COMMON_ANIMATION_TIME,
          duration: COMMON_ANIMATION_TIME,
          type: 'easeOut'
        }
      }),
    [imageAnimationInstance]
  );

  const image_resetAnimation = useCallback(
    (): Promise<any> =>
      imageAnimationInstance.start({
        height: 0,
        opacity: [1, 0],
        y: [0, 200],
        transition: {
          duration: COMMON_ANIMATION_TIME,
          type: 'easeIn'
        }
      }),
    [imageAnimationInstance]
  );

  const wordItem_setInitialState = useCallback(
    (): void =>
      wordItemAnimationInstance.set({
        backgroundColor: 'rgba(0, 0, 0, 0)',
        scale: 1,
        color: '#ffffff'
      }),
    [wordItemAnimationInstance]
  );

  const wordItem_startWordAnimation = useCallback(
    (word: tStatefulStatementItem, isPermanent: boolean): Promise<any> =>
      wordItemAnimationInstance.start((aWord: tStatefulStatementItem) =>
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
    (): Promise<any> =>
      wordItemAnimationInstance.start({
        scale: 1,
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        opacity: 1,
        transition: {
          duration: 0.5
        }
      }),
    [wordItemAnimationInstance]
  );

  const resetAllAnimations = useCallback(
    () =>
      Promise.all([
        sentence_resetAnimation(),
        image_resetAnimation(),
        wordItem_resetAnimation()
      ]),
    [sentence_resetAnimation, image_resetAnimation, wordItem_resetAnimation]
  );

  useEffect(() => {
    sentence_setInitialState();
    image_setInitialState();
    wordItem_setInitialState();

    const startAnimation = async () => {
      await sentenceAnimationInstance.stop();
      await imageAnimationInstance.stop();
      await wordItemAnimationInstance.stop();

      await sentence_initialFirstAnimation();

      image_initialAnimation();

      sentence_initialSecondAnimation();
    };

    startAnimation();
  }, [
    item,
    sentenceAnimationInstance,
    sentence_setInitialState,
    sentence_initialFirstAnimation,
    sentence_initialSecondAnimation,
    imageAnimationInstance,
    image_setInitialState,
    image_initialAnimation,
    wordItemAnimationInstance,
    wordItem_setInitialState
  ]);

  return [
    {
      sentenceAnimationInstance,
      imageAnimationInstance,
      wordItemAnimationInstance
    },
    {
      resetAllAnimations,
      wordItem_startWordAnimation
    }
  ];
};

export default useCustomAnimations;
