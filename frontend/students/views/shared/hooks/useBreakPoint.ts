import { useEffect, useRef, useState } from 'react';

import { theme } from '../HOCs/withSRootStyle';

type tDefaultBreakPointNames = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type tBreakPoints = {
  [someKey in tDefaultBreakPointNames]: string;
};

export default function useBreakPoint(
  breakPoint: tDefaultBreakPointNames,
  isMaxWidth = false
): boolean {
  const linguBrPts: tBreakPoints = theme.linguBrPts;
  const mqList = useRef<MediaQueryList | null>(null);
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    const query = `(${isMaxWidth ? 'max-width' : 'min-width'}: ${
      linguBrPts[breakPoint] ?? '600'
    }px)`;
    mqList.current = window.matchMedia(query);
    setIsMatched(mqList.current.matches);

    function resizeHandler(e: MediaQueryListEvent) {
      setIsMatched(e.matches);
    }
    mqList.current.addListener(resizeHandler);

    return () => {
      if (mqList.current) {
        mqList.current.removeListener(resizeHandler);
      }
    };
  }, [breakPoint, isMaxWidth, linguBrPts]);

  return isMatched;
}
