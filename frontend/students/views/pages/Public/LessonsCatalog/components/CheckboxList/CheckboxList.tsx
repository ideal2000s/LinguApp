import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import CheckIcon from '../../../assets/check_icon.svg';

export type tCheckboxOption = {
  prefix?: string;
  title: string | JSX.Element;
  value: string;
};

interface ICheckboxList {
  options: tCheckboxOption[];
  selectedOptions: tCheckboxOption[];
  onChange: (options: tCheckboxOption[]) => void;
  className?: string;
}

const CheckboxList: FC<ICheckboxList> = ({
  options,
  selectedOptions,
  onChange,
  className
}) => {
  const checkIfSelected = (optionToSearch: tCheckboxOption): boolean =>
    selectedOptions.findIndex(
      (currentCheckboxOption: tCheckboxOption) =>
        currentCheckboxOption.value === optionToSearch.value
    ) > -1;

  const onOptionClick = (option: tCheckboxOption) => {
    if (checkIfSelected(option)) {
      onChange(
        selectedOptions.filter(
          (prevOption: tCheckboxOption) => prevOption.value !== option.value
        )
      );
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <SList className={cn(className)}>
      {options.map((option, index) => (
        <SListItem key={`${option.value}_${index}`} onClick={() => onOptionClick(option)}>
          <SListItemCheckbox $checked={checkIfSelected(option)} />
          <SListItemLabel>
            {option.prefix && <strong>{option.prefix}</strong>}
            {option.title}
          </SListItemLabel>
        </SListItem>
      ))}
    </SList>
  );
};

export default CheckboxList;

const SList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SListItemCheckbox = styled.div<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  border-radius: 6px;
  transition: border 0.3s, background-color 0.3s;

  ${({ $checked }) =>
    $checked
      ? `
    border: 2px solid #00A5D7;
    background-color: #00A5D7;
    background-image: url(${CheckIcon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 14px;
  `
      : `
    border: 2px solid #E6E6F0;
  `}
`;

const SListItemLabel = styled.label`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #5e5d71;
  margin: 0;
  cursor: pointer;

  & > strong {
    font-weight: 600;
    color: #3f3f48;
    text-transform: capitalize;
    margin-right: 4px;
  }
`;
