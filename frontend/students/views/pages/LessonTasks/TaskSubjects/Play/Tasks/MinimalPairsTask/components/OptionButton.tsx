import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';
import useOptionResize from '../hooks/useOptionResize';

const BUTTONS_ANIMATION_DURATION = 500;
const BUTTON_MIN_HEIGHT = 58;

type tProps = {
  id: number;
  length: number;
  onClick: (id: number) => void;
  isCorrect: boolean;
  isWrong: boolean;
  text: string;
};

const OptionButton: FC<tProps> = ({ id, length, onClick, isCorrect, isWrong, text }) => {
  const handleResize = useCallback((optionNode: HTMLElement) => {
    if (!optionNode) return;

    const button = optionNode.querySelector('button');
    const parent = optionNode.parentElement;
    if (!button || !parent) return;

    const buttonWidth = button.scrollWidth;
    const optionWidth = optionNode.offsetWidth;
    const parentWidth = parent.offsetWidth + 1;
    if (buttonWidth > optionWidth || parentWidth < optionWidth * 2) {
      optionNode.style.width = '100%';
    }
  }, []);

  const ref = useOptionResize(handleResize);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onClick(id);
    },
    [id, onClick]
  );

  return (
    <SOptionItem $optionLength={length} ref={ref}>
      <SOption
        onClick={handleClick}
        className={cn({
          wrong: isWrong,
          correct: isCorrect
        })}
        disabled={isWrong}
      >
        {text}
      </SOption>
    </SOptionItem>
  );
};

export default OptionButton;

const SOptionItem = styled.li<{ $optionLength: number }>`
  flex-grow: 1;
  min-width: 50%;
  padding: 0.5rem;
  box-sizing: border-box;

  &:last-child {
    flex-grow: 0;
  }

  ${customMediaQuery('tablet')} {
    min-width: ${(props) => (props.$optionLength % 3 === 0 ? '204px' : '233px')};
  }
`;

const SOption = styled.button`
  width: 100%;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 0px 0px rgba(172, 69, 75, 0.5);
  border-radius: 10px;
  border: none;
  padding: 16px;
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.375rem;
  min-height: ${BUTTON_MIN_HEIGHT}px;
  overflow: hidden;
  color: #2d2d3a;
  cursor: pointer;
  transition: opacity 0.3s, box-shadow 0.3s, color ${BUTTONS_ANIMATION_DURATION}ms,
    background-color ${BUTTONS_ANIMATION_DURATION}ms;

  &:hover,
  &:focus {
    opacity: 0.9;
    box-shadow: none;
    border: none;
    outline: none;
    opacity: 1;
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

  @keyframes correctScale {
    33% {
      transform: scale(0.9);
    }
    66% {
      transform: scale(1.1);
    }
    100% {
      transform: translateX(0);
    }
  }

  &.wrong {
    animation: ${BUTTONS_ANIMATION_DURATION}ms wrongShake;
    background: #991054;
    color: #ffffff;
    opacity: 1;
    box-shadow: none;
  }

  &.correct {
    animation: 0.5s correctScale;
    background: linear-gradient(0deg, #39b54a 6.9%, #27a939 94.83%);
    box-shadow: inset 0 4px 0 #58cd68, inset 0 -4px 0 #0b9444;
    color: #ffffff;
  }
`;
