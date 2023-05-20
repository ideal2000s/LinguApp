import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { customMediaQuery } from 'students/views/shared/styled';
import handPointer from '../assets/wordPointer.svg';
import { IPlayAuditionItem } from 'students/models/lessonTasks';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';

interface IArea {
  width: number;
  height: number;
  x: number;
  y: number;
  percentX: number;
  percentY: number;
}

interface IWordPosition {
  word: IPlayAuditionItem['correctWord'];
  ref?: HTMLElement | null;
  area: IArea;
  correct: boolean;
}

interface IProps {
  sequence: number;
  wordPosition: IWordPosition;
  onSuccess: () => void;
  onError: () => void;
}

const WordBlock: React.FC<IProps> = ({ wordPosition, onSuccess, onError }) => {
  const [selected, setSelected] = useState<'initial' | 'correct' | 'incorrect'>(
    'initial'
  );
  const controls = useAnimation();

  const handleClick = (_e: MouseEvent<HTMLButtonElement>) => {
    if (wordPosition.correct) {
      setSelected('correct');
      controls.start('correct');
      setTimeout(() => onSuccess(), 700);
    } else {
      setSelected('incorrect');
      controls.start('incorrect').then(() => setSelected('initial'));
      onError();
    }
  };

  return (
    <SBlock
      as={motion.div}
      ref={(el: HTMLDivElement) => (wordPosition.ref = el)}
      animate={controls}
      variants={variants}
      $left={wordPosition.area.percentX}
      $top={wordPosition.area.percentY}
    >
      <SWordButton className={`word-block-${selected}`} onClick={handleClick}>
        {wordPosition.word.body}
      </SWordButton>
    </SBlock>
  );
};

export default WordBlock;

const variants = {
  correct: {
    opacity: 0,
    clipPath: [`circle(75%)`, `circle(0%)`],
    transition: { duration: 1 },
    transitionEnd: { display: 'none' }
  },
  incorrect: {
    rotate: [0, 5, -5, 0],
    x: [0, 10, -10, 0]
  }
};

const SWordButton = styled(ButtonGeneral)`
  background: #ffffff;
  box-shadow: 0px 4px 0px rgba(39, 7, 54, 0.5);
  border-radius: 10px;
  cursor: url(${handPointer}), pointer;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: #2d2d3a;

  ${styleInnerButton()} {
    padding: 13px 14px;

    ${customMediaQuery('tablet')} {
      padding: 15px 16px;
    }
  }

  &:hover {
    box-shadow: 0px 0px 20px rgba(46, 33, 98, 0.5), 0px 2px 0px rgba(39, 7, 54, 0.8);
  }

  &.word-block-correct {
    background: linear-gradient(0deg, #39b54a 6.9%, #27a939 94.83%);
    box-shadow: inset 0px 4px 0px #58cd68, inset 0px -4px 0px #0b9444;
    &::before {
      color: white;
      content: '\\2713';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ${styleInnerButton()} {
      visibility: hidden;
    }
  }

  &.word-block-incorrect {
    background: #ff7678;
    box-shadow: 0px 4px 0px rgba(39, 7, 54, 0.5);
  }
`;

const SBlock = styled.div<{ $left: number; $top: number }>`
  position: absolute;
  z-index: 1;
  left: ${({ $left }) => $left || 0}%;
  top: ${({ $top }) => $top || 0}%;
`;
