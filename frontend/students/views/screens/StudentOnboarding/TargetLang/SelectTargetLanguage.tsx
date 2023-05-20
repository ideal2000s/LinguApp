import React from 'react';
import styled from 'styled-components';
import iconHi from '../assets/icon-hi.svg';
import SStepView from '../styled/SStepView';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { Translate } from 'i18n';
import { IProfile, tStudentTargetLanguage } from 'students/models';
import { ILanguage } from 'students/stores/user';
import FlagCard from '../components/FlagCard';
import OnboardingFooter from '../components/OnboardingFooter';

interface IProps {
  profile: IProfile;
  targetLangs: ILanguage[];
  selectedLang: tStudentTargetLanguage;
  onLangSelect: (lang: ILanguage) => void;
  onNext: () => void;
}
const SelectTargetLanguage: React.FC<IProps> = ({
  profile,
  targetLangs,
  selectedLang,
  onLangSelect,
  onNext
}) => {
  const { fname, lname } = profile;

  function langSelectHandler(payload?: any) {
    if (payload) {
      onLangSelect(payload as ILanguage);
    }
  }
  return (
    <SStepView>
      <SGreeting>
        <UrlIcon url={iconHi} width="50px" height="50px" />
        <b>
          <Translate str="frontend.profile.onboarding.hello" />
          {','}
        </b>
        <SName>
          {fname}&nbsp;{lname}!
        </SName>
      </SGreeting>
      <SQuestionBlock>
        <SQuestion>
          <Translate str="frontend.profile.onboarding.target_language_question" />
        </SQuestion>
      </SQuestionBlock>
      <SFlagsBlock>
        {targetLangs.map((lang) => (
          <FlagCard
            key={lang.code}
            flagCode={lang.code}
            name={lang.systemName}
            payload={lang}
            checked={lang.id === selectedLang.languageId}
            onSelect={langSelectHandler}
          />
        ))}
      </SFlagsBlock>
      <OnboardingFooter progress={0.25} onNextClick={onNext} />
    </SStepView>
  );
};

export default SelectTargetLanguage;

const SGreeting = styled.div`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: start;

  font-size: 1.875rem;

  margin-bottom: 70px;
`;

const SName = styled.span`
  font-weight: lighter;
`;
const SQuestionBlock = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;
const SQuestion = styled.h2`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-size: 1.375rem;
  font-weight: 600;
`;

const SFlagsBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
