import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Translate } from 'i18n';
import { publicPageSelectors } from 'students/stores/public';

import CheckboxList, { tCheckboxOption } from '../CheckboxList/CheckboxList';

interface IFocusOnFilter {
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  className?: string;
}

const FocusOnFilter: FC<IFocusOnFilter> = ({ selectedOptions, onChange, className }) => {
  const [currentSelected, setCurrentSelected] = useState<tCheckboxOption[]>([]);
  const skills = useSelector(publicPageSelectors.selectSkills);

  const prepareSelectedOptions = useCallback(
    (options: string[]) =>
      skills?.reduce(
        (acc, cur) =>
          options.indexOf(String(cur.id)) > -1
            ? [
                ...acc,
                {
                  title: cur.name,
                  value: String(cur.id)
                }
              ]
            : acc,
        [] as tCheckboxOption[]
      ) || [],
    [skills]
  );

  useEffect(() => {
    setCurrentSelected(prepareSelectedOptions(selectedOptions));
  }, [prepareSelectedOptions, selectedOptions]);

  const handleChange = useCallback(
    (options: tCheckboxOption[]) => {
      onChange(options.map((option: tCheckboxOption) => option.value));
    },
    [onChange]
  );

  return (
    <SWrapper className={cn(className)}>
      <STitle>
        <Translate str="frontend.course.focus_on" />
      </STitle>

      <CheckboxList
        options={
          skills?.map((option) => ({
            title: option.name.charAt(0).toUpperCase() + option.name.slice(1),
            value: String(option.id)
          })) || []
        }
        onChange={handleChange}
        selectedOptions={currentSelected}
      />
    </SWrapper>
  );
};

export default FocusOnFilter;

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
