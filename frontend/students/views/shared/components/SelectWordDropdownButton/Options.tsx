import React, { FC, RefObject, SyntheticEvent, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { useWrongAnimation, useOutsideClick } from 'students/views/shared/hooks';

const WRONG_ANIMATION_CLASS_NAME = 'wrong-animation';

interface IProps {
  show: boolean;
  onClickOutside: () => void;
  onSelectAnswer: (answer: string) => void;
  onSelectWrongAnswer: () => void;
  options: string[];
  triggerRef: RefObject<HTMLElement>;
  solution?: string;
}
const Options: FC<IProps> = ({
  show,
  options,
  triggerRef,
  onClickOutside,
  onSelectAnswer,
  onSelectWrongAnswer,
  solution
}) => {
  const optionsRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(optionsRef, onClickOutside, [triggerRef]);

  const [wrongAnimationRef, showWrongAnimation] = useWrongAnimation(
    undefined,
    WRONG_ANIMATION_CLASS_NAME
  );

  function optionClickHandler(e: SyntheticEvent<HTMLButtonElement>) {
    const value = e.currentTarget.dataset.value || '';

    if (solution) {
      setAnswerWithSolution(value, solution);
    } else {
      onSelectAnswer(value);
    }
  }

  function setAnswerWithSolution(value: string, solution: string) {
    const correct = value === solution;

    if (correct) {
      onSelectAnswer(solution);
    } else {
      onSelectWrongAnswer();
      showWrongAnimation();
    }
  }

  return (
    <SOptionsBlock
      className={cn({ showOptions: show })}
      ref={(el: HTMLDivElement | null) => {
        optionsRef.current = el;
        wrongAnimationRef.current = el;
      }}
    >
      {options.map((option: string, optionIndex: number) => (
        <SOptionItemButton
          key={optionIndex}
          data-value={option}
          onClick={optionClickHandler}
        >
          {option}
        </SOptionItemButton>
      ))}
    </SOptionsBlock>
  );
};

export default Options;

const SOptionsBlock = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: fixed;
  width: 100vw;
  left: 0;
  bottom: -50vh;
  background: #fbfcff;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 60px rgba(1, 79, 127, 0.6);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  transition: 0.4s;

  &.showOptions {
    bottom: 0;

    @media (min-width: ${({ theme }) => theme.linguBptLg}) {
      display: flex;
      bottom: unset;
      top: 110%;
    }
  }

  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    display: none;
    position: absolute;
    width: 15ch;
    left: unset;
    bottom: unset;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px;
  }

  @keyframes wrongShake {
    20% {
      margin-left: -5px;
    }
    40% {
      margin-left: 5px;
    }
    60% {
      margin-left: -5px;
    }
    80% {
      margin-left: 5px;
    }
    100% {
      margin-left: 0;
    }
  }
  &.${WRONG_ANIMATION_CLASS_NAME} {
    animation: 0.4s wrongShake;
  }
`;
const SOptionItemButton = styled.button`
  border: none;
  background: #fbfcff;
  color: #37295c;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.375rem;
  height: 3.75rem;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, white, #cccccc, white) 100% 1;
  outline-color: transparent !important;

  &:first-of-type {
    border-top: none;
  }
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    background: #e6e6f080;
  }
`;
