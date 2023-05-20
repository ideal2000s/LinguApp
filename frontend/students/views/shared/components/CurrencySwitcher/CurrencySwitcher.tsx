import React, { FC, useCallback } from 'react';
import Select, { Styles, ValueType } from 'react-select';
import styled from 'styled-components';
import cn from 'classnames';
import { t } from 'i18n';

import CustomSingleValue from './CustomSingleValue';
import CustomOption from './CustomOption';

export interface ICurrencyOption {
  label: string;
  value: string;
}

interface ICurrencySwitcher {
  options: ICurrencyOption[];
  onChange?: (arg: ICurrencyOption) => void;
  className?: string;
  lightStyled?: boolean;
}

const CurrencySwitcher: FC<ICurrencySwitcher> = ({
  options,
  onChange,
  className,
  lightStyled
}) => {
  const handleLocaleChange = useCallback(
    (option: ValueType<ICurrencyOption, false>) => {
      if (onChange) {
        onChange(option as ICurrencyOption);
      }
    },
    [onChange]
  );

  return (
    <SWrapper
      className={cn(className)}
      title={t('frontend.locale.currency_switcher_title')}
    >
      <Select
        aria-label={t('frontend.locale.currency_switcher_title')}
        className="locale-selector"
        classNamePrefix="lingu"
        onChange={handleLocaleChange}
        width={200}
        defaultValue={options[0]}
        isSearchable={false}
        options={options}
        backspaceRemovesValue={false}
        isClearable={false}
        styles={stylesObj}
        menuPlacement="auto"
        lightStyled={lightStyled}
        components={{ SingleValue: CustomSingleValue, Option: CustomOption }}
      />
    </SWrapper>
  );
};

export default CurrencySwitcher;

const stylesObj: Styles<ICurrencyOption, false> = {
  valueContainer: (styles) => ({
    ...styles,
    flexWrap: 'nowrap',
    minWidth: '40px',
    padding: '2px'
  }),

  indicatorSeparator: () => ({
    display: 'none'
  }),

  indicatorsContainer: (styles, state) => ({
    ...styles,
    transform: `rotate(${state.selectProps.menuIsOpen ? '180deg' : '0deg'})`
  }),

  control: (styles, state) => ({
    ...styles,
    border: 'none',
    boxShadow: 'none',
    flexWrap: 'nowrap',
    backgroundColor: state.selectProps.lightStyled ? 'transparent' : '#FFFFFF'
  }),

  menu: (styles) => ({
    ...styles,
    minWidth: '100px',
    padding: '0.5rem',
    borderRadius: '10px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
    left: '50%',
    transform: 'translateX(-50%)'
  }),

  menuList: (styles) => ({
    ...styles,
    border: 'none',
    maxHeight: '14rem'
  })
};

const SWrapper = styled.div`
  max-width: 14rem;
  & *:hover {
    cursor: pointer;
  }

  .locale-selector:focus-within {
    outline-color: ${({ theme }) =>
      theme.linguBlueBtnFocusOutlineColor || 'blue'} !important;
    outline-style: auto !important;
  }

  .lingu__menu > div {
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #a7aab650;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.25);
    }

    &::-webkit-scrollbar-thumb:active {
      background: rgba(0, 0, 0, 0.6);
    }
  }

  .lingu__indicators > div {
    color: white;
  }
`;
