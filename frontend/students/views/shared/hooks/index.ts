import React, { useEffect, useRef, MutableRefObject, useState } from 'react';
import useAudioRecording from './useAudioRecording';
import useOutsideClick from './useOutsideClick';
import useBreakPoint from './useBreakPoint';
import usePageVisibility from './usePageVisibility';
import useAnimateScenarios from './useAnimateScenarios';

export {
  useAudioRecording,
  useOutsideClick,
  useBreakPoint,
  usePageVisibility,
  useAnimateScenarios
};

export function useCombinedRefs<T>(
  ...refs: MutableRefObject<T | null>[]
): React.RefObject<T> {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      ref.current = targetRef.current;
    });
  }, [refs]);

  return targetRef;
}

export function useMatchMedia(mediaQueryString = ''): MediaQueryList {
  return window.matchMedia(mediaQueryString);
}

export function useBeforeUnload(cb?: () => void): void {
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = '';
      cb && cb();
    }
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [cb]);
}

const onMountClassName = 'mountedComponentAnimation';
function useAddClassNameOnMount(className = onMountClassName): string {
  const [finalClassName, setFinalClassName] = useState('');

  useEffect(() => {
    setFinalClassName(className);
    // return () => {
    //   cleanup;
    // };
  }, [className]);

  return finalClassName;
}
useAddClassNameOnMount.className = onMountClassName;

export { useAddClassNameOnMount };

export function useWrongAnimation(
  duration = 800,
  wrongClassName = 'wrongAnimation'
): [React.MutableRefObject<HTMLDivElement | null>, () => void] {
  const wrongTimer = useRef<number | undefined>(undefined);
  const wrongBlockRef = useRef<HTMLDivElement>(null);

  function markWrong() {
    wrongBlockRef.current?.classList.remove(wrongClassName);
    wrongBlockRef.current?.getBoundingClientRect();
    wrongBlockRef.current?.classList.add(wrongClassName);
    clearTimeout(wrongTimer.current);
    wrongTimer.current = window.setTimeout(() => {
      wrongBlockRef.current?.classList.remove(wrongClassName);
    }, duration);
  }

  return [wrongBlockRef, markWrong];
}
