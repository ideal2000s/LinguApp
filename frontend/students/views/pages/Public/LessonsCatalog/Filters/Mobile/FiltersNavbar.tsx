import React, { FC, useCallback, useEffect, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import cn from 'classnames';
import noScroll from 'no-scroll';
import { Translate } from 'i18n';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import UrlIcon from 'students/views/shared/components/UrlIcon';

import FiltersScreen from './FiltersScreen';
import SearchScreen from './SearchScreen';
import SortByFilterScreen from './SortByFitlerScreen';
import { FILTER_SORT } from '../../Config';
import { SORT_BY_CONFIG } from '../../components/SortByFilter/Config';
import { SearchFilterStatus } from '../../components/SearchFilter';
import FiltersIcon from '../../../assets/filters_icon.svg';
import SearchMagnifierIcon from '../../../assets/search_magnifier.svg';
import { useFilterEventListener } from '../../hooks';
import { getOneFilterCondition } from '../../helpers/filter';

interface IFiltersNavbar {
  isSticky: boolean;
  className?: string;
}

const FiltersNavbar: FC<IFiltersNavbar> = ({ className, isSticky }) => {
  const [filtersScreenVisible, setFiltersScreenVisible] = useState<boolean>(false);
  const [searchScreenVisible, setSearchScreenVisible] = useState<boolean>(false);
  const [sortByScreenVisible, setSortByScreenVisible] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('');

  const openFiltersScreen = useCallback(() => {
    noScroll.on();
    setFiltersScreenVisible(true);
  }, [setFiltersScreenVisible]);

  const closeFiltersScreen = useCallback(() => {
    noScroll.off();
    setFiltersScreenVisible(false);
  }, [setFiltersScreenVisible]);

  const openSearchScreen = useCallback(() => {
    noScroll.on();
    setSearchScreenVisible(true);
  }, [setSearchScreenVisible]);

  const closeSearchScreen = useCallback(() => {
    noScroll.off();
    setSearchScreenVisible(false);
  }, [setSearchScreenVisible]);

  useEffect(() => {
    setSortBy(
      SORT_BY_CONFIG.find(
        (option) => option.fields === getOneFilterCondition(FILTER_SORT)
      )?.title || ''
    );
  }, []);

  useFilterEventListener(FILTER_SORT, ({ data }) => {
    setSortBy(SORT_BY_CONFIG.find((option) => option.fields === data[0])?.title || '');
  });

  useEffect(() => {
    return () => {
      noScroll.off();
    };
  }, []);

  const openSortByScreen = useCallback(() => {
    setSortByScreenVisible(true);
  }, [setSortByScreenVisible]);

  const closeSortByScreen = useCallback(() => {
    setSortByScreenVisible(false);
  }, [setSortByScreenVisible]);

  return (
    <SContainer className={cn(className)}>
      <SWrapper $isSticky={isSticky}>
        <SGroupWrapper>
          <OverlayTrigger
            rootClose
            show={searchScreenVisible}
            overlay={<SearchScreen onClose={closeSearchScreen} />}
          >
            <SSearchFilterButton onClick={openSearchScreen}>
              <SUrlIconWithGap
                url={SearchMagnifierIcon}
                height="22px"
                width="22px"
                color="#00688E"
              />
              <SearchFilterStatus />
            </SSearchFilterButton>
          </OverlayTrigger>

          <OverlayTrigger
            rootClose
            show={sortByScreenVisible}
            overlay={<SortByFilterScreen onClose={closeSortByScreen} />}
          >
            <STransparentButton onClick={openSortByScreen}>
              {sortBy || <Translate str="frontend.course.select_dots" />}
            </STransparentButton>
          </OverlayTrigger>
        </SGroupWrapper>

        <OverlayTrigger
          rootClose
          show={filtersScreenVisible}
          overlay={<FiltersScreen onClose={closeFiltersScreen} />}
        >
          <SFilterButton onClick={openFiltersScreen}>
            <UrlIcon url={FiltersIcon} height="22px" width="22px" color="#00688E" />
          </SFilterButton>
        </OverlayTrigger>
      </SWrapper>
    </SContainer>
  );
};

export default FiltersNavbar;

const SContainer = styled.div`
  width: 100%;
`;

const SWrapper = styled.div<{ $isSticky: boolean }>`
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  box-shadow: 0px -2px 10px rgba(255, 255, 255, 0.2), 0px 1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  margin: ${({ $isSticky }) => ($isSticky ? '16px' : '0 0 16px 0')};
  padding: 9px 16px;
`;

const SGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-right: 30px;
  position: relative;

  &:after {
    content: '';
    width: 1px;
    height: 26px;
    background: rgba(0, 104, 142, 0.1);
    position: absolute;
    top: 1px;
    right: -22px;
  }
`;

const SFilterButton = styled(ButtonGeneral)`
  background: transparent;
  border: none;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: rgba(0, 104, 142, 0.5);
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SSearchFilterButton = styled(SFilterButton)`
  width: 100%;

  ${styleInnerButton()} {
    justify-content: left;
  }
`;

const SUrlIconWithGap = styled(UrlIcon)`
  margin-right: 4px;
`;

const STransparentButton = styled(ButtonGeneral)`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: #00688e;
  position: relative;
  white-space: nowrap;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 12px;
    right: -14px;
    width: 0;
    height: 0;
    border-top: 5px solid #00688e;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-radius: 2px;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;
