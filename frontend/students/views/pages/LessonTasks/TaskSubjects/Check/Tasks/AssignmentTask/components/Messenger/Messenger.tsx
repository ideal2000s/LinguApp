import cn from 'classnames';
import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { t, Translate } from 'i18n';
import {
  IAssignmentItemMessage,
  IAssignmentReviewerTeam,
  MessengerInputType,
  MessengerSenderType
} from 'students/models';
import { Spinner } from 'students/views/shared/components/Spinner';
import { NextButton } from 'students/views/shared/components/Buttons';
import {
  customMediaQuery,
  SPrimaryButton,
  SSecondaryButton
} from 'students/views/shared/styled';

import ReviewerBio from '../ReviewerBio';
import FeedbackMessage from './FeedbackMessage';
import ReplierAudioMessage from './ReplierAudioMessage';
import ReplierTextMessage from './ReplierTextMessage';
import ReplyAudioRecorder from './ReplyAudioRecorder';
import ReplyTextarea from './ReplyTextarea';
import SenderMessage from './SenderMessage';

interface IMessenger {
  messages: IAssignmentItemMessage[];
  reviewer: IAssignmentReviewerTeam | null;
  minimumWordsCount: number;
  minimalRecordingTime: number;
  onSkip: () => void;
  onSend: (data: string | Blob | null, type: MessengerInputType) => void;
  inputType: MessengerInputType;
  isLoading: boolean;
  className?: string;
}

const Messenger: FC<IMessenger> = ({
  messages,
  reviewer,
  minimumWordsCount,
  minimalRecordingTime,
  onSkip,
  onSend,
  inputType,
  isLoading,
  className
}) => {
  const [showReplyBlock, setShowReplyBlock] = useState<boolean>(false);
  const [inputAnswerDefaultMessage, _setInputAnswerDefaultMessage] = useState<string>('');

  const renderMessage = (message: IAssignmentItemMessage, index: number) => {
    if (message.from === MessengerSenderType.Into) {
      return <SenderMessage key={index} message={message} />;
    } else if (message.from === MessengerSenderType.Out) {
      switch (message.type) {
        case MessengerInputType.Text:
          return (
            <ReplierTextMessage
              key={index}
              message={message}
              onEdit={handleOnTextEdit}
              onCopy={() => console.log('copy message')}
              onDelete={() => console.log('delete message')}
            />
          );

        case MessengerInputType.Audio:
          return (
            <ReplierAudioMessage
              key={index}
              audioURL={message.audioURL || ''}
              onEdit={() => console.log('edit message')}
              onDelete={() => console.log('delete message')}
            />
          );

        case MessengerInputType.File:
          return null;
      }
    }

    return null;
  };

  const showReply = useCallback(() => {
    setShowReplyBlock(true);
  }, [setShowReplyBlock]);

  const hideReply = useCallback(() => {
    setShowReplyBlock(false);
  }, [setShowReplyBlock]);

  const handleOnTextSend = (answer: string) => {
    onSend(answer, MessengerInputType.Text);
    hideReply();
  };

  const handleOnTextEdit = (_message: string) => {
    console.log('On edit...');
    // _setInputAnswerDefaultMessage(message);
    // showReply();
  };

  const handleOnRecordSend = (record: Blob | null) => {
    onSend(record, MessengerInputType.Audio);
    hideReply();
  };

  const renderReplyBlock = () => {
    switch (inputType) {
      case MessengerInputType.Text:
        return (
          <SReplyTextarea
            onSend={handleOnTextSend}
            minimumWordsCount={minimumWordsCount}
            defaultValue={inputAnswerDefaultMessage}
          />
        );

      case MessengerInputType.Audio:
        return (
          <SReplyAudioRecorder
            handleRecordSend={handleOnRecordSend}
            minimumRecordingTime={minimalRecordingTime}
          />
        );

      case MessengerInputType.File:
        /* [TODO] Temporary display Next button, until we have this functionality on the back-end side */
        return (
          <SNextButton
            size="90px"
            className="m-0"
            onClick={onSkip}
            disabled={isLoading}
            iconColor="#00A5D7"
          />
        );
    }

    return null;
  };

  const renderFooter = () => {
    if (isLoading) {
      return <SSpinner loading />;
    }

    if (
      messages.findIndex(
        (message: IAssignmentItemMessage) => message.from === MessengerSenderType.Out
      ) > -1
    ) {
      return (
        <>
          <SFeedbackMessage
            message={t(
              'frontend.lesson_task.tasks.check.assignment.author_will_check_your_answer',
              { author: reviewer?.name || '' }
            )}
          />

          <SNextButton
            size="90px"
            className="m-0"
            onClick={onSkip}
            disabled={isLoading}
            iconColor="#00A5D7"
          />
        </>
      );
    }

    return showReplyBlock ? (
      renderReplyBlock()
    ) : (
      <SStartActionsBlock>
        <SSecondaryBtn onClick={onSkip}>
          <Translate str="frontend.lesson_task.tasks.check.assignment.skip" />
        </SSecondaryBtn>

        <SPrimaryBtn onClick={showReply}>
          <Translate str="frontend.lesson_task.tasks.check.assignment.accept" />
        </SPrimaryBtn>
      </SStartActionsBlock>
    );
  };

  return (
    <SWrapper className={cn(className)}>
      {reviewer && <SReviewerBio reviewer={reviewer} />}

      <SMessagesBlock>{messages.map(renderMessage)}</SMessagesBlock>

      {renderFooter()}
    </SWrapper>
  );
};

export default Messenger;

const SWrapper = styled.div`
  background: linear-gradient(180deg, #ececf7 0%, rgba(236, 236, 247, 0.9) 100%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 28px 16px;
  margin: 0 -1rem -1rem;
  width: calc(100% + 2rem);
  position: relative;

  ${customMediaQuery('tablet')} {
    margin: 0;
    width: 100%;
    padding: 30px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const SReviewerBio = styled(ReviewerBio)`
  transform: translateY(-50%);
`;

const SMessagesBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: -30px;

  & > div {
    margin-bottom: 16px;
  }
`;

const SStartActionsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 40px;

  & > button {
    width: 100%;

    &:first-child {
      margin-right: 14px;

      ${customMediaQuery('tablet')} {
        margin-right: 20px;
      }
    }
  }
`;

const SPrimaryBtn = styled(SPrimaryButton)`
  box-shadow: 0 0 10px rgba(11, 63, 79, 0.26);
  min-height: 3.125rem;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:disabled {
    background-color: rgb(0, 165, 215) !important;
  }
`;

const SSecondaryBtn = styled(SSecondaryButton)`
  background-color: rgba(45, 45, 58, 0.1) !important;
  color: rgba(45, 45, 58, 0.8) !important;
  min-height: 3.125rem;
  font-size: 1rem;
  transition: color 0.3s, background-color 0.3s;

  &:disabled {
    background-color: rgba(45, 45, 58, 0.1) !important;
    opacity: 0.8;
  }
`;

const SReplyTextarea = styled(ReplyTextarea)`
  margin: 0 -16px -28px;
  width: calc(100% + 32px);

  ${customMediaQuery('tablet')} {
    margin: 0;
    width: 100%;
  }
`;

const SReplyAudioRecorder = styled(ReplyAudioRecorder)``;

const SSpinner = styled(Spinner)`
  margin: 50px 0;
`;

const SFeedbackMessage = styled(FeedbackMessage)`
  margin-top: 30px;
`;

const SNextButton = styled(NextButton)`
  margin: 80px auto 10px !important;

  ${customMediaQuery('tablet')} {
    margin: 40px auto -60px !important;
  }
`;
