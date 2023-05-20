import { useCallback, useEffect, useRef, useState } from 'react';

interface IReturnedObject {
  cancel: () => void;
  debounce: (callback: () => void, wait: number) => void;
}

const useDebounce = (): IReturnedObject => {
  const [isEnabled, setIsEnabled] = useState(true);
  const timeoutRef = useRef(0);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  const debounce = useCallback(
    (callback: () => void, wait: number) => {
      timeoutRef.current && clearTimeout(timeoutRef.current);

      if (isEnabled) {
        timeoutRef.current = window.setTimeout(() => {
          callback();
        }, wait);
      }
    },
    [isEnabled]
  );

  const cancel = useCallback(() => {
    setIsEnabled(false);
  }, []);

  return { debounce, cancel };
};

export default useDebounce;
