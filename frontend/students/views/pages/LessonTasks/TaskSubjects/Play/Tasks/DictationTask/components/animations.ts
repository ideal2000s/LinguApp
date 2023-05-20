import { useEffect } from 'react';

export const dictationAnimateScenarios = [
  {
    name: 'header-appear',
    animate: {
      y: [50, 0],
      opacity: [0, 1],
      transition: {
        opacity: { duration: 0.7 },
        y: { duration: 0.7, delay: 1, ease: 'easeInOut' }
      }
    }
  },
  {
    name: 'header-disappear',
    animate: {
      y: [50, 0],
      opacity: [0, 1],
      transition: {
        opacity: { duration: 0.7 },
        y: { duration: 0.7, delay: 1, ease: 'easeInOut' }
      }
    }
  },
  {
    name: 'content-appear',
    animate: {
      y: [50, 0],
      opacity: [0, 1],
      transition: {
        duration: 0.7,
        delay: 1,
        ease: 'easeInOut'
      }
    }
  },

  {
    name: 'content-disappear',
    animate: {
      opacity: [1, 0],
      y: [0, -50],
      transition: {
        opacity: { duration: 0.7 },
        y: { duration: 0.7, ease: 'easeInOut' }
      }
    }
  }
];

export const contentVariants = {
  initial: {
    opacity: 0,
    y: 50
  },
  appear: {
    y: [50, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.7,
      delay: 1,
      ease: 'easeInOut'
    }
  },
  disappear: {
    opacity: [1, 0],
    y: [0, -50],
    transition: {
      opacity: { duration: 0.7 },
      y: { duration: 0.7, ease: 'easeInOut' }
    }
  }
};

export function useHintAnimation(
  shouldShow: boolean,
  {
    setHintVisible,
    setTooltipVisible
  }: {
    setHintVisible: (flag: boolean) => void;
    setTooltipVisible: (flag: boolean) => void;
  }
) {
  useEffect(() => {
    let timeout = 0;

    if (shouldShow) {
      setHintVisible(true);

      timeout = window.setTimeout(() => {
        setHintVisible(false);
        setTooltipVisible(true);
      }, 5000);
    } else {
      timeout && clearTimeout(timeout);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [shouldShow, setHintVisible, setTooltipVisible]);
}
