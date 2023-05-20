import React, { useCallback, useEffect, useRef, useState } from 'react';
import random from 'lodash/random';
import styled from 'styled-components';
import cn from 'classnames';
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useAnimation
} from 'framer-motion';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';
import { customMediaQuery } from 'students/views/shared/styled';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { usePlayAudioPlayer } from 'students/views/pages/LessonTasks/TaskSubjects/Play/common/hooks';
import {
  IImageHotspotItemWord,
  IPlayImageHotspotItem
} from 'students/models/lessonTasks';
import ImageWithHotspots from './components/ImageWithHotspots';

export interface ISelectAnswerPayload {
  itemId: number;
  attemptsCount: number;
}

export interface IPointOptions {
  top: number;
  left: number;
  index: number;
}

export interface IImage {
  url: string | null;
  size: { width: number; height: number };
}

interface IProps {
  isCompleted: boolean;
  currentIndex: number;
  items: IPlayImageHotspotItem[];
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onItemSelect: (index: number) => void;
  image?: IImage;
}

const ImageHotspotItem: React.FC<IProps> = ({
  isCompleted,
  currentIndex,
  items,
  onSelectAnswer,
  onItemSelect,
  image
}) => {
  const [successfulHotspots, setSuccessfulHotspots] = useState<number[]>([]);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [isImageFullSized, setImageFullSized] = useState(true);
  const [words, setWords] = useState<IImageHotspotItemWord[]>([]);
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  const [correctWord, setCorrectWord] = useState('');
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();
  const wordsAnimationControls = useAnimation();
  const fullSizedTimeout = useRef<number | null>(null);
  const currentItem = items[currentIndex];

  const showWordsSequence = useCallback(async () => {
    await wordsAnimationControls.start('hidden');
    wordsAnimationControls.start('visible');
  }, [wordsAnimationControls]);

  useEffect(() => {
    fullSizedTimeout.current = window.setTimeout(() => {
      setImageFullSized(false);
      showWordsSequence();
    }, 1500);
    return () => {
      if (fullSizedTimeout.current) clearTimeout(fullSizedTimeout.current);
    };
  }, [showWordsSequence]);

  useEffect(() => {
    if (isCompleted) setImageFullSized(true);
  }, [isCompleted]);

  useEffect(() => {
    setWrongWords([]);
    const newWords = [...currentItem.incorrectWords];
    newWords.splice(random(newWords.length + 1), 0, currentItem.word);
    setWords(newWords);
    showWordsSequence();
  }, [currentItem, showWordsSequence]);

  const handleSelectWord = (selectedWord: string) => {
    if (selectedWord === currentItem.word.body) {
      playCorrectSound();
      setCorrectWord(selectedWord);
      const newSuccedHotspots = [...successfulHotspots, currentIndex];
      setSuccessfulHotspots(newSuccedHotspots);
      setTimeout(async () => {
        onSelectAnswer({ itemId: currentItem.id, attemptsCount });
      }, 2000);
      setAttemptsCount(0);
    } else {
      playIncorrectSound();
      setWrongWords([...wrongWords, selectedWord]);
      setAttemptsCount((count) => count + 1);
    }
  };

  const handleSelectHotspot = async (index: number) => {
    onItemSelect(index);
  };

  return (
    <AnimateSharedLayout>
      <SItemWrapper>
        <SImgWrapper
          layout="position"
          variants={blockVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5 }}
          as={motion.div}
        >
          <ImageWithHotspots
            attemptsCount={attemptsCount}
            fullSized={isImageFullSized}
            successfulHotspots={successfulHotspots}
            activeIndex={currentIndex}
            hotspots={items}
            image={image}
            onSelectHotspot={handleSelectHotspot}
          />
        </SImgWrapper>
        <AnimatePresence>
          {!isImageFullSized && (
            <SWordsList
              variants={wordVariants}
              initial="hidden"
              animate={wordsAnimationControls}
              exit="hidden"
              transition={{ duration: 0.3 }}
              as={motion.ol}
            >
              {words.map(({ body: word }) => {
                const correct = word === correctWord;
                const wrong = wrongWords.includes(word);
                const disabled = wrong || successfulHotspots.includes(currentIndex);
                return (
                  <SWord key={currentIndex + word}>
                    <SWordButton
                      className={cn({ correct, wrong })}
                      disabled={disabled}
                      onClick={() => handleSelectWord(word)}
                    >
                      {word}
                    </SWordButton>
                  </SWord>
                );
              })}
            </SWordsList>
          )}
        </AnimatePresence>
      </SItemWrapper>
    </AnimateSharedLayout>
  );
};

export default ImageHotspotItem;

const blockVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 40, opacity: 0 }
};
const wordVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 20, opacity: 0 }
};

const SItemWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const SImgWrapper = styled.div`
  display: flex;
  width: auto;
  padding: 0;
  justify-content: center;
`;

const SWordsList = styled.ol`
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100vw;
  padding: 2rem 1rem;
  background: linear-gradient(180deg, #554ba6 0%, #8d6ac6 100%);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  margin-top: -2rem;
  margin-bottom: 0;
  z-index: 1;

  ${customMediaQuery('tablet')} {
    margin: 3rem 0;
    max-width: 670px;
    padding: 0;
    background: none;
  }
`;

const SWord = styled.li`
  display: flex;
  flex-grow: 1;
  min-width: calc(50% - 0.5rem);
  justify-content: center;

  ${customMediaQuery('tablet')} {
    width: calc(30% - 0.3rem);
    min-width: auto;
  }
`;

const SWordButton = styled(ButtonGeneral)`
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #ffffff;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.375rem;
  color: #2d2d3a;
  cursor: pointer;
  transition: opacity 0.3s, box-shadow 0.3s, color 0.5s, background-color 0.5s;

  ${styleInnerButton()} {
    padding: 1rem;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover,
  ${styleInnerButton('focus')} {
    opacity: 0.9;
    box-shadow: none;
  }

  @keyframes wrongShake {
    33% {
      transform: translateX(12px);
    }

    66% {
      transform: translateX(-12px);
    }

    100% {
      transform: translateX(0);
    }
  }

  &.wrong {
    animation: 0.5s wrongShake;
    background: rgba(0, 0, 0, 0.4);
    color: #ffffff;
    opacity: 1;
    box-shadow: none;
  }

  &.correct {
    background: linear-gradient(0deg, #39b54a 6.9%, #27a939 94.83%);
    box-shadow: inset 0 4px 0 #58cd68, inset 0 -4px 0 #0b9444;
    color: #ffffff;
  }
`;
