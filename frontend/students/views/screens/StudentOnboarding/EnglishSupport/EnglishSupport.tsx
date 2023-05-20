import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Translate } from 'i18n/components';

interface IEnglishSupport {
  visible: boolean;
  onAnswer: (answer: boolean) => void;
}

const EnglishSupport: FC<IEnglishSupport> = ({ visible, onAnswer }) => (
  <SWrapper visible={visible}>
    <SHeading>
      <Translate str="frontend.profile.onboarding.do_you_understand_english" />
    </SHeading>

    <SActions>
      <SActionBtn $outlined onClick={() => onAnswer(false)}>
        <Translate str="frontend.profile.onboarding.no" />
      </SActionBtn>

      <SActionBtn onClick={() => onAnswer(true)}>
        <Translate str="frontend.profile.onboarding.yes" />
      </SActionBtn>
    </SActions>
  </SWrapper>
);

const SWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3000;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #43b9db 0%, #0094c5 100%);
    opacity: 0.85;
    z-index: -1;
  }
`;

const SHeading = styled.h2`
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.75rem;
  color: #ffffff;
  text-align: center;
  padding: 0;
  margin: 0 0 2.5rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.625rem;
    line-height: 2.25rem;
    margin: 0 0 2rem;
  }
`;

const SActions = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const SActionBtn = styled(Button)<{ $outlined: boolean }>`
  border: none;
  background: ${({ $outlined }) => ($outlined ? 'rgba(255, 255, 255, 0.3)' : '#ffffff')};
  border-radius: 10px;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 2.25rem;
  color: ${({ $outlined }) => ($outlined ? '#fbfcff' : '#00a5d7')};
  margin: 0 0.5rem;
  padding: 1rem 2rem;
  min-width: 144px;
`;

export default EnglishSupport;
