import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { SYellowButton } from 'students/views/shared/styled';
import { Spinner } from 'students/views/shared/components/Spinner';

interface IProps {
  onClick: (e: SyntheticEvent) => void;
  className?: string;
  isCompleting?: boolean;
}
const FinishTaskButton: React.FC<IProps> = ({ onClick, className, isCompleting }) => {
  return (
    <SButton onClick={onClick} className={cn(className)} disabled={isCompleting}>
      {isCompleting ? (
        <Spinner />
      ) : (
        // span wrapping is needed here for solving node unmount removing error
        <span>
          <Translate str="frontend.lesson_task.next_button" />
        </span>
      )}
    </SButton>
  );
};

export default FinishTaskButton;

const SButton = styled(SYellowButton)`
  border-radius: 62px;
  box-shadow: 0 4px 10px rgba(13, 97, 120, 0.2);
  font-size: 1.25rem;
  height: 3.75rem;
  width: 100%;
`;
