import React, { useEffect, useMemo, useState } from 'react';
import { ProgressBar, Image } from 'react-bootstrap';
import styled from 'styled-components';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import characterThumbUp from 'students/views/shared/assets/character-thumbs-up-blue.svg';
import characterConfused from 'students/views/shared/assets/character-confused.svg';
import { ITaskResultsResponse } from 'students/models/lessonTasks/results';
import { SMessage } from './LessonIsFinished';

type tResultType = 'bad' | 'good' | 'great';
interface IProps {
  score: number;
  total: number;
  tasks: ITaskResultsResponse['tasks'];
}

const LessonFinishedResult: React.FC<IProps> = ({ score, total, tasks }) => {
  const [resultType, setResultType] = useState<tResultType>('good');

  useEffect(() => {
    const percent = Math.floor((score / total) * 100);
    if (percent >= 0 && percent < 26) {
      setResultType('bad');
    } else if (percent >= 26 && percent <= 70) {
      setResultType('good');
    } else {
      setResultType('great');
    }
  }, [score, total]);

  const resultMessage = useMemo(() => {
    switch (resultType) {
      case 'good':
        return <Translate str="frontend.lesson_task.finished.good_result_message" />;

      case 'bad':
        return <Translate str="frontend.lesson_task.finished.bad_result_message" />;

      case 'great':
        return <Translate str="frontend.lesson_task.finished.great_result_message" />;

      default:
        return <Translate str="frontend.lesson_task.finished.good_result_message" />;
    }
  }, [resultType]);

  return (
    <>
      <SImageWrapper>
        <Image
          src={
            resultType === 'great' || !tasks.length ? characterThumbUp : characterConfused
          }
        />
      </SImageWrapper>
      <div>
        {tasks.length ? (
          <>
            <SMessage>{resultMessage}</SMessage>
            {resultType !== 'great' ? (
              <SSubMessage>
                <Translate str="frontend.lesson_task.finished.train_more" />
              </SSubMessage>
            ) : null}
            <SProgressContainer>
              <SProgress $resultType={resultType} max={total} now={score} />
              <SProgressLabel>
                <SScore $resultType={resultType}>{score}</SScore>/{total}
              </SProgressLabel>
            </SProgressContainer>
          </>
        ) : (
          <SMessage>
            <Translate str="frontend.lesson_task.finished.you_finished_lesson" />
          </SMessage>
        )}
      </div>
    </>
  );
};

export default LessonFinishedResult;

const SProgress = styled(ProgressBar)<{ $resultType: tResultType }>`
  flex-grow: 1;
  border-radius: 2rem;
  height: 0.75rem;
  background: #d6cfe7;

  .progress-bar {
    background: ${({ $resultType }) => {
      switch ($resultType) {
        case 'good':
          return '#F9A450';
        case 'bad':
          return 'red';
      }
      return 'linear-gradient(95.74deg, #00bce8 0.64%, #0082b2 99.16%)';
    }};
    transform: matrix(-1, 0, 0, 1, 0, 0);
    border-radius: 2rem;
  }
`;

const SScore = styled.span<{ $resultType: tResultType }>`
  color: ${({ $resultType }) => {
    switch ($resultType) {
      case 'good':
        return '#F9A450';
      case 'bad':
        return 'red';
    }
    return '#00A5D7';
  }};
`;

const SProgressLabel = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 1.25rem;
  color: #d6cfe7;

  ${customMediaQuery('tablet')} {
    font-size: 1.75rem;
  }
`;

const SProgressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SImageWrapper = styled.div`
  width: 6.25rem;
  height: 9.875rem;
  position: absolute;
  left: -1.25rem;
  bottom: -0.25rem;

  ${customMediaQuery('tablet')} {
    width: 9.375rem;
  }
`;

const SSubMessage = styled.p`
  font-size: 0.875rem;
  line-height: 1.125rem;
  color: #5e5d71;
  opacity: 0.9;
`;
