import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import { FILTERS_CONFIG } from './Config';
import CheckboxList, { tCheckboxOption } from '../CheckboxList/CheckboxList';

interface ICategoryFilter {
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  className?: string;
}

const CategoryFilter: FC<ICategoryFilter> = ({
  selectedOptions,
  onChange,
  className
}) => {
  const [currentSelected, setCurrentSelected] = useState<tCheckboxOption[]>([]);

  const prepareSelectedOptions = (options: string[]) =>
    FILTERS_CONFIG.reduce(
      (acc, cur) =>
        options.join(',').includes(cur.fields)
          ? [
              ...acc,
              {
                title: cur.title,
                value: cur.fields
              }
            ]
          : acc,
      [] as tCheckboxOption[]
    );

  useEffect(() => {
    setCurrentSelected(prepareSelectedOptions(selectedOptions));
  }, [selectedOptions, setCurrentSelected]);

  const handleChange = useCallback(
    (options: tCheckboxOption[]) => {
      onChange(options.map((option: tCheckboxOption) => option.value));
    },
    [onChange]
  );

  return (
    <SWrapper className={cn(className)}>
      <CheckboxList
        options={FILTERS_CONFIG.map((option) => ({
          title: option.title,
          value: option.fields
        }))}
        onChange={handleChange}
        selectedOptions={currentSelected}
      />
    </SWrapper>
  );
};

export default CategoryFilter;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 240px;
`;
