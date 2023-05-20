import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import format from 'date-fns/format';
import cn from 'classnames';

interface ICountdown {
  date: number;
  onEnd?: () => void;
  className?: string;
}

const Countdown: FC<ICountdown> = ({ date, onEnd, className }) => {
  const [countdown, setCountdown] = useState<number>(0);
  const interval = useRef<number | null>(null);

  const handleIntervalEnd = useCallback(() => {
    interval?.current && clearInterval(interval.current);

    onEnd && onEnd();
  }, [interval, onEnd]);

  useEffect(() => {
    interval?.current && clearInterval(interval.current);

    interval.current = window.setInterval(() => {
      const now = Date.now();

      setCountdown(date - now);

      if (date - now < 1000) {
        handleIntervalEnd();
      }
    }, 1000);

    return () => {
      interval?.current && clearInterval(interval.current);
    };
  }, [date, handleIntervalEnd]);

  return <div className={cn(className)}>{format(new Date(countdown), 'mm:ss')}</div>;
};

export default Countdown;
