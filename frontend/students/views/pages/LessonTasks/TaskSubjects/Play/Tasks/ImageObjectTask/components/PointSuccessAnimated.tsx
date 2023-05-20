import React from 'react';
import LottieIcon from 'students/views/shared/components/LottieIcon';
import correctPointAnimationData from '../assets/CorrectPointShadowsOn.json';
import { IPointOptions } from '../ImageObjectItem';
import { SPointWrapper } from './styled';

interface IProps {
  coordinates: IPointOptions;
  size: {
    height: number;
    width: number;
  };
}

const PointSuccessAnimated: React.FC<IProps> = ({ coordinates, size }) => {
  return (
    <SPointWrapper
      key={coordinates.top * coordinates.left}
      top={coordinates.top}
      left={coordinates.left}
      height={size.height}
      width={size.width}
    >
      <LottieIcon
        animationJSONData={correctPointAnimationData}
        width={`${size.width}rem`}
        height={`${size.height}rem`}
        loop={false}
        autoPlay={true}
        speed={2}
      />
    </SPointWrapper>
  );
};

export default PointSuccessAnimated;
