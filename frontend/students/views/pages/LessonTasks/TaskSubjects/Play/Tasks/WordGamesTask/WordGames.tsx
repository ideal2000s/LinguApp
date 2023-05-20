import React, { FC, useMemo, useState } from 'react';
import { IGameRoundAnswer, IPhrase, IWordGamesItem } from 'students/models';
import { gamesMap } from 'students/views/pages/Games';
import TaskGames from 'students/views/pages/Games/TaskGames';

export interface IGameAnswerPayload {
  itemId: number;
  attemptsCount: number;
  rounds: IGameRoundAnswer[];
  timeSpent: number;
}
interface IWordGamesProps {
  lessonId: number;
  items: IWordGamesItem[];
  lessonPhrases: IPhrase[];
  onGameComplete: (payload: IGameAnswerPayload) => void;
  onComplete: () => void;
  onExit: () => void;
}

const WordGames: FC<IWordGamesProps> = ({
  lessonId,
  items,
  lessonPhrases,
  onComplete,
  onExit
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const enabledGames = useMemo(
    () =>
      items
        .filter((item) => item.enabled && gamesMap.has(item.gameType))
        .map((item) => ({
          id: item.id,
          type: item.gameType
        })),
    [items]
  );

  const handleNextGame = () => {
    if (!enabledGames) return;
    const nextIndex = activeIndex + 1;
    if (nextIndex < enabledGames.length) {
      setActiveIndex(nextIndex);
    } else onComplete();
  };

  return (
    <TaskGames
      lessonId={lessonId}
      phrases={lessonPhrases}
      gameType={enabledGames[activeIndex].type}
      onGameComplete={handleNextGame}
      onExit={onExit}
    />
  );
};

export default WordGames;
