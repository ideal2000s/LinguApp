import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { SPage } from 'students/views/shared/styled/SPage';

interface IProps {
  solidColor?: string;
  gradient?: string;
  bgImage?: string;
  bgSize?: string;
  style?: React.CSSProperties;
  className?: string;
}

const PageWithBg: React.FC<IProps> = ({
  solidColor,
  gradient,
  bgImage,
  bgSize,
  children,
  style,
  className
}) => {
  return (
    <SPage style={style} className={cn(className)}>
      <SBackgroundWrapper
        gradient={gradient || solidColor}
        bgImage={bgImage}
        bgSize={bgSize}
      />

      <SContentWrapper>{children}</SContentWrapper>
    </SPage>
  );
};

export default PageWithBg;

const SBackgroundWrapper = styled.div<{
  gradient?: string;
  bgImage?: string;
  bgSize?: string;
}>`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ gradient }) => gradient || ''};
  z-index: -1;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    ${({ bgImage, gradient }) => (bgImage ? `background: ${bgImage}, ${gradient};` : '')};
    background-size: ${({ bgSize }) => bgSize || 'contain'};
    background-repeat: no-repeat, no-repeat;
    background-position-x: left, right;
  }
`;

const SContentWrapper = styled.div`
  top: 0;
  z-index: 1;
  //width: 100vw;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
