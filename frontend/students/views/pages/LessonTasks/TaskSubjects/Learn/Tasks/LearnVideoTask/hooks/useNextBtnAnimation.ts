import { useCallback } from 'react';
import { useAnimation, AnimationControls } from 'framer-motion';

const useNextBtnAnimation = (): [AnimationControls, () => void] => {
  const nextBtnControls = useAnimation();

  const nextButtonAnimation = useCallback(
    (): Promise<any> =>
      nextBtnControls.start({
        opacity: [0, 1],
        transition: {
          opacity: { duration: 0.5 },
          delay: 1
        }
      }),
    [nextBtnControls]
  );

  const handleResizeEnd = () => {
    nextButtonAnimation();
  };

  return [nextBtnControls, handleResizeEnd];
};

export default useNextBtnAnimation;
