import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';

import LottieIcon from '../LottieIcon';

interface IAnimatedIcon {
  animationUrl: string;
  loop?: boolean;
  autoPlay?: boolean;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
}

const AnimatedIcon: FC<IAnimatedIcon> = ({
  animationUrl,
  loop = true,
  autoPlay = true,
  width,
  height,
  title,
  className
}) => {
  const [animationData, setAnimationData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (animationUrl) {
      axios
        .get<AxiosResponse<Record<string, any>>>(animationUrl)
        .then(({ data: animatedImage }) => {
          const animation = parseAnimatedImage(animatedImage);
          setAnimationData(animation);
        });
    }
  }, [animationUrl]);

  if (!animationData) {
    return null;
  }

  return (
    <LottieIcon
      animationJSONData={animationData}
      height={height}
      width={width}
      loop={loop}
      autoPlay={autoPlay}
      title={title}
      className={className}
    />
  );
};

export default AnimatedIcon;

function parseAnimatedImage(animation: any) {
  if (typeof animation === 'object') return animation;
  else if (typeof animation === 'string') {
    return JSON.parse(animation);
  } else return null;
}
