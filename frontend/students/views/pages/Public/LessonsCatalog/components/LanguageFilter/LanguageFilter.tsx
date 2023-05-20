import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import languageFlags from 'i18n/languageFlags';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { userSelectors } from 'students/stores/user';
import { ILanguage } from 'students/stores/user/preferences';

import checkIcon from '../../../assets/check_icon.svg';

interface ILanguageFilter {
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  className?: string;
}

const LanguageFilter: FC<ILanguageFilter> = ({
  selectedOptions,
  onChange,
  className
}) => {
  const [currentSelected, setCurrentSelected] = useState<string[]>([]);
  const languages = useSelector(userSelectors.selectSortedTargetLangs);

  useEffect(() => {
    setCurrentSelected(selectedOptions);
  }, [selectedOptions]);

  const isOptionSelected = useCallback(
    (option: number) => currentSelected.includes(String(option)),
    [currentSelected]
  );

  const handleOptionClick = useCallback(
    (option: ILanguage) => {
      if (isOptionSelected(option.id)) {
        onChange(
          currentSelected.filter(
            (prevSelectedOption: string) => prevSelectedOption !== String(option.id)
          )
        );
      } else {
        onChange([String(option.id)]);
      }
    },
    [isOptionSelected, currentSelected, onChange]
  );

  const renderLanguageOptionTitle = (
    languageCode: string,
    languageTitle: string,
    languageAdditionalInfo: string
  ) => {
    const flagImageUrl = languageFlags.get(languageCode);

    return (
      <SLanguageOptionTitle>
        {flagImageUrl && <UrlIcon url={flagImageUrl} width="27px" height="20px" />}

        <SLanguageTitle>{languageTitle}</SLanguageTitle>

        <SLanguageAdditionalText>{languageAdditionalInfo}</SLanguageAdditionalText>
      </SLanguageOptionTitle>
    );
  };

  return (
    <SWrapper className={cn(className)}>
      <SLanguageOptionList>
        {languages.map((language) => (
          <SLanguageOptionItem
            key={language.id}
            $active={!currentSelected.length || isOptionSelected(language.id)}
            onClick={() => handleOptionClick(language)}
          >
            {renderLanguageOptionTitle(language.code, language.systemName, '')}

            {isOptionSelected(language.id) && (
              <UrlIcon url={checkIcon} height="12px" width="15px" color="#00a5d7" />
            )}
          </SLanguageOptionItem>
        ))}
      </SLanguageOptionList>
    </SWrapper>
  );
};

export default LanguageFilter;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 240px;
`;

const SLanguageOptionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const SLanguageOptionItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: opacity 0.3s;
  cursor: pointer;
  margin: 0 0 22px;
  width: 100%;

  &:last-child {
    margin: 0;
  }

  &:hover {
    opacity: 1;
  }
`;

const SLanguageOptionTitle = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-right: 4px;
    border-radius: 4px;
  }
`;

const SLanguageTitle = styled.p`
  padding: 0;
  margin: 0 4px 0 0;
  color: #2d2d3a;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.125rem;
`;

const SLanguageAdditionalText = styled.span`
  color: #a7aab6;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.125rem;
`;
