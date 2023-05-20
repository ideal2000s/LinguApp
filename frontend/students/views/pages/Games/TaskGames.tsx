import React, { FC, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { IGameRoundAnswer, IPhrase, tGameType } from 'students/models';
import { gamesConfigMap, gamesMap } from '.';
import { gameplaysActions, lessonSelectors } from 'students/stores/lesson';
import { tAppState } from 'students/stores/rootStore';

export interface IGameAnswerPayload {
  itemId: number;
  attemptsCount: number;
  rounds: IGameRoundAnswer[];
  timeSpent: number; //seconds
}

type tProps = ConnectedProps<typeof connector>;
interface IWordGamesProps extends tProps {
  onGameComplete: () => void;
  onExit: () => void;
  lessonId: number;
  phrases: IPhrase[];
  gameType: tGameType;
}

const TaskGames: FC<IWordGamesProps> = ({
  playStudentWord,
  createLessonGameplay,
  finishLessonGameplay,
  lessonGameplay,
  onGameComplete,
  gameType,
  lessonId,
  phrases,
  onExit
}) => {
  const gameStartTime = useRef<number | null>(null);
  const attempts = useRef(0);

  // TODO: Use gameplay from gameplays api when it will be ready
  // const phrases = lessonGameplay?.words;
  // const gameType = lessonGameplay?.gameplay.gameType;
  const gameConfig = gamesConfigMap.get(gameType);

  useEffect(() => {
    gameStartTime.current = Date.now();
    if (!isNaN(lessonId)) {
      createLessonGameplay(lessonId);
    }
  }, [createLessonGameplay, lessonId, gameType]);

  const ActiveGame = useMemo(() => {
    if (!gameType) return null;
    return gamesMap.get(gameType);
  }, [gameType]);

  const handleNextGame = () => {
    if (!isNaN(lessonId) && lessonGameplay && gameStartTime.current) {
      finishLessonGameplay({
        lessonId: lessonId,
        gameplayId: lessonGameplay.gameplay.id,
        params: {
          timeSpent: getSecondsNumber(Date.now() - gameStartTime.current),
          attempts: attempts.current,
          xpEarned: 0
        }
      });
    }
    gameStartTime.current = null;
    onGameComplete && onGameComplete();
  };

  const handleRoundComplete = (answer: IGameRoundAnswer) => {
    const { word, solved } = answer;
    const wordId = phrases?.find((phrase) => phrase.body === word)?.id;
    if (wordId) playStudentWord({ wordId, solved });
    if (!solved) attempts.current += 1;
  };

  return (
    <SGameWrapper>
      {ActiveGame && (
        <ActiveGame
          difficulty={gameConfig?.difficulty}
          maxRounds={gameConfig?.maxRounds}
          phrases={phrases}
          onNext={handleNextGame}
          onRoundComplete={handleRoundComplete}
          onExit={onExit}
        />
      )}
    </SGameWrapper>
  );
};

const mapStateToProps = (state: tAppState) => {
  return {
    lessonGameplay: lessonSelectors.selectLessonGameplays(state)
  };
};

const mapDispatchToProps = {
  createLessonGameplay: gameplaysActions.createLessonGameplay,
  playStudentWord: gameplaysActions.playStudentWord,
  finishLessonGameplay: gameplaysActions.finishLessonGameplay
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(TaskGames);

function getSecondsNumber(ms: number): number {
  return Math.floor(ms / 1000);
}
const SGameWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;
