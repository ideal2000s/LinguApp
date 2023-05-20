import React, { FC, useCallback, RefObject, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { useOutsideClick } from 'students/views/shared/hooks';

import { SORT_BY_CONFIG } from './Config';
import { FILTER_SORT } from '../../Config';
import { useFilter } from '../../hooks';
import checkIcon from '../../../assets/check_icon.svg';

interface ISortByFilter {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement> | null;
  className?: string;
}

const SortByFilter: FC<ISortByFilter> = ({ onClose, triggerRef, className }) => {
  const filterRef = useRef(null);
  const [filterOptions, setFilterOptions] = useFilter(FILTER_SORT);

  useOutsideClick(filterRef, onClose, triggerRef ? [triggerRef] : []);

  const handleOptionClick = useCallback(
    (option: typeof SORT_BY_CONFIG[number]) => {
      setFilterOptions(filterOptions.includes(option.fields) ? [] : [option.fields]);
    },
    [filterOptions, setFilterOptions]
  );

  return (
    <SWrapper ref={filterRef} className={cn(className)}>
      {SORT_BY_CONFIG.map((option, index) => (
        <SSortByOptionItem key={index} onClick={() => handleOptionClick(option)}>
          <SSortByTitle>{option.title}</SSortByTitle>

          {filterOptions.includes(option.fields) && (
            <UrlIcon url={checkIcon} height="12px" width="15px" color="#00a5d7" />
          )}
        </SSortByOptionItem>
      ))}
    </SWrapper>
  );
};

export default SortByFilter;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  box-shadow: 0 0 20px rgba(45, 43, 57, 0.1);
  border-radius: 8px;
  padding: 12px;
  width: 168px;
`;

const SSortByOptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.3s;
  cursor: pointer;
  margin: 0 0 6px;
  width: 100%;

  &:last-child {
    margin: 0;
  }

  &:hover {
    opacity: 1;
  }
`;

const SSortByTitle = styled.h3`
  padding: 0;
  margin: 0;
  color: #2d2d3a;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
`;
