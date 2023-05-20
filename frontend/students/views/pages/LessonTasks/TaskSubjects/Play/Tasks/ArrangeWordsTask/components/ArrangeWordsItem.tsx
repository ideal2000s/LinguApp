import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { motion as m, useAnimation } from 'framer-motion';
import escapeRegExp from 'lodash/escapeRegExp';
import { IPlayArrangeWordsItem } from 'students/models/lessonTasks';
import { useWrongAnimation } from 'students/views/shared/hooks';
import WordBlock from './WordBlock';
import ResultInput from './ResultInput';
import { usePlayAudioPlayer } from '../../../common/hooks';

const RESULT_BLOCK_WRONG_CLASS_NAME = 'wrongAnimation';

export interface IItemSelectAnswerPayload {
  itemId: number;
  attemptsCount: number;
}

export interface ISelectAnswerPayload extends IItemSelectAnswerPayload {
  itemIndex: number;
}

interface IArrangeWordsItem {
  item: IPlayArrangeWordsItem | null;
  onSelectAnswer: (payload: IItemSelectAnswerPayload) => void;
  onSelectWord?: (index: number) => void;
  className?: string;
}

const ArrangeWordsItem: React.FC<IArrangeWordsItem> = ({
  item,
  onSelectAnswer,
  onSelectWord,
  className
}) => {
  const [wordsData, setWordsData] = useState<tWordsData>(() =>
    genWordsDataFromItem(item)
  );
  const [resultBlockRef, showWrongAnimation] = useWrongAnimation(
    undefined,
    RESULT_BLOCK_WRONG_CLASS_NAME
  );
  const attemptsCountRef = useRef<number>(0);
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();
  const overflowHiddenWrapper = useOverflowHiddenTimeoutClassName();
  const headerAnimationControls = useAnimation();
  const contentAnimationControls = useAnimation();
  const initialAnimationState = { opacity: 0, y: 250 };
  const solution = item?.solution.trim() || '';

  useEffect(() => {
    if (!item) return;

    setWordsData(genWordsDataFromItem(item));

    headerAnimationControls.start({
      y: [250, 0],
      opacity: [0, 1],
      transition: {
        opacity: { duration: 0.5 },
        y: { duration: 0.7, delay: 1.3, ease: 'easeInOut' }
      }
    });

    contentAnimationControls.start({
      y: [250, 0],
      opacity: [0, 1],
      transition: {
        duration: 0.4,
        delay: 1.5,
        ease: 'easeInOut'
      }
    });
  }, [item, headerAnimationControls, contentAnimationControls]);

  useEffect(() => {
    function checkIfItemFinished(currentWordsData: tWordsData) {
      if (item && currentWordsData.result === solution) {
        onSelectAnswer({
          itemId: item.id,
          attemptsCount: attemptsCountRef.current
        });
      }
    }

    checkIfItemFinished(wordsData);
  }, [wordsData, solution, item, onSelectAnswer]);

  useEffect(() => {
    attemptsCountRef.current = 0;
  }, [item?.id]);

  function processSelectWrongWord() {
    playIncorrectSound();
    attemptsCountRef.current += 1;

    showWrongAnimation();
  }

  function processSelectCorrectWord(indexNumber: number) {
    playCorrectSound();
    moveSourceWordToResult(indexNumber);

    onSelectWord && onSelectWord(indexNumber);
  }

  function processSelectWord(indexNumber: number) {
    if (!verifyNewResultWord(indexNumber)) {
      processSelectWrongWord();
    } else {
      processSelectCorrectWord(indexNumber);
    }
  }

  function handleWordClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const index = e.currentTarget.dataset.sourceIndex;
    if (index === undefined) return;

    const indexNumber = parseInt(index);
    processSelectWord(indexNumber);
  }

  function verifyNewResultWord(wordIndex: number): boolean {
    if (!solution) return false;

    const word = item?.words[wordIndex];
    const newDraftSentence = (wordsData.result + ' ' + word).trim();

    const searchRegExp = new RegExp(`^${escapeRegExp(newDraftSentence)}\\s`);

    const spacedSolution = solution + ' ';
    return spacedSolution.search(searchRegExp) !== -1;
  }

  function moveSourceWordToResult(wordIndex: number) {
    setWordsData(({ source, result }) => ({
      source: source.map((sourceWord) => ({
        ...sourceWord,
        selected: sourceWord.selected || sourceWord.key === wordIndex
      })),
      result: result + (result ? ' ' : '') + source[wordIndex].value
    }));
  }

  return (
    <SWordsItemWrapper className={cn(className, overflowHiddenWrapper)}>
      <SHeader initial={initialAnimationState} animate={headerAnimationControls}>
        <STaskTitle>{item?.description}</STaskTitle>
      </SHeader>

      <m.div initial={initialAnimationState} animate={contentAnimationControls}>
        <SResultInput
          key={item?.id}
          animationRef={resultBlockRef}
          result={wordsData.result}
          finished={wordsData.result === solution}
        />
      </m.div>

      <m.div initial={initialAnimationState} animate={contentAnimationControls}>
        <SWordSelectorBlock>
          {wordsData.source.map(({ key, value, selected }) => (
            <WordBlock
              key={`${item?.id}-${key}`}
              value={value}
              selected={selected}
              onClick={handleWordClick}
              sourceKey={key}
            />
          ))}
        </SWordSelectorBlock>
      </m.div>
    </SWordsItemWrapper>
  );
};

export default ArrangeWordsItem;

type tSourceArray = {
  key: number;
  value: string;
  selected: boolean;
}[];

type tWordsData = {
  result: string;
  source: tSourceArray;
};

const initWordsDataValue: tWordsData = {
  result: '',
  source: []
};

function genWordsDataFromItem(item: IArrangeWordsItem['item']) {
  if (!item) return initWordsDataValue;
  const wordsObjects = item.words.map((word: string, index: number) => ({
    key: index,
    value: word,
    selected: false
  }));
  return { source: wordsObjects, result: '' };
}

function useOverflowHiddenTimeoutClassName(seconds = 2000) {
  const [overflowHiddenWrapper, setOverflowHiddenWrapper] = useState('overflow-hidden');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOverflowHiddenWrapper('');
    }, seconds);

    return () => {
      clearTimeout(timer);
    };
  }, [seconds]);

  return overflowHiddenWrapper;
}

const SWordsItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    max-width: 662px;
  }
`;

const SHeader = styled(m.div)`
  min-height: 8rem;
  text-align: center;
`;

const STaskTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.linguLightFont};
`;

const SWordSelectorBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: space-around;
  align-content: center;
  margin: 1rem 0;
`;

const SResultInput = styled(ResultInput)`
  @keyframes wrongAnimation {
    20% {
      background: #ffffff35;
    }
    100% {
      background: #00000035;
    }
  }
  @keyframes wrongShake {
    20% {
      transform: translateX(-5px);
    }
    40% {
      transform: translateX(5px);
    }
    60% {
      transform: translateX(-5px);
    }
    80% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }
  &.${RESULT_BLOCK_WRONG_CLASS_NAME} {
    animation: 0.8s wrongAnimation, 0.4s wrongShake;
  }
`;
