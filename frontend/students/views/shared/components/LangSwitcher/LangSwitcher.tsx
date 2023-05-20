import React, { useContext, useCallback } from 'react';
import Select, { Styles, ValueType } from 'react-select';
import styled from 'styled-components';
import cn from 'classnames';
import { locales, t, I18nContext } from 'i18n';
import CustomSingleValue from './CustomSingleValue';
import CustomOption from './CustomOption';

export interface ILocaleOption {
  lKey: string;
  labelKey: string;
  flagSrc: any;
}

interface ILangSwitcher {
  onChange?: (arg: ILocaleOption) => void;
  className?: string;
  lightStyled?: boolean;
  noTitle?: boolean;
}

const LangSwitcher: React.FC<ILangSwitcher> = ({
  onChange,
  className,
  lightStyled,
  noTitle
}) => {
  const { locale, setLocale } = useContext(I18nContext);

  const currentOption = locales.find(({ lKey }) => lKey === locale);

  const handleLocaleChange = useCallback(
    (option: ValueType<ILocaleOption, false>) => {
      if (option && 'lKey' in option) {
        setLocale(option.lKey);

        if (onChange) {
          onChange(option);
        }
      }
    },
    [onChange, setLocale]
  );

  return (
    <SWrapper
      className={cn(className)}
      title={!noTitle ? t('frontend.locale.lang_switcher_title') : ''}
    >
      <Select<ILocaleOption>
        aria-label={t('frontend.locale.lang_switcher_title')}
        className="locale-selector"
        classNamePrefix="lingu"
        onChange={handleLocaleChange}
        value={currentOption}
        width={200}
        isSearchable={false}
        getOptionValue={(option) => option.lKey}
        getOptionLabel={(option) => t(option.labelKey)}
        options={locales}
        backspaceRemovesValue={false}
        isClearable={false}
        styles={stylesObj}
        components={{ SingleValue: CustomSingleValue, Option: CustomOption }}
        menuPlacement="auto"
        lightStyled={lightStyled}
      />
    </SWrapper>
  );
};

export default LangSwitcher;

const stylesObj: Styles<ILocaleOption, false> = {
  valueContainer: (styles) => ({
    ...styles,
    flexWrap: 'nowrap'
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
    minWidth: '200px',
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
