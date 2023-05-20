import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import Spinner, { ISpinnerProps } from './Spinner';

interface IProps extends ISpinnerProps {
  width?: string;
  height?: string;
  className?: string;
}
const SpinnerBlock: React.FC<IProps> = ({
  width = '80px',
  height = '80px',
  className,
  ...spinnerProps
}) => {
  return (
    <SSpinnerBlock className={cn(className)} width={width} height={height}>
      <Spinner {...spinnerProps} />
    </SSpinnerBlock>
  );
};

export default SpinnerBlock;

const SSpinnerBlock = styled.div<{ width?: string; height?: string }>`
  ${({ width }) => (width ? 'width: ' + width + ';' : '')};
  ${({ height }) => (height ? 'height: ' + height + ';' : '')};
  background: #ffffff60;
  border-radius: 10px;
`;
