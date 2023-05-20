import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelectors, ILanguage, profileActions } from 'students/stores/user';
import { tAppDispatch } from 'students/stores/rootStore';
import SelectTargetLanguage from './SelectTargetLanguage';
import SelectTargetLevel from './SelectTargetLevel/SelectTargetLevel';
import { tStudentTargetLanguage } from 'students/models';
import { lessonSelectors } from 'students/stores/lesson';

const TargetLang: React.FC = () => {
  const [targetLanguageStepIndex, setTargetLanguageStepIndex] = useState<number>(0);
  const [userLanguage, setUserLanguage] = useState<tStudentTargetLanguage>({
    active: true,
    languageId: -1,
    level: 'undefined'
  });
  const [selectedTargetLang, setSelectedTargetLang] = useState<ILanguage | null>(null);
  const targetLangs = useSelector(userSelectors.selectSortedTargetLangs);
  const profile = useSelector(userSelectors.selectProfile);
  const lesson = useSelector(lessonSelectors.selectLesson);
  const dispatch = useDispatch<tAppDispatch>();

  useEffect(() => {
    const predefinedLang = targetLangs.find((lang) => lang.code === lesson?.languageCode);
    if (predefinedLang) {
      setUserLanguage({
        active: true,
        languageId: predefinedLang.id,
        level: lesson?.level || 'undefined'
      });
      setSelectedTargetLang(predefinedLang);
    }
  }, [lesson, targetLangs]);

  function selectLangHandler(language: ILanguage) {
    setUserLanguage((lang) => ({
      ...lang,
      languageId: language.id
    }));
    setSelectedTargetLang(language);
  }

  function changeLevelHandler(level: tStudentTargetLanguage['level']) {
    setUserLanguage((lang) => ({ ...lang, level }));
  }

  function nextButtonClickHandler() {
    setTargetLanguageStepIndex((index) => index + 1);
  }

  function targetStepFinishedHandler() {
    dispatch(profileActions.selectStudentTargetLanguage(userLanguage));
  }

  function getStepComponent() {
    if (!profile) return null;

    const stepKey = steps[targetLanguageStepIndex];
    switch (stepKey) {
      case 'SELECT_LANGUAGE':
        return (
          <SelectTargetLanguage
            profile={profile}
            targetLangs={targetLangs}
            selectedLang={userLanguage}
            onLangSelect={selectLangHandler}
            onNext={nextButtonClickHandler}
          />
        );
      case 'SELECT_LEVEL':
        return (
          <SelectTargetLevel
            language={userLanguage}
            languageName={selectedTargetLang?.systemName}
            onChangeLevel={changeLevelHandler}
            onNext={targetStepFinishedHandler}
          />
        );

      default:
        return null;
    }
  }

  return getStepComponent();
};

export default TargetLang;

type tTargetLanguageStep = 'SELECT_LANGUAGE' | 'SELECT_LEVEL';
const steps: tTargetLanguageStep[] = ['SELECT_LANGUAGE', 'SELECT_LEVEL'];
