import React, { FC, useCallback } from 'react';
import { Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import AngleArrowIcon from 'students/views/shared/assets/icons/angle_arrow.svg';

import AudioMessage from './AudioMessage';
import MessageActionsTooltip from './MessageActionsTooltip';
import RecordIcon from '../../assets/record_icon.svg';
import DeleteIcon from '../../assets/delete_icon.svg';

interface IReplierAudioMessage {
  audioURL: string;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

const ReplierAudioMessage: FC<IReplierAudioMessage> = ({
  audioURL,
  onEdit,
  onDelete,
  className
}) => {
  const isMobile = useBreakPoint('sm', true);

  const handleOnEdit = useCallback(() => {
    onEdit();
  }, [onEdit]);

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
          <UrlIcon url={RecordIcon} height="20px" width="20px" color="#5E5D71" />

          <STooltipText>
            <Translate str="frontend.lesson_task.tasks.check.assignment.record_again" />
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
            <Translate str="frontend.lesson_task.tasks.check.assignment.delete_record" />
          </STooltipText>
        </STooltipItem>
      </Tooltip>
    ),
    [handleOnEdit, handleOnDelete]
  );

  if (isMobile) {
    return (
      <MessageActionsTooltip popover={renderTooltip}>
        {(_toggleTooltip) => (
          <SMessage className={cn(className)}>
            {' '}
            {/* onClick={toggleTooltip} [TODO] uncomment when Edit/Delete functionality is ready */}
            <SAudioMessage audioURL={audioURL} audioSize={3} id="replier_audio_message" />
          </SMessage>
        )}
      </MessageActionsTooltip>
    );
  }

  return (
    <SMessage className={cn(className)}>
      <SAudioMessage audioURL={audioURL} audioSize={3} id="replier_audio_message" />

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

export default ReplierAudioMessage;

const SMessage = styled.div`
  background: #d9d7e5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  position: relative;
  width: 100%;
  max-width: 95%;
  align-self: flex-end;

  ${customMediaQuery('tablet')} {
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

const SAudioMessage = styled(AudioMessage)`
  margin-bottom: 4px;

  & > div {
    background: transparent;
    width: 95%;
  }

  ${customMediaQuery('tablet')} {
    & > div {
      width: 85%;
    }
  }
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
