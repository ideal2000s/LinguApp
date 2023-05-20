import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// make fallback timeout if video is not ready for long time
const useVideoResizeFallback = (
  fallbackFn?: () => void
): Dispatch<SetStateAction<boolean>> => {
  const [videoIsReady, setVideoIsReady] = useState(false);

  useEffect(() => {
    const timeOut = window.setTimeout(() => {
      if (!videoIsReady) {
        fallbackFn && fallbackFn();
      }
    }, 4000);

    return () => {
      timeOut && clearTimeout(timeOut);
    };
  }, [fallbackFn, videoIsReady]);

  return setVideoIsReady;
};

export default useVideoResizeFallback;
