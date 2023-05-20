import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import SkipItemButton from './SkipItemButton';
import { customMediaQuery } from 'students/views/shared/styled';

interface IProps {
  className?: string;
  currentIndex: number;
  itemsNumber: number;
  onNext?: () => void;
}
const DashedPagination: React.FC<IProps> = ({
  className,
  currentIndex,
  itemsNumber,
  onNext
}) => {
  return (
    <SWrapper className={cn(className)}>
      <SDashedPagination className={cn(className)}>
        {Array(itemsNumber)
          .fill(0)
          .map((_, index) => (
            <SDash key={index} passed={currentIndex >= index} />
          ))}
      </SDashedPagination>

      {onNext && <SSkipItemButton onNext={onNext} />}
    </SWrapper>
  );
};

export default DashedPagination;

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const SDashedPagination = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const SDash = styled.div<{ passed: boolean }>`
  width: 0.75rem;
  height: 0.25rem;
  border-radius: 1rem;
  background: ${({ passed }) => (passed ? '#ffffff' : '#00000030')};
  margin: 0.25rem;

  ${customMediaQuery('tablet')} {
    width: 1.375rem;
    margin: 0.5rem;
  }
`;

const SSkipItemButton = styled(SkipItemButton)`
  margin-left: 44px;
`;
