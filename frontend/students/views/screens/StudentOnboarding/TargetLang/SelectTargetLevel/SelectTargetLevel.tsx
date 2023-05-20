import React, { useRef } from 'react';
import styled from 'styled-components';
import SStepView from '../../styled/SStepView';
import { Translate } from 'i18n';
import SelectTargetLevelItem from './SelectTargetLevelItem';
import { tStudentTargetLanguage } from 'students/models';
import OnboardingFooter from '../../components/OnboardingFooter';
import useScrollIntoOnMount from 'students/views/shared/hooks/useScrollIntoOnMount';

interface IProps {
  language: tStudentTargetLanguage;
  languageName?: string;
  onChangeLevel: (level: tStudentTargetLanguage['level']) => void;
  onNext: () => void;
}
const SelectTargetLevel: React.FC<IProps> = ({
  language,
  languageName,
  onChangeLevel,
  onNext
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useScrollIntoOnMount(wrapperRef);

  return (
    <SSelectTargetLevel ref={wrapperRef}>
      <SQuestionBlock>
        <Translate
          str="frontend.profile.onboarding.what_is_language_level"
          params={{ languageName }}
        />
      </SQuestionBlock>
      <SLevelsBlock>
        {availableLevels.map((level) => (
          <SelectTargetLevelItem
            key={level}
            level={level}
            onSelect={onChangeLevel}
            selected={language.level === level}
          />
        ))}
      </SLevelsBlock>
      <OnboardingFooter progress={0.5} onNextClick={onNext} />
    </SSelectTargetLevel>
  );
};

export default SelectTargetLevel;

const availableLevels: tStudentTargetLanguage['level'][] = [
  'zero_level',
  'a1',
  'a2',
  'b1',
  'b2',
  'c1'
];

const SSelectTargetLevel = styled(SStepView)``;

const SQuestionBlock = styled.div`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-weight: bold;
  font-size: 1.375rem;
  text-align: center;
  margin-bottom: 48px;
`;

const SLevelsBlock = styled.div`
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
  border: solid 1px #ffffff80;

  max-width: 474px;

  overflow: hidden;
`;
