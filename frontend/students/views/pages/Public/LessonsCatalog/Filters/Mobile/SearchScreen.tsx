import React, {
  ChangeEvent,
  useState,
  forwardRef,
  useContext,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cn from 'classnames';
import { t, Translate } from 'i18n';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { ILesson } from 'students/models';
import { SPrimaryButton } from 'students/views/shared/styled';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import CloseIcon from 'students/views/shared/assets/icons/close_icon.svg';

import { useDebounce, useFilter, useFilterEventListener } from '../../hooks';
import { FILTER_SEARCH } from '../../Config';
import LessonsCatalogContext from '../../LessonsCatalogContext';
import LoadingBackground from '../../components/LoadingBackground';
import LessonMetrics from '../../components/LessonCard/LessonMetrics';
import SearchMagnifierIcon from '../../../assets/search_magnifier.svg';
import CrossIcon from '../../../assets/cross_icon.svg';
import { getAllFilterConditions, getOneFilterCondition } from '../../helpers/filter';

interface ISearchInput {
  onClose: () => void;
  className?: string;
}

const SearchScreen = forwardRef<HTMLDivElement | null, ISearchInput>(function (
  { onClose, className },
  ref
) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOptions, setFilterOptions] = useFilter(FILTER_SEARCH);
  const { lessonsCatalog, catalogIsLoading } = useContext(LessonsCatalogContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFetchingRef = useRef(false);
  const { debounce } = useDebounce();

  const placeFocusOnSearchInput = useCallback(() => {
    inputRef?.current && inputRef.current.focus();
  }, []);

  useEffect(() => {
    placeFocusOnSearchInput();
  }, [placeFocusOnSearchInput]);

  useEffect(() => {
    setSearchQuery(getAllFilterConditions(FILTER_SEARCH)[0] || '');
  }, []);

  useFilterEventListener(FILTER_SEARCH, ({ data }) => {
    setSearchQuery(data[0] || '');
  });

  const handleClear = useCallback(() => {
    setFilterOptions([]);
    placeFocusOnSearchInput();
  }, [placeFocusOnSearchInput, setFilterOptions]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSearchQuery(value);
      isFetchingRef.current = true;

      debounce(() => {
        isFetchingRef.current = false;
        setFilterOptions(value ? [value] : []);
      }, 500);
    },
    [debounce, setFilterOptions]
  );

  const renderResults = () => {
    if (searchQuery) {
      return lessonsCatalog?.lessons.length ? (
        lessonsCatalog?.lessons.map((lesson: ILesson, index: number) => (
          <SLink key={index} to={`/lessons/${lesson.id}`}>
            <SLessonCard key={index}>
              <SLessonImage src={lesson.imageURL || ''} />

              <SLessonInformation>
                <SLessonMetrics
                  duration={lesson.averageDuration || 0}
                  phrasesCount={lesson.phrasesCount}
                  language={lesson.language}
                  supportLanguage={null}
                  level={lesson.level}
                />

                <SLessonTitle>{lesson.title}</SLessonTitle>
              </SLessonInformation>
            </SLessonCard>
          </SLink>
        ))
      ) : (
        <SNoResultsWrapper>
          <p>
            <Translate str="frontend.course.no_results" />
            <strong>{getOneFilterCondition(FILTER_SEARCH)}</strong>
          </p>
        </SNoResultsWrapper>
      );
    }

    return null;
  };

  return (
    <SWrapper className={cn(className)} ref={ref}>
      <SSearchBlock>
        <SSearchInputWrapper>
          <SSearchInput
            ref={inputRef}
            value={searchQuery}
            onChange={handleChange}
            placeholder={t('frontend.course.search')}
          />

          {searchQuery && (
            <SCloseButton onClick={handleClear}>
              <UrlIcon url={CrossIcon} width="16px" height="16px" color="#a7aab6" />
            </SCloseButton>
          )}
        </SSearchInputWrapper>

        <SCloseIconWrapper onClick={onClose}>
          <UrlIcon url={CloseIcon} width="18px" height="18px" color="#2d2d3a" />
        </SCloseIconWrapper>
      </SSearchBlock>

      <SResultsWrapper>
        {!catalogIsLoading && !isFetchingRef.current && renderResults()}
      </SResultsWrapper>

      <LoadingBackground />

      {filterOptions.length ? (
        <SFooter>
          <SClearButton onClick={handleClear}>
            <Translate str="frontend.course.clear" />
          </SClearButton>

          <SShowButton onClick={onClose}>
            <Translate str="frontend.course.show_all" />
          </SShowButton>
        </SFooter>
      ) : null}
    </SWrapper>
  );
});

export default SearchScreen;

const SLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;

  &:hover {
    color: inherit;
    text-decoration: inherit;
  }

  &:visited {
    color: inherit;
    text-decoration: inherit;
  }
`;

const SWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(248, 249, 252);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
`;

const SSearchBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
`;

const SSearchInputWrapper = styled.div`
  width: 100%;
  position: relative;

  &:before {
    content: '';
    background-image: url(${SearchMagnifierIcon});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 24px;
    width: 24px;
    position: absolute;
    top: 13px;
    left: 15px;
  }
`;

const SSearchInput = styled.input`
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  border: 1px solid #ebebeb;
  border-radius: 100px;
  width: 100%;
  padding: 12px 32px 12px 46px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #2d2d3a;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SCloseIconWrapper = styled.div`
  margin: 0 0 0 16px;
`;

const SCloseButton = styled.div`
  background: #f6f6f6;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  transition: background 0.3s;
  position: absolute;
  top: 12px;
  right: 10px;

  &:hover {
    background: #f0f0f0;
  }
`;

const SResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
`;

const SLessonCard = styled.div`
  display: flex;
  margin: 0 0 32px;
`;

const SLessonImage = styled.img`
  height: 60px;
  width: 60px;
  margin-right: 12px;
  border-radius: 12px;
  background: #e6e6f0;
`;

const SLessonInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const SLessonMetrics = styled(LessonMetrics)`
  margin: 0 0 4px;

  & > div {
    margin-right: 8px;
  }

  & > div > div {
    padding: 6px 4px;
  }

  & > div > div > div {
    max-width: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 6px;
  }

  & > div > div > span {
    margin: 0 2px 0 4px;
  }

  & > h2 {
    font-size: 0.75rem;
  }
`;

const SLessonTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #2d2d3a;
  margin: 0;
  padding: 0;
`;

const SNoResultsWrapper = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: rgba(45, 45, 58, 0.8);
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
