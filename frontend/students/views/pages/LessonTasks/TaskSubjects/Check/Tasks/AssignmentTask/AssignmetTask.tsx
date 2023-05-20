import React, { FC, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { t } from 'i18n';
import {
  IAssignmentTask,
  IAssignmentTaskSession,
  IDocumentComment,
  MessengerInputType,
  MessengerSenderType
} from 'students/models';
import { documentActions, documentSelectors } from 'students/stores/document';
import { lessonTaskActions } from 'students/stores/lessonTask';
import { requestingSelectors } from 'students/stores/requesting';
import { customMediaQuery } from 'students/views/shared/styled';

import Messenger from './components/Messenger';
import Tag from './components/Tag';
import AudioIcon from './assets/audio_icon.svg';
import EssayIcon from './assets/essay_icon.svg';
import FileIcon from './assets/file_icon.svg';
import { ICheckTaskProps } from '..';

export enum AssignmentTaskType {
  Essay = 'Tasks::Essay',
  Audio = 'Tasks::Audio',
  File = 'Tasks::File'
}

const CheckAssignmentTask: FC<
  ICheckTaskProps<IAssignmentTask, IAssignmentTaskSession>
> = ({ task, isCompleting, onSkip }) => {
  const dispatch = useDispatch();
  const document = useSelector(documentSelectors.selectDocument);
  const isLoading = useSelector(
    requestingSelectors.selectHasRequestingActions([
      lessonTaskActions.fetchLessonTask.typePrefix,
      documentActions.fetchDocument.typePrefix,
      documentActions.createDocument.typePrefix
    ])
  );
  const messengerInputType = useRef<MessengerInputType>(MessengerInputType.Text);
  const taskTag = useRef<{ text: string; icon?: string }>({
    text: t('frontend.lesson_task.tasks.check.assignment.unknown_task_type')
  });

  useEffect(() => {
    if (task.id && !isCompleting) {
      dispatch(documentActions.fetchDocument({ task }));
    }
  }, [task, isCompleting, dispatch]);

  useEffect(() => {
    if (task.id) {
      switch (task.type) {
        case AssignmentTaskType.Essay:
          messengerInputType.current = MessengerInputType.Text;

          taskTag.current = {
            text: t('frontend.lesson_task.tasks.check.assignment.write_essay'),
            icon: EssayIcon
          };

          break;

        case AssignmentTaskType.Audio:
          messengerInputType.current = MessengerInputType.Audio;

          taskTag.current = {
            text: t('frontend.lesson_task.tasks.check.assignment.record_voice'),
            icon: AudioIcon
          };

          break;

        case AssignmentTaskType.File:
          messengerInputType.current = MessengerInputType.File;

          taskTag.current = {
            text: t('frontend.lesson_task.tasks.check.assignment.upload_files'),
            icon: FileIcon
          };

          break;
      }
    }
  }, [task]);

  const handleSkip = () => {
    documentActions.drop();
    onSkip();
  };

  const handleReply = (reply: string | Blob | null, type: MessengerInputType) => {
    if (type === MessengerInputType.Text) {
      dispatch(
        documentActions.createDocument({ task, data: { content: reply as string } })
      );
    }

    if (type === MessengerInputType.Audio) {
      const data = new FormData();
      data.append('document[audio]', reply as Blob, 'audio.mp3');

      dispatch(documentActions.createDocument({ task, data }));
    }
  };

  const chatMessages = useMemo(() => {
    const messages = [];
    messages.push({
      from: MessengerSenderType.Into,
      imageURL: task.imageURL,
      type: MessengerInputType.Text,
      audioURL: task.audioURL,
      text: task.introduction,
      title: null,
      videoURL: task.videoURL,
      mobileImageURL: task.mobileImageURL,
      giphyImage: task.giphyImage,
      coverImg: task.coverImg
    });

    if (document) {
      messages.push({
        from: MessengerSenderType.Out,
        type: document.audioURL ? MessengerInputType.Audio : MessengerInputType.Text,
        imageURL: null,
        audioURL: document.audioURL,
        text: document.content,
        title: null
      });

      if (document.comments.length) {
        document.comments.forEach((comment: IDocumentComment) => {
          messages.push({
            from:
              comment.author.type === 'User'
                ? MessengerSenderType.Into
                : MessengerSenderType.Out,
            type: MessengerInputType.Text,
            imageURL: null,
            audioURL: comment.audioURL,
            text: comment.content,
            title: null
          });
        });
      }
    }

    return messages;
  }, [document, task]);

  return (
    <STaskWrapper>
      <SHeaderBlock>
        <Tag text={taskTag.current.text} icon={taskTag.current?.icon} />

        <STaskTitle>{task.title}</STaskTitle>
      </SHeaderBlock>

      <Messenger
        messages={chatMessages}
        reviewer={task.reviewer}
        minimumWordsCount={task.items[0].minimumWords || 0}
        minimalRecordingTime={task.items[0].minimumDuration || 0}
        inputType={messengerInputType.current}
        onSkip={handleSkip}
        onSend={handleReply}
        isLoading={isLoading}
      />
    </STaskWrapper>
  );
};

export default CheckAssignmentTask;

const STaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${customMediaQuery('tablet')} {
    margin: 0 0 30px;
    align-items: center;
    align-self: center;
    max-width: 664px;
  }
`;

const SHeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 80px;
`;

const STaskTitle = styled.h2`
  color: #fbfcff;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.875rem;
  text-align: center;
  padding: 0;
  margin: 16px 0 0;

  ${customMediaQuery('tablet')} {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }
`;
