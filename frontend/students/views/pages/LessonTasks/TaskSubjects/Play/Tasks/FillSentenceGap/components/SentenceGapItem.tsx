import React, { FC, useState, MouseEvent, useRef, useEffect } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { motion as m, useAnimation } from 'framer-motion';
import { IFillSentenceGapItem } from 'students/models/lessonTasks';
import { withFade2 } from 'students/views/shared/HOCs';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { customMediaQuery } from 'students/views/shared/styled';
import { usePlayAudioPlayer } from '../../../common/hooks';

const CORRECT_ANSWER_CLASS_NAME = 'correctAnswer';
const WRONG_ANSWER_CLASS_NAME = 'wrongAnimation';
const ANSWER_ANIMATION_TIME = 500;

export interface IItemSelectAnswerPayload {
  itemId: number;
  attemptsCount: number;
}

export interface ISelectAnswerPayload extends IItemSelectAnswerPayload {
  itemIndex: number;
}

interface ISentenceGapItem {
  item: IFillSentenceGapItem;
  onSelectAnswer: (payload: IItemSelectAnswerPayload) => void;
  className?: string;
}

const SentenceGapItem: FC<ISentenceGapItem> = ({ item, onSelectAnswer, className }) => {
  const { statement, answers: options, solution } = item;
  const blocks = statement.split('**');
  const [currentWrongOptions, setCurrentWrongOptions] = useState<number[]>([]);
  const [correctOption, setCorrectOption] = useState<number | null>(null);
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();
  const attemptsCountRef = useRef<number>(0);
  const animationControl = useAnimation();

  useEffect(() => {
    attemptsCountRef.current = 0;
  }, [item.id]);

  const handleSelectAnswer = () => {
    onSelectAnswer({
      itemId: item.id,
      attemptsCount: attemptsCountRef.current
    });
  };

  function handleAnswerClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const index = e.currentTarget.dataset.sourceKey;

    if (index === undefined) return;

    const indexNumber = parseInt(index, 10);

    if (options[0][indexNumber] !== solution[0]) {
      playIncorrectSound();

      !currentWrongOptions.includes(indexNumber) &&
        setCurrentWrongOptions((prev: number[]) => [...prev, indexNumber]);

      attemptsCountRef.current += 1;
    } else {
      playCorrectSound();

      setCorrectOption(indexNumber);

      animationControl.start({
        opacity: 0,
        transition: {
          duration: 0.5
        }
      });

      setTimeout(() => handleSelectAnswer(), ANSWER_ANIMATION_TIME);
    }
  }

  return (
    <SSentenceGapItem className={cn(className)} animate={animationControl}>
      <SSentence>
        {blocks.map((block: string, index: number) => (
          <React.Fragment key={index}>
            {block}
            {index < options.length && <SGapItem />}
          </React.Fragment>
        ))}
      </SSentence>

      <SAnswerOptions>
        {options.length &&
          options[0].map((option: string, index: number) => (
            <SAnswerOption
              key={option}
              data-source-key={index}
              onClick={handleAnswerClick}
              className={cn(
                { [WRONG_ANSWER_CLASS_NAME]: currentWrongOptions.includes(index) },
                {
                  [CORRECT_ANSWER_CLASS_NAME]: correctOption === index
                }
              )}
            >
              {option}
            </SAnswerOption>
          ))}
      </SAnswerOptions>
    </SSentenceGapItem>
  );
};

export default withFade2<ISentenceGapItem>()(SentenceGapItem);

const SSentenceGapItem = styled(m.div)`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2.25rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${customMediaQuery('tablet')} {
    font-size: 1.5rem;
    line-height: 2.75rem;
  }
`;

const SSentence = styled.h2`
  color: #fbfcff;
  margin: 0 0 75px;
  padding: 0;
  font-size: 2rem;
  font-weight: 600;
  line-height: 140%;
  text-align: center;

  ${customMediaQuery('tablet')} {
    max-width: 670px;
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 100px;
  }
`;

const SGapItem = styled.div`
  height: 46px;
  width: 102px;
  margin: 0 4px;
  background: #a92968;
  box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.25), inset 0 -1px 0 #e67bae;
  border-radius: 8px;
  display: inline-block;
  vertical-align: middle;

  ${customMediaQuery('tablet')} {
    height: 60px;
    width: 146px;
    margin: 0 8px;
  }
`;

const SAnswerOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${customMediaQuery('tablet')} {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const SAnswerOption = styled(ButtonGeneral)`
  width: 100%;
  text-align: center;
  margin: 0.5rem 0;
  background: #ffffff;
  box-shadow: 0 4px 0 rgba(169, 41, 104, 0.8);
  border-radius: 10px;
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.375rem;
  color: #2d2d3a;
  cursor: pointer;
  transition: opacity 0.3s, box-shadow 0.3s, color ${ANSWER_ANIMATION_TIME}ms,
    background-color ${ANSWER_ANIMATION_TIME}ms;

  ${styleInnerButton()} {
    padding: 1rem 3rem;
  }

  &:hover,
  ${styleInnerButton('focus')} {
    opacity: 0.9;
    box-shadow: none;
  }

  ${customMediaQuery('tablet')} {
    margin: 0 0.5rem;
    width: auto;
    min-width: 176px;
    margin-bottom: 1rem;

    ${styleInnerButton()} {
      padding: 1.25rem 3rem;
    }
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

  &.${WRONG_ANSWER_CLASS_NAME} {
    animation: ${ANSWER_ANIMATION_TIME}ms wrongShake;
    background: #991054;
    color: #ffffff;
    opacity: 1;
    box-shadow: none;
  }

  &.${CORRECT_ANSWER_CLASS_NAME} {
    opacity: 0.2;
    transition: opacity 0.2s;
  }
`;
