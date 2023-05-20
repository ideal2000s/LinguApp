import React from 'react';
import styled from 'styled-components';
import { LottieOptions } from 'lottie-react';
import LottieIcon from 'students/views/shared/components/LottieIcon';

interface IProps {
  animationData: LottieOptions['animationData'];
  top: string;
  left: string;
}

const HandHint: React.FC<IProps> = ({ animationData, top, left }) => {
  return (
    <SHintWrapper style={{ top, left }}>
      <LottieIcon width="6rem" loop={false} autoPlay animationJSONData={animationData} />
    </SHintWrapper>
  );
};

export default HandHint;

const SHintWrapper = styled.div`
  position: absolute;
  z-index: 999;
`;
