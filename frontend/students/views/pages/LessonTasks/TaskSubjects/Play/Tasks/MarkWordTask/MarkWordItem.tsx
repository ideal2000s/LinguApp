import React, { FC, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { AnimationControls, motion as m } from 'framer-motion';
import {
  IMarkWordItem,
  IMarkWordItemStatement,
  tStatefulStatementItem
} from 'students/models/lessonTasks';
import PhraseIcon from 'students/views/shared/components/PhraseIcon';
import { useCustomAnimations } from './hooks';
import { usePlayAudioPlayer } from '../../common/hooks';

export interface ISelectAnswerPayload {
  itemId: number;
  attemptsCount: number;
  solution: string;
}

interface ISentenceMarkWordItem {
  item: IMarkWordItem;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  className?: string;
}

const MarkWordItem: FC<ISentenceMarkWordItem> = ({ item, onSelectAnswer, className }) => {
  const {
    statement,
    words: [solutionWord]
  } = item;
  const [animationsInstance, animationsAction] = useCustomAnimations(item);
  const selectedSolutionsRef = useRef<IMarkWordItemStatement[]>([]);
  const attemptsCountRef = useRef<number>(0);
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();

  const statefulStatement: tStatefulStatementItem[] = useMemo(
    () => statement.map((st, index) => ({ ...st, index })),
    [statement]
  );

  const solutions = statefulStatement.filter(
    (statement: tStatefulStatementItem) => statement.solution
  );

  useEffect(() => {
    selectedSolutionsRef.current = [];
  }, [item]);

  useEffect(() => {
    attemptsCountRef.current = 0;
  }, [item.id]);

  const handleSelectWord = async (word: IMarkWordItemStatement) => {
    if (word.disabled) {
      return;
    }

    const foundSelectedWord = selectedSolutionsRef.current.find(
      (s: IMarkWordItemStatement) => s.word === word.word
    );

    if (foundSelectedWord === undefined && word.solution) {
      playCorrectSound();

      animationsAction.wordItem_startWordAnimation(
        word,
        solutions.length !== selectedSolutionsRef.current.length + 1
      );

      selectedSolutionsRef.current.push(word);

      setTimeout(async () => {
        await animationsAction.resetAllAnimations();
        await onSelectAnswer({
          itemId: item.id,
          attemptsCount: attemptsCountRef.current,
          solution: word.word
        });
      }, 1000);
    } else {
      playIncorrectSound();
      attemptsCountRef.current += 1;

      !word.solution && animationsAction.wordItem_startWordAnimation(word);
    }
  };

  return (
    <SSentenceMarkWordItem key={item.id} className={cn(className)}>
      <SAnswerImageWrapper
        initial={{ opacity: 0, height: 0 }}
        animate={animationsInstance.imageAnimationInstance}
      >
        <PhraseIcon
          width="200px"
          height="200px"
          imageUrl={solutionWord.imageURL}
          colorRequired={solutionWord.colorRequired}
          animationUrl={solutionWord.animationURL}
          text={solutionWord.wordTranslation}
        />
      </SAnswerImageWrapper>

      <SStatement
        animate={animationsInstance.sentenceAnimationInstance}
        initial={{ opacity: 0 }}
      >
        {statefulStatement.map((word: IMarkWordItemStatement, index: number) => (
          <SWord
            key={index}
            onClick={() => handleSelectWord(word)}
            animate={animationsInstance.wordItemAnimationInstance}
            custom={word}
            disabled={word.disabled}
          >
            {word.word}
          </SWord>
        ))}
      </SStatement>
    </SSentenceMarkWordItem>
  );
};

export default MarkWordItem;

const SSentenceMarkWordItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SAnswerImageWrapper = styled(m.div)<{ animate: AnimationControls }>`
  font-weight: 700;
  font-size: 2.375rem;
  line-height: 2.625rem;
  color: #93a2e8;
  text-align: center;
  width: 100%;
  margin: 4rem 0;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin: 0 0 8rem;
    font-size: 3rem;
    line-height: 3.25rem;
  }
`;

const SStatement = styled(m.h2)`
  font-weight: 600;
  font-size: 1.875rem;
  line-height: 2.625rem;
  text-align: center;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 2.25rem;
    line-height: 3.125rem;
    max-width: 730px;
  }
`;

const SWord = styled(m.span)<{ disabled: boolean; animate: AnimationControls }>`
  border-radius: 10px;
  display: inline-block;

  ${({ disabled }) =>
    !disabled
      ? `
    cursor: pointer;
    padding: 4px;
  `
      : ''};

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    transition: background 0.3s, opacity 0.3s;

    &:hover {
      ${({ disabled }) =>
        !disabled
          ? `
        background: rgba(0, 0, 0, 0.2) !important;
        opacity: 0.6;
      `
          : ''}
    }
  }
`;
