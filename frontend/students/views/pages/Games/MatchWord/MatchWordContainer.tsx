import React from 'react';
import { IGameContainerProps } from 'students/views/pages/Games';
import MatchWord from './MatchWord';
import useRounds from './hooks/useRounds';

const MatchWordContainer: React.FC<IGameContainerProps> = ({
  phrases,
  onNext = () => {},
  onRoundComplete = () => {},
  onExit
}) => {
  const rounds = useRounds(phrases);
  return rounds ? (
    <MatchWord
      rounds={rounds}
      onRoundComplete={onRoundComplete}
      onFinish={onNext}
      onExit={onExit}
    />
  ) : null;
};

export default MatchWordContainer;
