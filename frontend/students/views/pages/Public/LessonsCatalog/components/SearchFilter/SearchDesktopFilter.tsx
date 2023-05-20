import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { t } from 'i18n';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { useAnimateScenarios, useOutsideClick } from 'students/views/shared/hooks';

import { useDebounce, useFilter, useFilterEventListener } from '../../hooks';
import { FILTER_SEARCH } from '../../Config';
import MagnifierIcon from '../../../assets/magnifier_icon.svg';
import CrossIcon from '../../../assets/cross_icon.svg';
import { animationScenarios } from '../../../assets/animation/scenarios';
import { getAllFilterConditions } from '../../helpers/filter';

interface ISearchFilterBlock {
  isLight?: boolean;
  className?: string;
}

const SearchDesktopFilter: FC<ISearchFilterBlock> = ({ isLight, className }) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [, setFilterOptions] = useFilter(FILTER_SEARCH);
  const { debounce } = useDebounce();
  const [searchControls, animateSearchControls] = useAnimateScenarios(animationScenarios);

  useEffect(() => {
    const data = getAllFilterConditions(FILTER_SEARCH)[0];

    if (data) {
      setSearchQuery(data);
      animateSearchControls(['search-open']);
    } else {
      setSearchQuery('');
    }
  }, [animateSearchControls]);

  useFilterEventListener(FILTER_SEARCH, ({ data }) => {
    setSearchQuery(data[0] || '');
  });

  const handleOpenInput = useCallback(() => {
    animateSearchControls(['search-open']);
    inputRef?.current && inputRef.current.focus();
  }, [animateSearchControls]);

  const handleCloseInput = useCallback(() => {
    if (!searchQuery) {
      inputRef?.current && inputRef.current.blur();
      animateSearchControls(['search-close']);
    }
  }, [animateSearchControls, searchQuery]);

  const handleClear = useCallback(() => {
    setFilterOptions([]);
  }, [setFilterOptions]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSearchQuery(value);

      debounce(() => {
        setFilterOptions(value ? [value] : []);
      }, 500);
    },
    [debounce, setFilterOptions]
  );

  useOutsideClick(filterRef, handleCloseInput, []);

  const getClearButtonColor = useCallback(() => {
    if (isLight) {
      return searchQuery ? '#2d2d3a' : '#a7aab6';
    }

    return searchQuery ? '#ffffff ' : 'rgb(140, 204, 224) ';
  }, [isLight, searchQuery]);

  return (
    <SWrapper ref={filterRef} className={cn(className)}>
      <SInputWrapper
        $isLight={!!isLight}
        $isActive={!!searchQuery}
        onClick={handleOpenInput}
        onBlur={handleCloseInput}
        as={motion.div}
        initial={{
          x: 0
        }}
        animate={searchControls}
      >
        <UrlIcon
          url={MagnifierIcon}
          height="24px"
          width="24px"
          color={isLight ? '#2d2d3a' : '#ffffff'}
        />

        <SInput
          ref={inputRef}
          value={searchQuery}
          onChange={handleChange}
          placeholder={t('frontend.course.search')}
          $isLight={!!isLight}
          $isActive={!!searchQuery}
        />

        {searchQuery && (
          <SClearButton onClick={handleClear} $isLight={!!isLight}>
            <UrlIcon
              url={CrossIcon}
              width="16px"
              height="16px"
              color={getClearButtonColor()}
            />
          </SClearButton>
        )}
      </SInputWrapper>
    </SWrapper>
  );
};

export default SearchDesktopFilter;

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

const SInputWrapper = styled.div<{ $isLight: boolean; $isActive: boolean }>`
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ $isLight }) =>
    $isLight
      ? `
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    
    &:hover,
    &:focus,
    &:active {
      border: 1px solid #00A5D7;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
      outline: none;
    }
  `
      : `
    background: rgba(0, 0, 0, 0.14);
    border: 1px solid transparent;
    color: #ffffff;
    
    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  `}

  ${({ $isLight, $isActive }) =>
    !$isLight && $isActive
      ? `
    background: rgba(0, 0, 0, 0.24);
  `
      : ''}

  ${({ $isActive }) =>
    $isActive
      ? `
        width: 200px;
      `
      : `
        width: 54px;
      `}
`;

const SInput = styled.input<{ $isLight: boolean; $isActive: boolean }>`
  background: transparent;
  border: none;
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25rem;
  width: calc(100% - 48px);

  color: ${({ $isLight }) => ($isLight ? '#2d2d3a' : '#ffffff')};

  &:active,
  &:focus {
    outline: none;
  }

  ::-webkit-input-placeholder {
    color: ${({ $isLight }) => ($isLight ? '#2d2d3a' : 'rgb(128, 190, 209)')};
  }
`;

const SClearButton = styled.div<{ $isLight: boolean }>`
  background: ${({ $isLight }) => ($isLight ? '#f6f6f6' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ $isLight }) => ($isLight ? '#f0f0f0' : 'rgba(255, 255, 255, 0.25)')};
  }
`;
