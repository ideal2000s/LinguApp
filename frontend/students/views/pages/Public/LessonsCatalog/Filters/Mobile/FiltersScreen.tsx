import React, { forwardRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Translate } from 'i18n';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { SPrimaryButton } from 'students/views/shared/styled';
import { userSelectors } from 'students/stores/user';
import CloseIcon from 'students/views/shared/assets/icons/close_icon.svg';

import SupportLanguageFilterScreen from './SupportLanguageFilterScreen';
import {
  FILTER_CATEGORY,
  FILTER_DURATION,
  FILTER_FOCUS,
  FILTER_LANGUAGE,
  FILTER_LEVEL,
  FILTER_RATING,
  FILTER_SUPPORT_LANGUAGE
} from '../../Config';
import { useFilter } from '../../hooks';
import CategoryFilter from '../../components/CategoryFilter';
import DurationFilter from '../../components/DurationFilter';
import FocusOnFilter from '../../components/FocusOnFilter';
import LanguageFilter from '../../components/LanguageFilter';
import LevelFilter from '../../components/LevelFilter';

interface IFiltersScreen {
  onClose: () => void;
  className?: string;
}

const FiltersScreen = forwardRef<HTMLDivElement | null, IFiltersScreen>(function (
  { onClose, className },
  ref
) {
  const languages = useSelector(userSelectors.selectSortedAllLangs);

  const [filterLanguageOptions, setFilterLanguageOptions] = useFilter(FILTER_LANGUAGE);
  const [filterLevelOptions, setFilterLevelOptions] = useFilter(FILTER_LEVEL);
  const [filterCategoryOptions, setFilterCategoryOptions] = useFilter(FILTER_CATEGORY);
  const [filterFocusOnOptions, setFilterFocusOnOptions] = useFilter(FILTER_FOCUS);
  const [filterDurationOptions, setFilterDurationOptions] = useFilter(FILTER_DURATION);
  const [filterRatingOptions, setFilterRatingOptions] = useFilter(FILTER_RATING);
  const [filterSupportedLanguageOptions, setFilterSupportedLanguageOptions] = useFilter(
    FILTER_SUPPORT_LANGUAGE
  );
  const [
    supportLanguageScreenVisible,
    setSupportLanguageScreenVisible
  ] = useState<boolean>(false);

  const openSupportLanguageScreen = useCallback(() => {
    setSupportLanguageScreenVisible(true);
  }, [setSupportLanguageScreenVisible]);

  const closeSupportLanguageScreen = useCallback(() => {
    setSupportLanguageScreenVisible(false);
  }, [setSupportLanguageScreenVisible]);

  const handleShow = () => {
    onClose();
  };

  const handleClearFilters = () => {
    setFilterLanguageOptions([]);
    setFilterLevelOptions([]);
    setFilterCategoryOptions([]);
    setFilterFocusOnOptions([]);
    setFilterDurationOptions([]);
    setFilterRatingOptions([]);
    setFilterSupportedLanguageOptions([]);
  };

  return (
    <SWrapper ref={ref} className={cn(className)}>
      <SHeaderBlock>
        <SHeader>
          <Translate str="frontend.course.filters" />
        </SHeader>

        <SCloseIconWrapper onClick={onClose}>
          <UrlIcon url={CloseIcon} width="18px" height="18px" color="#2d2d3a" />
        </SCloseIconWrapper>
      </SHeaderBlock>

      <SFiltersWrapper>
        <SFilterBlock>
          <LanguageFilter
            selectedOptions={filterLanguageOptions}
            onChange={setFilterLanguageOptions}
          />
        </SFilterBlock>

        <SFilterBlock>
          <SFilterBlockTitle>
            <Translate str="frontend.course.level" />
          </SFilterBlockTitle>

          <LevelFilter
            variant="long"
            selectedOptions={filterLevelOptions}
            onChange={setFilterLevelOptions}
          />
        </SFilterBlock>

        <SFilterBlock>
          <SFlexBetween>
            <SFilterBlockTitle>
              <Translate str="frontend.course.i_understand" />
            </SFilterBlockTitle>

            <SLinkButton onClick={openSupportLanguageScreen}>
              <Translate str="frontend.course.select_languages" />
            </SLinkButton>
          </SFlexBetween>

          {filterSupportedLanguageOptions.length > 0 && (
            <SSelectedSupportLanguages>
              {filterSupportedLanguageOptions
                .map(
                  (lang) =>
                    languages.find((option) => String(option.id) === lang)?.systemName ||
                    '-'
                )
                .join(', ')}
            </SSelectedSupportLanguages>
          )}

          {supportLanguageScreenVisible && (
            <SupportLanguageFilterScreen
              onClose={closeSupportLanguageScreen}
              selectedOptions={filterSupportedLanguageOptions}
              onChange={setFilterSupportedLanguageOptions}
            />
          )}
        </SFilterBlock>

        <SFilterBlock>
          <SFilterBlockTitle>
            <Translate str="frontend.course.category" />
          </SFilterBlockTitle>

          <CategoryFilter
            selectedOptions={filterCategoryOptions}
            onChange={setFilterCategoryOptions}
          />
        </SFilterBlock>

        <SFilterBlock>
          <FocusOnFilter
            selectedOptions={filterFocusOnOptions}
            onChange={setFilterFocusOnOptions}
          />
        </SFilterBlock>

        <SFilterBlock>
          <DurationFilter
            selectedOptions={filterDurationOptions}
            onChange={setFilterDurationOptions}
          />
        </SFilterBlock>

        {/*<SFilterBlock>*/}
        {/*  <RatingFilter*/}
        {/*    selectedOptions={filterRatingOptions}*/}
        {/*    onChange={setFilterRatingOptions}*/}
        {/*  />*/}
        {/*</SFilterBlock>*/}
      </SFiltersWrapper>

      {filterLanguageOptions.length ||
      filterLevelOptions.length ||
      filterCategoryOptions.length ||
      filterFocusOnOptions.length ||
      filterDurationOptions.length ||
      filterRatingOptions.length ||
      filterSupportedLanguageOptions.length ? (
        <SFooter>
          <SClearButton onClick={handleClearFilters}>
            <Translate str="frontend.course.clear_filters" />
          </SClearButton>

          <SShowButton onClick={handleShow}>
            <Translate str="frontend.course.apply_filters" />
          </SShowButton>
        </SFooter>
      ) : null}
    </SWrapper>
  );
});

