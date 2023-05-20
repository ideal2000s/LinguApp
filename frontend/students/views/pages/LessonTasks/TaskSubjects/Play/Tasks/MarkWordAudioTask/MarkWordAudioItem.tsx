import React, { FC, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { AnimationControls, motion as m } from 'framer-motion';
import {
  IMarkWordAudioItem,
  IMarkWordAudioItemStatement,
  tStatefulStatement
} from 'students/models/lessonTasks';
import { useCustomAnimations } from './hooks';
import { usePlayAudioPlayer } from '../../common/hooks';
import { SvgAudioPlayer } from 'students/views/shared/components/MediaPlayer';
import { customMediaQuery } from 'students/views/shared/styled';
import { audioInitAnimate, sentenceInitAnimate, wordInitAnimate } from './hooks';

export interface ISelectAnswerPayload {
  itemId: number;
  attemptsCount: number;
  solution: string[];
}

interface ISentenceMarkWordAudioItemProps {
  item: IMarkWordAudioItem;
  onSelectItem: (payload: ISelectAnswerPayload) => void;
  className?: string;
}

const MarkWordAudioItem: FC<ISentenceMarkWordAudioItemProps> = ({
  item,
  onSelectItem,
  className
}) => {
  const { statement, audioURL } = item;
  const [animationsInstance, animationsAction] = useCustomAnimations(item);
  const attemptsCountRef = useRef<number>(0);
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();
  const solutionsLength = useMemo(
    () =>
      statement.filter((statement: IMarkWordAudioItemStatement) => statement.solution)
        .length,
    [statement]
  );
  const statefulStatement: tStatefulStatement[] = useMemo(
    () => statement.map((st, index) => ({ ...st, selected: false, index })),
    [statement]
  );
  const selectItemTimer = useRef<number | null>(null);

  useEffect(() => {
    attemptsCountRef.current = 0;
    selectItemTimer.current = null;

    return () => {
      if (selectItemTimer.current) clearTimeout(selectItemTimer.current);
    };
  }, [item.id]);

  function getSelectedWords() {
    return statefulStatement.filter((st) => st.selected);
  }

  const handleSelectWord = (word: tStatefulStatement) => {
    if (word.disabled || word.selected) {
      return;
    }

    if (word.solution) {
      playCorrectSound();
      word.selected = true;
      const allWordsAreFound = solutionsLength === getSelectedWords().length;
      animationsAction.wordItem_startWordAnimation(word, true);
      if (allWordsAreFound) {
        selectItemTimer.current = window.setTimeout(async () => {
          await animationsAction.resetAllAnimations();

          if (selectItemTimer.current)
            onSelectItem({
              itemId: item.id,
              attemptsCount: attemptsCountRef.current,
              solution: getSelectedWords().map((word) => word.word)
            });
        }, 1000);
      }
    } else {
      playIncorrectSound();
      attemptsCountRef.current += 1;

      animationsAction.wordItem_startWordAnimation(word);
    }
  };

  return (
    <SSentenceMarkWordAudioItem key={item.id} className={cn(className)}>
      <SAudioQuestionWrapper>
        <SAudioPlayerWrapper
          initial={audioInitAnimate}
          animate={animationsInstance.audioAnimationInstance}
        >
          {audioURL ? (
            <SvgAudioPlayer src={audioURL} autoplay autoPlayDelay={2000} />
          ) : null}
        </SAudioPlayerWrapper>
      </SAudioQuestionWrapper>
      <SStatementWrapper>
        <SStatement
          animate={animationsInstance.sentenceAnimationInstance}
          initial={sentenceInitAnimate}
        >
          {statefulStatement.map((word, index: number) =>
            word.disabled ? (
              word.word.trim()
            ) : (
              <SWord
                key={index}
                onClick={() => handleSelectWord(word)}
                animate={animationsInstance.wordItemAnimationInstance}
                initial={wordInitAnimate}
                custom={word}
              >
                {word.word}
              </SWord>
            )
          )}
        </SStatement>
      </SStatementWrapper>
    </SSentenceMarkWordAudioItem>
  );
};

export default MarkWordAudioItem;

const SSentenceMarkWordAudioItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SAudioQuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
`;
const SAudioPlayerWrapper = styled(m.div)<{ animate: AnimationControls }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  border-radius: 16px;
  background: #00000020;
`;

const SStatementWrapper = styled.div`
  flex-grow: 1;
`;
const SStatement = styled(m.h2)`
  font-weight: 600;
  font-size: 1.875rem;
  line-height: 2.625rem;
  text-align: center;
  margin: 0;

  ${customMediaQuery('tablet')} {
    font-size: 2.25rem;
    line-height: 3.125rem;
    max-width: 730px;
  }
`;

const SWord = styled(m.span)<{ animate: AnimationControls }>`
  border-radius: 10px;
  display: inline-block;
  cursor: pointer;
  padding: 4px;

  ${customMediaQuery('tablet')} {
    transition: background 0.3s, opacity 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.2) !important;
      opacity: 0.6;
    }
  }
`;
