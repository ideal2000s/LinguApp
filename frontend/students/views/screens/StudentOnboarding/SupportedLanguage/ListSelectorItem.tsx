import React from 'react';
import styled from 'styled-components';

interface IProps {
  value: any & { id: string };
  label: string;
  checked?: boolean;
  onSelect: (value: any) => void;
}

const ListSelectorItem = React.forwardRef<HTMLDivElement, IProps>(
  ({ value, label, checked, onSelect }, ref) => {
    function handleItemClick(event: React.MouseEvent) {
      event.preventDefault();
      onSelect(value);
    }

    function handleItemKeyDown(event: React.KeyboardEvent) {
      if (event.keyCode === 32) {
        event.preventDefault();
        onSelect(value);
      }
    }

    const { id } = value;
    return (
      <SListSelectorItem ref={ref}>
        <SInputContainer
          checked={!!checked}
          role={'radio'}
          tabIndex={0}
          aria-checked={checked}
          onClick={handleItemClick}
          onKeyDown={handleItemKeyDown}
        >
          <input id={`itemOption${id}`} type="radio" checked={!!checked} readOnly />

          <div className="check" />

          <label className={'item-option'} htmlFor={`itemOption${id}`}>
            {label}
          </label>
        </SInputContainer>
      </SListSelectorItem>
    );
  }
);

export default ListSelectorItem;

const SListSelectorItem = styled.div`
  &:not(:last-child) {
    border-bottom: solid 1px #ffffff40;
  }
`;

const SInputContainer = styled.div<{ checked: boolean }>`
  color: white;
  min-height: 46px;
  position: relative;
  cursor: pointer;
  padding: 18px;
  margin: 0 -10px;
  border-radius: 8px;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    color: #000000;

    .check {
      border-color: #00a5d7;
    }
  }

  label {
    font-family: ${({ theme }) => theme.linguTextFontFamily};
    font-weight: 500;
    font-size: 1rem;
    line-height: 1rem;
    vertical-align: middle;
    padding-left: 20px;
    cursor: pointer;
    display: table-cell;
    height: 100%;
    width: 100%;
    margin: 0;

    @media (min-width: ${({ theme }) => theme.linguBptMd}) {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }
  }

  &:hover,
  &:focus {
    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
    outline: none;
  }

  input {
    display: none;
    width: 0;
    height: 0;
  }

  .check {
    background-image: none;
    background-position: center center;
    background-repeat: no-repeat;
    min-height: 20px;
    min-width: 20px;
    border: 2px solid #ffffff;
    border-radius: 100%;
  }

  ${({ checked }) =>
    checked
      ? `
      color: #000000;
      background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    
    .check {
      border-radius: 100%;
      border: 5px solid #00a5d7;
    }
  `
      : ''}
`;
