import React, { FC, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';

import { FILTERS_CONFIG } from './Config';
import CheckboxList, { tCheckboxOption } from '../CheckboxList/CheckboxList';

interface ILevelFilter {
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  variant?: 'short' | 'long';
  className?: string;
}

const LevelFilter: FC<ILevelFilter> = ({
  selectedOptions,
  onChange,
  variant = 'long',
  className
}) => {
  const [fullListVisible, setFullListVisible] = useState<boolean>(
    !!variant && variant === 'long'
  );
  const [currentSelected, setCurrentSelected] = useState<tCheckboxOption[]>([]);

  const prepareSelectedOptions = useCallback(
    (options: string[]) =>
      FILTERS_CONFIG[fullListVisible ? 'longList' : 'shortList'].reduce(
        (acc, cur) =>
          options.join(',').includes(cur.fields)
            ? [
                ...acc,
                {
                  title: fullListVisible ? cur.title : '',
                  prefix: cur.prefix,
                  value: cur.fields
                }
              ]
            : acc,
        [] as tCheckboxOption[]
      ),
    [fullListVisible]
  );

  useEffect(() => {
    setCurrentSelected(prepareSelectedOptions(selectedOptions));
  }, [selectedOptions, fullListVisible, prepareSelectedOptions]);

  const toggleFullList = useCallback(() => {
    setFullListVisible((prev: boolean) => !prev);
  }, [setFullListVisible]);

  const handleChange = useCallback(
    (options: tCheckboxOption[]) => {
      onChange(options.map((option: tCheckboxOption) => option.value));
    },
    [onChange]
  );

  const renderOptionsList = () => {
    if (fullListVisible) {
      return (
        <CheckboxList
          options={FILTERS_CONFIG.longList.map((option) => ({
            title: option.title,
            prefix: option.prefix,
            value: option.fields
          }))}
          onChange={handleChange}
          selectedOptions={currentSelected}
        />
      );
    }

    return (
      <CheckboxList
        options={FILTERS_CONFIG.shortList.map((option) => ({
          title: option.title,
          prefix: '',
          value: option.fields
        }))}
        onChange={handleChange}
        selectedOptions={currentSelected}
      />
    );
  };

  return (
    <SWrapper className={cn(className)}>
      <SListWrapper>
        <SList>{renderOptionsList()}</SList>
      </SListWrapper>

      {!variant && (
        <SToggleButton onClick={toggleFullList}>
          {fullListVisible ? (
            <Translate str="frontend.course.less_settings" />
          ) : (
            <Translate str="frontend.course.more_settings" />
          )}
        </SToggleButton>
      )}
    </SWrapper>
  );
};

export default LevelFilter;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 240px;
`;

const SListWrapper = styled.div`
  ${customMediaQuery('tablet')} {
    margin-bottom: 28px;
  }
`;

const SList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SToggleButton = styled.button`
  border: none;
  border-radius: 6px;
  background: rgba(153, 227, 247, 0.2);
  width: 100%;
  height: 36px;
  color: #0094c5;
  font-size: 0.874rem;
  font-weight: 400;
  line-height: 1rem;
  transition: background 0.3s;

  &:hover {
    background: rgba(153, 227, 247, 0.4);
  }

  &:active,
  &:focus {
    outline: none;
  }
`;
