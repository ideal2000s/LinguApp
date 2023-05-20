import React from 'react';
import { SingleValueProps, components } from 'react-select';
import styled from 'styled-components';

import { ILocaleOption } from './LangSwitcher';

const CustomSingleValue: React.FC<SingleValueProps<ILocaleOption>> = (props) => (
  <SSingleValue lightStyled={props.selectProps.lightStyled}>
    <components.SingleValue className="lang-switcher__native-single-value" {...props} />
  </SSingleValue>
);

const SSingleValue = styled.div<{ lightStyled: boolean }>`
  font-weight: bold;
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-wrap: nowrap;

  .lang-switcher__native-single-value {
    font-size: 0.875rem;
    margin-left: 8px;
    position: static;
    display: inline;
    transform: none;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ lightStyled }) =>
      lightStyled
        ? `
      color: #FBFCFF;
      font-weight: 500;
    `
        : ''}
  }
`;

export default CustomSingleValue;
