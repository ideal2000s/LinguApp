import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import LottieIcon from 'students/views/shared/components/LottieIcon';

import LessonsCatalogContext from '../../LessonsCatalogContext';
import loaderAnimation from '../../../assets/loader_animation.json';

interface ILoadingBackground {
  className?: string;
}

const LoadingBackground: FC<ILoadingBackground> = ({ className }) => {
  const { catalogIsLoading } = useContext(LessonsCatalogContext);

  return catalogIsLoading ? (
    <SWrapper className={cn(className)}>
      <LottieIcon
        animationJSONData={loaderAnimation}
        autoPlay
        height="120px"
        width="120px"
      />
    </SWrapper>
  ) : null;
};

export default LoadingBackground;

const SWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;