export default FiltersScreen;

const SWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(248, 249, 252);
  padding: 16px 16px 90px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  overflow-y: scroll;
`;

const SHeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 32px;
`;

const SHeader = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 2.25rem;
  color: #2d2d3a;
  margin: 0;
  padding: 0;
`;

const SCloseIconWrapper = styled.div``;

const SFiltersWrapper = styled.div`
  width: 100%;
  padding-bottom: 15px;
`;

const SFilterBlock = styled.div`
  padding: 0 0 24px;
  margin: 0 0 24px;
  border-bottom: 1px solid #e6e6f0;
  width: 100%;

  &:last-child {
    border-bottom: none;
    margin: 0;
    padding: 0;
  }
`;

const SFlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > h3 {
    margin: 0;
  }
`;

const SLinkButton = styled.button`
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1rem;
  color: #0094c5;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SSelectedSupportLanguages = styled.p`
  width: 100%;
  margin: 8px 0 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
`;

const SFilterBlockTitle = styled.h3`
  margin: 0 0 16px;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 2.25rem;
  color: #2d2d3a;
`;

const SFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SClearButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #5e5d71;
  margin-right: 12px;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SShowButton = styled(SPrimaryButton)`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25rem;
  margin: 0;
  min-height: 3rem;
  max-height: 3rem;

  ${styleInnerButton()} {
    padding: 0.75rem 1.5rem;
  }
`;
