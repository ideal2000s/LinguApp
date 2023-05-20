import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';

export default function useCheckForResize(): [
  (node: HTMLElement | null) => void,
  () => void
] {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const ref = useCallback((node: HTMLElement | null) => {
    setContainer(node);
  }, []);

  const checkForResize = useCallback(() => {
    if (container) {
      const cover = container.querySelector('img') || container.querySelector('video');

      if (cover) {
        // Reset unused container space, in the special case of video orientation
        const vertical = cover.offsetHeight > cover.offsetWidth;
        if (vertical) {
          cover.style.height = `${cover.offsetHeight}px`;
          cover.style.width = 'auto';
        } else {
          cover.style.width = `${cover.offsetWidth}px`;
          cover.style.height = 'auto';
        }

        container.style.height = cover.offsetHeight ? `${cover.offsetHeight}px` : 'auto';
      } else {
        container.style.height = `${container.offsetWidth * (720 / 1280)}px`;
      }
    }
  }, [container]);

  const onError = (e: ErrorEvent): any => {
    if (e.message.match(/ResizeObserver loop limit exceeded/i)) {
      e.preventDefault();
      // eslint-disable-next-line no-console
      console.warn(e.message);
      return false;
    }
  };

  useEffect(() => {
    // debounced callback is used for skipping unnecessary events of window resize
    const debouncedCallback = debounce(checkForResize, 500);
    window.addEventListener('resize', debouncedCallback);
    window.addEventListener('error', onError);
    return () => {
      window.removeEventListener('resize', debouncedCallback);
      window.removeEventListener('error', onError);
    };
  }, [checkForResize]);

  return [ref, checkForResize];
}
