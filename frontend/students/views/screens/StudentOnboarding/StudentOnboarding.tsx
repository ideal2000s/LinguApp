import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import Page from 'students/views/pages/Page';
import bgImage from './assets/onboarding-bg.svg';
import { preferencesActions, profileActions, userSelectors } from 'students/stores/user';
import { tAppState } from 'students/stores/rootStore';
import { tOnboardingStep } from 'students/models';
import TargetLang from './TargetLang';
import SupportedLanguage from './SupportedLanguage';

type tProps = ConnectedProps<typeof connector>;
const StudentOnboarding: React.FC<tProps> = ({
  onboarding,
  profile,
  getSupportedLanguages,
  getTargetLanguages
}) => {
  useEffect(() => {
    getTargetLanguages();
    getSupportedLanguages();
  }, [getTargetLanguages, getSupportedLanguages]);

  useEffect(() => {
    // Reset scroll when changing step
    window.scrollTo(0, 0);

    return () => {
      // Reset scroll when onboarding steps are finished
      window.scrollTo(0, 0);
    };
  }, [onboarding]);

  function getStepView(step: tOnboardingStep) {
    if (!profile?.valid) return null;

    switch (step) {
      case 'TARGET_LANGUAGE':
        return <TargetLang />;

      case 'NATIVE_LANGUAGE':
        return <SupportedLanguage />;

      default:
        return null;
    }
  }

  if (!profile) return null;

  return (
    <SStudentOnboarding>
      <Page
        background="#0094c5"
        gradient={'linear-gradient(180deg, #43b9db 0%, #0094c5 100%);'}
        bgImage={`url(${bgImage})`}
        bgSize="cover"
      >
        {/*
          We don't need here any 'currentStep' variables, because thanks to the selectOnboarding selector
          we have a simple array of steps, which reduces(by 1) as soon as we select next language;
          and finally it will be an empty array.
        */}
        {getStepView(onboarding[0])}
      </Page>
    </SStudentOnboarding>
  );
};

function mapStateToProps(state: tAppState) {
  const { lesson } = state;
  return {
    lesson,
    profile: userSelectors.selectProfile(state),
    onboarding: userSelectors.selectOnboarding(state)
  };
}
const mapDispatchToProps = {
  getTargetLanguages: preferencesActions.getTargetLanguages,
  getSupportedLanguages: preferencesActions.getSupportedLanguages,
  updateProfile: profileActions.updateProfile
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(StudentOnboarding);

const SStudentOnboarding = styled.div`
  color: #ffffff;
  max-width: 100vw;
  overflow: hidden;
`;
