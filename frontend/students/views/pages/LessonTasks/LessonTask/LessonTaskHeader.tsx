import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { CloseButton } from 'students/views/shared/components/Buttons';
import { customMediaQuery } from 'students/views/shared/styled';

interface ILessonTaskHeader {
  onClose?: () => void;
  lessonTitle?: string;
  taskTitle?: string;
  lightFont?: boolean;
  className?: string;
}

const LessonTaskHeader: React.FC<ILessonTaskHeader> = ({
  onClose,
  lessonTitle,
  lightFont,
  className
}) => (
  <STaskHeader className={cn(className)}>
    <SLessonTitleBlock>
      {!!lessonTitle && (
        <SLessonTitle color={lightFont ? '#fbfcff;' : 'black'}>
          {lessonTitle}
        </SLessonTitle>
      )}
    </SLessonTitleBlock>

    <SExitButtonBlock>{!!onClose && <CloseButton onClick={onClose} />}</SExitButtonBlock>
  </STaskHeader>
);

export default LessonTaskHeader;

const STaskHeader = styled.div`
  color: white;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 999;

  ${customMediaQuery('tablet')} {
    margin-bottom: 3.5rem;
  }
`;

const SLessonTitleBlock = styled.div`
  text-align: center;
  margin: 0 auto;
  font-size: 1rem;
  color: #fbfcff;
  letter-spacing: -0.41px;
  font-weight: bold;
  padding: 0 2rem;

  ${customMediaQuery('tablet')} {
    letter-spacing: normal;
    font-weight: normal;
    opacity: 0.6;
    padding: 0 2.5rem;
  }
`;

const SLessonTitle = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1rem;
  line-height: 2rem;

  ${customMediaQuery('tablet')} {
    font-size: 1.375rem;
    line-height: 3.35rem;
  }
`;

const SExitButtonBlock = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  max-height: 1.8rem;

  ${customMediaQuery('desktop')} {
    max-height: 3.35rem;
  }
`;
