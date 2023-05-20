import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Translate } from 'i18n';
import { userSelectors, profileActions, ILanguage } from 'students/stores/user';
import { tAppDispatch } from 'students/stores/rootStore';
import { IStudentTargetLanguage } from 'students/models/profile';

import ListSelector from './ListSelector';
import OnboardingFooter from '../components/OnboardingFooter';
import EnglishSupport from '../EnglishSupport';
import SStepView from '../styled/SStepView';

const SupportedLanguage: FC = () => {
  const languages = useSelector(userSelectors.selectSortedAllLangs);
  const profile = useSelector(userSelectors.selectProfile);
  const dispatch = useDispatch<tAppDispatch>();
  const [selectedLang, setSelectedLang] = useState<ILanguage | null>(null);
  const [englishSupportVisible, setEnglishSupportVisible] = useState<boolean>(false);

  useEffect(() => {
    if (profile?.locale) {
      const preselectedLang = languages.find(
        (lang: ILanguage) => lang.code === profile.locale
      );
      if (preselectedLang) {
        setSelectedLang(preselectedLang);
      }
    }
  }, [profile, languages, setSelectedLang]);

  function selectLanguageHandler(lang: ILanguage) {
    setSelectedLang(lang);
  }

  function checkTargetEnglishSupport() {
    const foundActiveTargetLang =
      profile &&
      profile.studentTargetLanguages.find(
        (lang: IStudentTargetLanguage) =>
          lang.id === profile.activeStudentTargetLanguageId
      );
    const englishLang = languages.find((lang: ILanguage) => lang.code === 'en');

    // If either targetLanguage or supportedLanguage doesn't contain English -> show English Support Screen
    if (
      selectedLang &&
      selectedLang.code !== 'en' &&
      foundActiveTargetLang &&
      englishLang &&
      foundActiveTargetLang.languageId !== englishLang.id
    ) {
      setEnglishSupportVisible(true);
    } else if (selectedLang) {
      dispatch(
        profileActions.selectStudentSupportLanguage({ mainLanguageId: selectedLang.id })
      );
    }
  }

  function handleTargetEnglishAnswer(answer: boolean) {
    setEnglishSupportVisible(false);

    if (selectedLang) {
      const englishLang = languages.find((lang) => lang.code === 'en');

      dispatch(
        profileActions.selectStudentSupportLanguage({
          mainLanguageId: selectedLang.id,
          ...(answer && englishLang ? { englishLanguageId: englishLang.id } : {})
        })
      );
    }
  }

  return (
    <SStepView>
      <SQuestionBlock>
        <Translate str="frontend.profile.onboarding.choose_native_language" />
      </SQuestionBlock>

      <SLanguagesList>
        <ListSelector
          items={languages}
          selected={selectedLang}
          onSelectedChange={selectLanguageHandler}
        />
      </SLanguagesList>

      <OnboardingFooter progress={0.75} onNextClick={checkTargetEnglishSupport} />

      <EnglishSupport
        visible={englishSupportVisible}
        onAnswer={handleTargetEnglishAnswer}
      />
    </SStepView>
  );
};

export default SupportedLanguage;

const SQuestionBlock = styled.div`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-weight: bold;
  font-size: 1.375rem;
  text-align: center;
  margin-bottom: 48px;
`;

const SLanguagesList = styled.div`
  width: 100%;
  max-width: 347px;
`;
