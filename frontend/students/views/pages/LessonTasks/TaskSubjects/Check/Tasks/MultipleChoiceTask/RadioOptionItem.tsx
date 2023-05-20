import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { IMultipleChoiceItem } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';
import SChoiceAnswerContainer from '../../components/styled/SChoiceAnswerContainer';

interface IRadioOptionItem {
  option: IMultipleChoiceItem['options'][0];
  checked?: boolean;
  onRadioChange: (id: number, isRadio: boolean) => void;
  disabled?: boolean;
}

const RadioOptionItem: React.FC<IRadioOptionItem> = ({
  option,
  checked,
  onRadioChange,
  disabled
}) => {
  const { id, answer } = option;

  function handleRadioClick(event: React.MouseEvent) {
    event.preventDefault();
    onRadioChange(id, true);
  }

  function handleRadioKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode === 32) {
      event.preventDefault();
      onRadioChange(id, true);
    }
  }

  return (
    <SInputContainer
      checked={!!checked}
      role={'radio'}
      tabIndex={0}
      aria-checked={checked}
      className={cn({ disabled })}
      onClick={disabled ? undefined : handleRadioClick}
      onKeyDown={disabled ? undefined : handleRadioKeyDown}
    >
      <input
        id={`itemOption${id}`}
        type="radio"
        checked={!!checked}
        readOnly
        disabled={disabled}
      />
      <div className={cn('check', { checked })} />
      <label className={'item-option'} htmlFor={`itemOption${id}`}>
        {answer}
      </label>
    </SInputContainer>
  );
};

export default RadioOptionItem;

const SInputContainer = styled(SChoiceAnswerContainer)<{ checked: boolean }>`
  label {
    vertical-align: middle;
    color: #2d2d3a;
    padding-left: 20px;
    display: table-cell;
    height: 100%;
    width: 100%;
    margin: 0;
    letter-spacing: -0.01em;
    font-weight: 500;
    opacity: 0.9;
  }

  input {
    display: none;
    width: 0;
    height: 0;
  }

  .check {
    background: #ffffff;
    background-image: none;
    background-position: center center;
    background-repeat: no-repeat;
    background-origin: border-box;
    background-clip: content-box, border-box;
    height: 20px;
    flex: 0 0 20px;
    border: 2px solid #bdbdcb;
    border-radius: 50%;
    box-sizing: border-box;

    &.checked {
      border-style: double;
      border-color: transparent;
      border-width: 6px;
      background-image: linear-gradient(#ffffff, #ffffff),
        radial-gradient(circle at center right, #0082b2, #00bce8);
    }

    ${customMediaQuery('tablet')} {
      flex: 0 0 26px;
      height: 26px;
      &.checked {
        border-width: 7px;
      }
    }
  }
`;
