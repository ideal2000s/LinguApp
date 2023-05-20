import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';
import { LessonTaskHeader } from '../../LessonTasks/LessonTask';

interface IProps {
  onClick: () => void;
  className?: string;
}

const CloseButton: React.FC<IProps> = ({ onClick, className }) => {
  return <SLessonTaskHeader className={cn(className)} onClose={onClick} />;
};

export default CloseButton;

const SLessonTaskHeader = styled(LessonTaskHeader)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 7;
  margin: 0;
  button {
    margin: 10px;
  }

  ${customMediaQuery('tablet')} {
    button {
      margin: 30px;
    }
  }
`;
