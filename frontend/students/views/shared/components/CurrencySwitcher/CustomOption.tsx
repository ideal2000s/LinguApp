import React from 'react';
import styled from 'styled-components';
import { OptionProps, components } from 'react-select';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICurrencyOption } from './CurrencySwitcher';

const CustomOption: React.FC<OptionProps<ICurrencyOption, false>> = (props) => (
  <SOption isSelected={props.isSelected}>
    <components.Option className="lang-switcher__option" {...props}>
      <span className="option__label">{props.label}</span>

      {props.isSelected ? (
        <SFontAwesomeIcon size="1x" icon={faCheck} color="#00a5d7" />
      ) : null}
    </components.Option>
  </SOption>
);

const SOption = styled.div<{ isSelected: boolean }>`
  font-weight: bold;
  display: flex;
  align-items: center;
  position: relative;

  .lang-switcher__option {
    position: static;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    transform: none;
    background: transparent;
    transition: background 0.3s;
    border-radius: 4px;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .option__label {
    overflow: hidden;
    text-overflow: ellipsis;
    color: #2d2d3a;
    font-size: 0.875rem;
    font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
    line-height: 1rem;
  }
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 8px;
  top: 6px;
`;

export default CustomOption;
