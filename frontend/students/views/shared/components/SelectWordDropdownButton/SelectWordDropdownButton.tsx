import React, { FC, CSSProperties, useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';

import Options from './Options';

const DEFAULT_EMPTY_WORD = '•••';

type tWordButtonStatus = 'init' | 'opened' | 'selected';

type tButtonStatusStyles = {
  init?: CSSProperties;
  selected?: CSSProperties;
  opened?: CSSProperties;
};

interface IProps {
  options: Array<string>;
  onSelectAnswer: (data: { index: number; value: string; correct?: boolean }) => void;
  onSelectWrongAnswer?: () => void;
  index: number;
  disabled?: boolean;
  value?: string;
  solution?: string;
  statusStyles?: tButtonStatusStyles;
  dropdownArrow?: boolean;
}

const SelectWordDropdownButton: FC<IProps> = ({
  options,
  onSelectAnswer,
  onSelectWrongAnswer,
  index,
  solution,
  statusStyles,
  dropdownArrow,
  disabled,
  value
}) => {
  const [word, setWord] = useState<string | undefined>('');
  const [showOptions, setShowOptions] = useState(false);
  const openTriggerRef = useRef<HTMLButtonElement>(null);

  function handleClickOutside() {
    if (showOptions) {
      setShowOptions((show: boolean) => !show);
    }
  }

  function handleWordClick() {
    setShowOptions((show: boolean) => !show);
  }

  function handleSelectAnswer(answer: string) {
    setWord(answer);
    setShowOptions(false);

    if (solution) {
      // Call onSelectAnswer handler when solution is provided and the answer is correct
      onSelectAnswer({
        index,
        value: solution,
        correct: true
      });
    } else {
      // If no solution provided, just call onSelectAnswer to save answer in state
      onSelectAnswer({
        index,
        value: answer
      });
    }
  }

  function handleSelectWrongAnswer() {
    if (onSelectWrongAnswer) {
      onSelectWrongAnswer();
    }
  }

  const valueToShow = value || word || DEFAULT_EMPTY_WORD;
  return (
    <SWordButtonWrapper>
      <SWordButton
        onClick={handleWordClick}
        length={solution?.length}
        status={getButtonStatus(showOptions, word)}
        ref={openTriggerRef}
        statusStyles={statusStyles}
        withArrow={!!dropdownArrow}
        disabled={disabled}
      >
        {valueToShow}

        {dropdownArrow ? (
          <SArrowIcon opened={showOptions}>
            <FontAwesomeIcon icon={faSortDown} />
          </SArrowIcon>
        ) : null}
      </SWordButton>

      <Options
        show={showOptions}
        options={options}
        solution={solution}
        triggerRef={openTriggerRef}
        onClickOutside={handleClickOutside}
        onSelectAnswer={handleSelectAnswer}
        onSelectWrongAnswer={handleSelectWrongAnswer}
      />
    </SWordButtonWrapper>
  );
};

export default SelectWordDropdownButton;

const SWordButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const SWordButton = styled.button<{
  length?: number | undefined;
  status?: tWordButtonStatus;
  statusStyles?: tButtonStatusStyles | undefined | any;
  withArrow?: boolean | any;
  [k: string]: any; // Unhandled typescript error;
}>`
  border-radius: 8px;
  border: none;
  min-width: ${({ length }) => (length ? length + 2 : 10)}ch;
  transition: background 0.3s;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.375rem;
  margin: 2px 0;
  position: relative;
  height: 2.5rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.25rem;
  }

  padding: ${({ withArrow }) =>
    withArrow ? '0.5rem 1.75rem 0.5rem 1rem' : '0.5rem 1rem'};

  &:focus {
    outline: none;
    margin: 0;
    position: relative;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 2px dashed #d7df21;
      border-radius: 9px;
    }
  }

  &:hover {
    ${({ status }) =>
      status !== 'selected' && status !== 'opened'
        ? `
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(180deg, #BDFCE6 0%, #69D7FF 100%);
      box-shadow: 0 2px 0 #035F94, inset 0 1px 0 #FFFFFF;
    `
        : ''}
  }

  ${({ status, statusStyles }) => {
    switch (status) {
      case 'selected': {
        return statusStyles?.selected
          ? statusStyles.selected
          : `
            background: linear-gradient(0deg, #39B54A 6.9%, #27A939 94.83%);
            box-shadow: inset 0px 2px 0px #58CD68, inset 0px -2px 0px #0B9444;
            color: white;
            font-weight: 500;
            height: calc(2.5rem + 4px);
          `;
      }

      case 'opened': {
        return statusStyles?.opened
          ? statusStyles.opened
          : `
          background: #025788;
          margin: 0;
          position: relative;
          
          &:before {
            content: '';
            display: block;
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            border: 2px dashed #d7df21;
            border-radius: 9px;
          }
        `;
      }

      default:
        return statusStyles?.init
          ? statusStyles.init
          : `
          color: #014e7e80;
          background: linear-gradient(180deg, #BDFCE6 0%, #69D7FF 100%);
          box-shadow: 0px 2px 0px #035F94, inset 0px 1px 0px #FFFFFF;
        `;
    }
  }}
`;

const SArrowIcon = styled.span<{ opened: boolean }>`
  position: absolute;
  right: 6px;
  top: 6px;
  color: #2d2d3aaa;

  ${({ opened }) =>
    opened
      ? `
    transform: rotate(180deg);
    top: 12px;
  `
      : ''}
`;

function getButtonStatus(showOptions: boolean, word?: string): tWordButtonStatus {
  if (!word && !showOptions) return 'init';
  if (!word && showOptions) return 'opened';

  return 'selected';
}
