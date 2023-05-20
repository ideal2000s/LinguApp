import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import UrlIcon from 'students/views/shared/components/UrlIcon';

import CheckboxList, { tCheckboxOption } from '../CheckboxList/CheckboxList';
import activeStarIcon from '../../../assets/star_icon.svg';
import inactiveStarIcon from '../../../assets/star_inactive_icon.svg';

const DURATION_CONFIG = [
  {
    title: '>4.5',
    fields: '4.5_stars'
  },
  {
    title: '>4.0',
    fields: '4_stars'
  }
];

interface IRatingFilter {
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  className?: string;
}

const RatingFilter: FC<IRatingFilter> = ({ selectedOptions, onChange, className }) => {
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

  const renderRatingOption = useCallback(
    (optionIndex: number) =>
      [1, 2, 3, 4, 5].map((_, starIndex) => (
        <UrlIcon
          key={`${optionIndex}_${starIndex}`}
          url={starIndex + optionIndex < 5 ? activeStarIcon : inactiveStarIcon}
          height="18px"
          width="18px"
        />
      )),
    []
  );

  return (
    <SWrapper className={cn(className)}>
      <STitle>
        <Translate str="frontend.course.rating" />
      </STitle>

      <CheckboxList
        options={DURATION_CONFIG.map((option, index) => ({
          title: (
            <SRatingOptionTitle>
              {option.title}
              {renderRatingOption(index)}
            </SRatingOptionTitle>
          ),
          value: option.fields
        }))}
        onChange={handleChange}
        selectedOptions={currentSelected}
      />
    </SWrapper>
  );
};

export default RatingFilter;

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

const SRatingOptionTitle = styled.div`
  display: flex;
`;
