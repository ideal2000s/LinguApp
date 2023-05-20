import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { IMultipleChoiceItem } from 'students/models';

import './checkbox.scss';
import SChoiceAnswerContainer from '../../components/styled/SChoiceAnswerContainer';

interface ICheckboxOptionItem {
  option: IMultipleChoiceItem['options'][0];
  checked?: boolean;
  onCheckboxChange: (id: number, isRadio: boolean) => void;
  disabled?: boolean;
}

const CheckboxOptionItem: React.FC<ICheckboxOptionItem> = ({
  option,
  checked,
  disabled,
  onCheckboxChange
}) => {
  const { id, answer } = option;

  function toggleCheckbox() {
    onCheckboxChange(id, false);
  }
  function handleCheckboxClick(event: React.MouseEvent) {
    event.preventDefault();
    toggleCheckbox();
  }
  function handleCheckboxKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode === 32) {
      event.preventDefault();
      toggleCheckbox();
    }
  }

  return (
    <InputContainer
      className={cn('checkbox', { checked, disabled })}
      role={'checkbox'}
      tabIndex={0}
      aria-checked={checked}
      onClick={disabled ? undefined : handleCheckboxClick}
      onKeyDown={disabled ? undefined : handleCheckboxKeyDown}
    >
      <input
        id={`itemOption${id}`}
        type="checkbox"
        value={checked ? 1 : 0}
        readOnly
        disabled={disabled}
      />
      <div className="checkmark">
        <div className="checkmark__border">
          <div className="check" />
        </div>
      </div>
      <label className={'item-option'} htmlFor={`itemOption${id}`}>
        {answer}
      </label>
    </InputContainer>
  );
};

export default CheckboxOptionItem;

const InputContainer = styled(SChoiceAnswerContainer)`
  &.checked {
    background: #e6e6f0;
  }
`;
