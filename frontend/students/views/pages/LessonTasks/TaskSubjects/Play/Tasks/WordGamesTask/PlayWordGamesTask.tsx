import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import styled from 'styled-components';
import { IPlayTaskProps, tPlayTaskComponentType } from '..';
import {
  IWordGamesTask,
  IWordGamesTaskSession,
  tWordGamesAnswer
} from 'students/models/lessonTasks/wordGamesTask';
import { IGameAnswerPayload } from 'students/views/pages/LessonTasks/TaskSubjects/Play/Tasks/WordGamesTask/WordGames';
import { SGameTaskWrapper } from '../../common/components';
import WordGames from './WordGames';

const PlayWordGames: tPlayTaskComponentType<
  IPlayTaskProps<IWordGamesTask, IWordGamesTaskSession>
> = ({ taskSession, lessonPhrases, task, onExit, className, onSkip }) => {
  const { items, lessonId } = task;
  const answers = useRef<tWordGamesAnswer>([]);

  useEffect(() => {
    if (lessonPhrases && !lessonPhrases.length) onSkip?.();
  }, [lessonPhrases, onSkip]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      answers.current = taskSession.taskItemSessions;
    } else {
      answers.current = items.map((item, index) => {
        return {
          id: index,
          taskItemId: item.id,
          completed: false,
          attemptsCount: 0,
          timeSpent: 0,
          rounds: []
        };
      });
    }
  }, [taskSession, items]);

  const handleCompleteTask = () => {
    onSkip?.();
  };

  const handleCompleteGame = (payload: IGameAnswerPayload) => {
    const { itemId, attemptsCount, timeSpent, rounds } = payload;
    const answerIndex = answers.current.findIndex(
      (answer) => answer.taskItemId === itemId
    );
    if (answerIndex < 0) return;
    const newAnswers = cloneDeep(answers.current);
    newAnswers[answerIndex].completed = true;
    newAnswers[answerIndex].attemptsCount = attemptsCount;
    newAnswers[answerIndex].timeSpent = timeSpent;
    newAnswers[answerIndex].rounds = rounds;
    answers.current = newAnswers;
  };

  const handleExit = () => {
    onExit && onExit();
  };

  if (!lessonPhrases || !lessonPhrases.length) return null;
  return (
    <SGameTaskWrapper className={cn(className)}>
      <WordGames
        lessonId={lessonId}
        items={items}
        lessonPhrases={lessonPhrases}
        onGameComplete={handleCompleteGame}
        onComplete={handleCompleteTask}
        onExit={handleExit}
      />
    </SGameTaskWrapper>
  );
};

export default PlayWordGames;

PlayWordGames.backgroundComponent = styled.div`
  background-color: #fff;
`;
