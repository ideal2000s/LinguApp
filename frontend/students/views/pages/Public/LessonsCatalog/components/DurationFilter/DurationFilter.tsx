import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';

import { DURATION_CONFIG } from './Config';
import CheckboxList, { tCheckboxOption } from '../CheckboxList/CheckboxList';

interface IDurationFilter {
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  className?: string;
}

const DurationFilter: FC<IDurationFilter> = ({
  selectedOptions,
  onChange,
  className
}) => {
  const [currentSelected, setCurrentSelected] = useState<tCheckboxOption[]>([]);

  const prepareSelectedOptions = (options: string[]) =>
    DURATION_CONFIG.reduce(
      (acc, cur) =>
        options.indexOf(cur.fields) > -1
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
      <STitle>
        <Translate str="frontend.course.duration" />
      </STitle>

      <CheckboxList
        options={DURATION_CONFIG.map((option) => ({
          title: option.title,
          value: option.fields
        }))}
        onChange={handleChange}
        selectedOptions={currentSelected}
      />
    </SWrapper>
  );
};

export default DurationFilter;

const SWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 240px;
`;

const STitle = styled.h3`
  margin: 0 32px 0 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: #2d2d3a;
`;
