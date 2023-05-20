import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

interface IProps {
  animationRef: React.RefObject<HTMLDivElement>;
  result: string;
  finished: boolean;
  className?: string;
}
const ResultInput: React.FC<IProps> = ({ animationRef, result, finished, className }) => {
  return (
    <SWordsResultBlock ref={animationRef} className={cn(className)}>
      <SFinishedResultBlock finished={finished}>{result}</SFinishedResultBlock>
    </SWordsResultBlock>
  );
};

export default ResultInput;

const RESULT_BLOCK_HOVER_CLASS_NAME = 'resultHoverAnimation';

const SWordsResultBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  background: #453080;
  padding: 0.5rem 0.25rem;
  min-height: 3.3rem;
  border-radius: 12px;
  box-shadow: inset 0 -1px 0 #654ea5, inset 0 4px 0 #3e2772;
  color: ${({ theme }) => theme.linguLightFont};
  font-size: 1.5rem;
  transition: transform 0.2s, background 0.5s;
  position: relative;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 2.25rem;
    min-height: 4.4rem;
  }

  &.${RESULT_BLOCK_HOVER_CLASS_NAME} {
    transform: scale(0.94);
  }
`;

const SFinishedResultBlock = styled.div<{ finished: boolean }>`
  width: 100%;
  margin: -0.375rem;
  line-height: 3rem;
  background: ${({ finished }) =>
    finished ? 'linear-gradient(0deg, #39B54A 6.9%, #27A939 94.83%)' : 'transparent'};
  box-shadow: ${({ finished }) =>
    finished ? 'inset 0 4px 0 #58CD68, inset 0 -4px 0 #0B9444' : 'none'};
  border-radius: 10px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    line-height: 4rem;
  }
`;
