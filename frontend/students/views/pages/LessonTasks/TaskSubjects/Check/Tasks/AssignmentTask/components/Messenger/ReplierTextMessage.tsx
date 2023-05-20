import React, { FC, useCallback } from 'react';
import { Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { IAssignmentItemMessage } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import AngleArrowIcon from 'students/views/shared/assets/icons/angle_arrow.svg';

import CopyIcon from '../../assets/copy_icon.svg';
import DeleteIcon from '../../assets/delete_icon.svg';
import EditIcon from '../../assets/edit_icon.svg';

import MessageActionsTooltip from './MessageActionsTooltip';

interface IReplierTextMessage {
  message: IAssignmentItemMessage;
  onEdit: (message: string) => void;
  onCopy: () => void;
  onDelete: () => void;
  className?: string;
}

const ReplierTextMessage: FC<IReplierTextMessage> = ({
  message,
  onEdit,
  onCopy,
  onDelete,
  className
}) => {
  const isMobile = useBreakPoint('sm', true);

  const handleOnEdit = useCallback(() => {
    onEdit(message.text || '');
  }, [onEdit, message]);

  const handleOnCopy = useCallback(() => {
    onCopy();
  }, [onCopy]);

  const handleOnDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  const renderTooltip = useCallback(
    (_: () => void, hideTooltip: () => void) => (
      <Tooltip id="options-tooltip">
        <STooltipItem
          onClick={() => {
            hideTooltip();
            handleOnEdit();
          }}
        >
          <UrlIcon url={EditIcon} height="20px" width="20px" color="#5E5D71" />

          <STooltipText>
            <Translate str="frontend.lesson_task.tasks.check.assignment.edit" />
          </STooltipText>
        </STooltipItem>

        <STooltipItem
          onClick={() => {
            hideTooltip();
            handleOnCopy();
          }}
        >
          <UrlIcon url={CopyIcon} height="20px" width="20px" color="#5E5D71" />

          <STooltipText>
            <Translate str="frontend.lesson_task.tasks.check.assignment.copy" />
          </STooltipText>
        </STooltipItem>

        <STooltipItem
          onClick={() => {
            hideTooltip();
            handleOnDelete();
          }}
        >
          <UrlIcon url={DeleteIcon} height="20px" width="20px" color="#5E5D71" />

          <STooltipText>
            <Translate str="frontend.lesson_task.tasks.check.assignment.delete" />
          </STooltipText>
        </STooltipItem>
      </Tooltip>
    ),
    [handleOnEdit, handleOnCopy, handleOnDelete]
  );

  if (isMobile) {
    return (
      <MessageActionsTooltip popover={renderTooltip}>
        {(_toggleTooltip) => (
          <SMessage className={cn(className)}>
            {' '}
            {/* onClick={toggleTooltip} [TODO] uncomment when Edit/Delete functionality is ready */}
            <SMessageText dangerouslySetInnerHTML={{ __html: message.text || '' }} />
          </SMessage>
        )}
      </MessageActionsTooltip>
    );
  }

  return (
    <SMessage className={cn(className)}>
      <SMessageText>{message.text}</SMessageText>

      <SOptionsBlock>
        <MessageActionsTooltip popover={renderTooltip}>
          {(_toggleTooltip) => (
            <SIconWrapper className="tooltip-arrow">
              {' '}
              {/* onClick={toggleTooltip} [TODO] uncomment when Edit/Delete functionality is ready */}
              <UrlIcon url={AngleArrowIcon} color="#5E5D71" height="12px" width="12px" />
            </SIconWrapper>
          )}
        </MessageActionsTooltip>
      </SOptionsBlock>
    </SMessage>
  );
};

export default ReplierTextMessage;

const SMessage = styled.div`
  background: #d9d7e5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  position: relative;
  padding: 16px;
  width: 100%;
  max-width: 95%;
  align-self: flex-end;

  ${customMediaQuery('tablet')} {
    padding: 20px;
    max-width: 85%;

    /* [TODO] uncomment when Edit/Delete functionality is ready */
    .tooltip-arrow {
      display: none;
    }
    //&:hover {
    //  .tooltip-arrow {
    //    opacity: 1;
    //  }
    //}
  }

  &:before {
    content: '';
    display: block;
    border-top: 3px solid #d9d7e5;
    border-right: 10px solid #d9d7e5;
    border-bottom: 3px solid transparent;
    border-left: 10px solid transparent;
    position: absolute;
    bottom: -6px;
    right: 0;
  }
`;

const SMessageText = styled.p`
  margin: 0;
  color: #2d2d3a;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
`;

const SOptionsBlock = styled.div`
  display: none;
  position: absolute;
  top: 6px;
  right: 6px;
  cursor: pointer;

  ${customMediaQuery('tablet')} {
    display: block;
  }
`;

const SIconWrapper = styled.div`
  border-radius: 4px;
  background: rgba(94, 93, 113, 0.2);
  padding: 4px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const STooltipItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  & > div {
    margin-right: 8px;
  }
`;

const STooltipText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  color: #2d2d3a;
`;
