import { useCallback, useEffect } from 'react';

let hidden: 'hidden' | 'msHidden' | 'webkitHidden', visibilityChange: string;
if (typeof document.hidden !== 'undefined') {
  // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

export default function usePageVisibility(
  onVisibilityChange?: (isHidden: boolean) => void
): () => boolean {
  const handleVisibilityChange = useCallback(() => {
    onVisibilityChange && onVisibilityChange(Boolean(document[hidden as 'hidden']));
  }, [onVisibilityChange]);

  useEffect(() => {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  const isHidden = useCallback(() => {
    return document[hidden as 'hidden'];
  }, []);

  return isHidden;
}
