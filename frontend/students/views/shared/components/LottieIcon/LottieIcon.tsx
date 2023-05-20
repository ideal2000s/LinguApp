import React, { CSSProperties, FC, useEffect, useRef } from 'react';
import Lottie, { LottieOptions, LottieRef } from 'lottie-react';
import cn from 'classnames';

interface ILottieIcon {
  animationJSONData: LottieOptions['animationData'];
  loop?: boolean;
  autoPlay?: boolean;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
  speed?: number;
}

const LottieIcon: FC<ILottieIcon> = ({
  animationJSONData,
  loop,
  autoPlay,
  className,
  width,
  height,
  title,
  speed
}) => {
  const lottieRef: LottieRef = useRef(null);
  useEffect(() => {
    if (speed) lottieRef.current?.setSpeed(speed);
  }, [speed]);

  const style: CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <Lottie
      lottieRef={lottieRef}
      rendererSettings={{
        className: cn(className),
        preserveAspectRatio: 'xMidYMid slice'
      }}
      animationData={animationJSONData}
      loop={loop}
      autoplay={autoPlay}
      style={style}
      title={title}
    />
  );
};

export default LottieIcon;
