import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import cn from 'classnames';
import { Tooltip } from 'react-bootstrap';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { customMediaQuery } from 'students/views/shared/styled';

import AdditionalFilterBlock from './AdditionalFilterBlock';
import SortByButton from './SortByButton';
import TooltipFilterBlock from './TooltipFilterBlock';
import {
  FILTER_LEVEL,
  FILTER_CATEGORY,
  FILTER_DURATION,
  FILTER_FOCUS,
  FILTER_LANGUAGE,
  FILTER_RATING,
  FILTER_SUPPORT_LANGUAGE
} from '../../Config';
import DurationFilter from '../../components/DurationFilter';
import CategoryFilter, { CategoryFilterStatus } from '../../components/CategoryFilter';
import FocusOnFilter from '../../components/FocusOnFilter';
import LanguageFilter, { LanguageFilterStatus } from '../../components/LanguageFilter';
import LevelFilter, { LevelFilterStatus } from '../../components/LevelFilter';
import SortByFilter from '../../components/SortByFilter';
import SupportLanguageFilter, {
  SupportLanguageFilterStatus
} from '../../components/SupportLanguageFilter';
import TooltipFilterButton from '../../components/TooltipFilterButton';
import { SearchDesktopFilter } from '../../components/SearchFilter';
import MoreDotsIcon from '../../../assets/more_dots_icon.svg';

interface IFiltersGroup {
  variant: 'light' | 'default';
  className?: string;
}

const FiltersGroup: FC<IFiltersGroup> = ({ variant, className }) => {
  const isLight = variant === 'light';
  return (
    <SScrollableWrapper>
      <SWrapper className={cn(className)}>
        <GlobalTooltipStyle />

        <SFilterButtonsBlock>
          <SearchDesktopFilter isLight={isLight} />

          <TooltipFilterButton
            isLight={isLight}
            popover={(close, triggerRef) => (
              <Tooltip id="language-tooltip-filter-block" className="filer-tooltip">
                <TooltipFilterBlock
                  filterName={FILTER_LANGUAGE}
                  onSave={close}
                  triggerRef={triggerRef}
                >
                  {(options: string[], setOptions: (opt: string[]) => void) => (
                    <LanguageFilter selectedOptions={options} onChange={setOptions} />
                  )}
                </TooltipFilterBlock>
              </Tooltip>
            )}
          >
            <LanguageFilterStatus />
          </TooltipFilterButton>

          <TooltipFilterButton
            isLight={isLight}
            popover={(close, triggerRef) => (
              <Tooltip id="level-tooltip-filter-block" className="filer-tooltip">
                <TooltipFilterBlock
                  filterName={FILTER_LEVEL}
                  onSave={close}
                  triggerRef={triggerRef}
                >
                  {(options: string[], setOptions: (opt: string[]) => void) => (
                    <LevelFilter selectedOptions={options} onChange={setOptions} />
                  )}
                </TooltipFilterBlock>
              </Tooltip>
            )}
          >
            <LevelFilterStatus />
          </TooltipFilterButton>

          <TooltipFilterButton
            isLight={isLight}
            popover={(close, triggerRef) => (
              <Tooltip
                id="support-language-tooltip-filter-block"
                className="filer-tooltip"
              >
                <TooltipFilterBlock
                  filterName={FILTER_SUPPORT_LANGUAGE}
                  onSave={close}
                  triggerRef={triggerRef}
                >
                  {(options: string[], setOptions: (opt: string[]) => void) => (
                    <SupportLanguageFilter
                      selectedOptions={options}
                      onChange={setOptions}
                    />
                  )}
                </TooltipFilterBlock>
              </Tooltip>
            )}
          >
            <SupportLanguageFilterStatus />
          </TooltipFilterButton>

          <TooltipFilterButton
            isLight={isLight}
            popover={(close, triggerRef) => (
              <Tooltip id="category-tooltip-filter-block" className="filer-tooltip">
                <TooltipFilterBlock
                  filterName={FILTER_CATEGORY}
                  onSave={close}
                  triggerRef={triggerRef}
                >
                  {(options: string[], setOptions: (opt: string[]) => void) => (
                    <CategoryFilter selectedOptions={options} onChange={setOptions} />
                  )}
                </TooltipFilterBlock>
              </Tooltip>
            )}
          >
            <CategoryFilterStatus />
          </TooltipFilterButton>

          <TooltipFilterButton
            isLight={isLight}
            popover={(close, triggerRef) => (
              <Tooltip id="additional-tooltip-filter-block" className="filer-tooltip">
                <AdditionalFilterBlock
                  filterNames={[FILTER_FOCUS, FILTER_DURATION, FILTER_RATING]}
                  onSave={close}
                  triggerRef={triggerRef}
                >
                  {(filtersControls) => (
                    <>
                      <FocusOnFilter
                        selectedOptions={filtersControls[0][0]}
                        onChange={filtersControls[0][1]}
                      />

                      <SDivider />

                      <DurationFilter
                        selectedOptions={filtersControls[1][0]}
                        onChange={filtersControls[1][1]}
                      />

                      {/*<SDivider />*/}

                      {/*<RatingFilter*/}
                      {/*  selectedOptions={filtersControls[2][0]}*/}
                      {/*  onChange={filtersControls[2][1]}*/}
                      {/*/>*/}
                    </>
                  )}
                </AdditionalFilterBlock>
              </Tooltip>
            )}
          >
            <UrlIcon
              url={MoreDotsIcon}
              height="24px"
              width="24px"
              color={isLight ? '#2d2d3a' : '#ffffff'}
            />
          </TooltipFilterButton>
        </SFilterButtonsBlock>

        <SSortByButton
          isLight={isLight}
          popover={(close, triggerRef) => (
            <Tooltip id="sort-by-tooltip-filter-block" className="filer-tooltip">
              <SortByFilter onClose={close} triggerRef={triggerRef} />
            </Tooltip>
          )}
        />
      </SWrapper>
    </SScrollableWrapper>
  );
};

export default FiltersGroup;

const SScrollableWrapper = styled.div`
  overflow-x: auto;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SWrapper = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${customMediaQuery('tablet')} {
    display: flex;
    flex-wrap: wrap;
    min-width: 780px;
  }
`;

const SFilterButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const GlobalTooltipStyle = createGlobalStyle`
  .tooltip {
    z-index: 2;
  }
`;

const SDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #e6e6f0;
  margin: 24px 0;
`;

const SSortByButton = styled(SortByButton)`
  margin-right: 18px;
`;
