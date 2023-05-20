import React, { FC, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import cn from 'classnames';
import { t } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { userSelectors } from 'students/stores/user';

import CheckboxList, { tCheckboxOption } from '../CheckboxList/CheckboxList';

interface ISupportLanguageFilter {
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  className?: string;
}

const SupportLanguageFilter: FC<ISupportLanguageFilter> = ({
  selectedOptions,
  onChange,
  className
}) => {
  const [currentSelected, setCurrentSelected] = useState<tCheckboxOption[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const languages = useSelector(userSelectors.selectSortedAllLangs);

  const prepareSelectedOptions = useCallback(
    (options: string[]) =>
      languages.reduce(
        (acc, cur) =>
          options.join(',').includes(String(cur.id))
            ? [
                ...acc,
                {
                  title: cur.systemName,
                  value: String(cur.id)
                }
              ]
            : acc,
        [] as tCheckboxOption[]
      ),
    [languages]
  );

  useEffect(() => {
    setCurrentSelected(prepareSelectedOptions(selectedOptions));
  }, [prepareSelectedOptions, selectedOptions, setCurrentSelected]);

  const handleChange = useCallback(
    (options: tCheckboxOption[]) => {
      onChange(options.map((option: tCheckboxOption) => option.value));
    },
    [onChange]
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  return (
    <SWrapper className={cn(className)}>
      <SSearchInput
        value={searchQuery}
        onChange={handleSearch}
        placeholder={`${t('frontend.course.start_typing_here')}...`}
      />

      <SCheckboxList
        options={languages
          .filter((option) =>
            option.systemName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((option) => ({
            prefix: option.systemName,
            title: '',
            value: String(option.id)
          }))}
        onChange={handleChange}
        selectedOptions={currentSelected}
      />
    </SWrapper>
  );
};

export default SupportLanguageFilter;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  ${customMediaQuery('tablet')} {
    width: 332px;
    max-height: 400px;
  }
`;

const SCheckboxList = styled(CheckboxList)`
  width: 100%;
  overflow-y: auto;

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
`;

const SSearchInput = styled.input`
  display: inline-block;
  border: none;
  background: #f0f0f3;
  border-radius: 8px;
  width: 100%;
  padding: 8px 12px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: #2d2d3a;
  margin: 0 0 16px;

  &:focus,
  &:active {
    outline: none;
  }

  ::-webkit-input-placeholder {
    color: rgba(45, 45, 58, 0.5);
  }
`;
