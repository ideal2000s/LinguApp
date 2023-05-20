import { useState, useRef, useEffect, useCallback } from 'react';
import Stopwatch from './stopwatch';

type tUseStopwatchReturnType = [
  {
    start: () => void;
    pause: () => void;
    reset: () => void;
  },
  number
];

export function useStopwatch2(initValue = 0): tUseStopwatchReturnType {
  const [seconds, setSeconds] = useState(initValue);
  const handleSecondChange = useCallback(setSeconds, [setSeconds]);
  const stopwatchRef = useRef<Stopwatch | null>(null);

  useEffect(() => {
    stopwatchRef.current = new Stopwatch({ onChange: handleSecondChange });
    return () => {
      stopwatchRef.current?.destroy();
      stopwatchRef.current = null;
    };
  }, [handleSecondChange]);

  function start() {
    stopwatchRef.current?.start();
  }

  function pause() {
    stopwatchRef.current?.pause();
  }

  function reset() {
    stopwatchRef.current?.reset();
  }

  return [
    {
      start,
      pause,
      reset
    },
    seconds
  ];
}
