import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';
import { Translate, t } from 'i18n';
import { authActions, authSelectors } from 'students/stores/auth';
import { tAppState, tAppDispatch } from 'students/stores/rootStore';
import UrlIcon from 'students/views/shared/components/UrlIcon';

import { GoBackFooter } from '../components';
import ResendCodeButton from '../components/ResendCodeButton';
import { SHeader, SSubHeader, SOtpInputWrapper } from '../styled';
import DangerIcon from '../assets/danger_icon.svg';

export enum OTPReferrer {
  singIn = 'sign_in',
  signUp = 'sign_up'
}

interface IOTPCheckForm {
  onChangeVariant: () => void;
  referrer: OTPReferrer | null;
}

const OTPCheckForm: FC<IOTPCheckForm> = ({ onChangeVariant, referrer }) => {
  const dispatch = useDispatch<tAppDispatch>();
  const tempUser = useSelector<
    tAppState,
    ReturnType<typeof authSelectors.selectTempUser>
  >(authSelectors.selectTempUser);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  const performSignIn = useCallback(
    async (code: string) => {
      const response = await dispatch(
        authActions.mailSignIn({
          email: tempUser?.email || '',
          password: code
        })
      );

      if (authActions.mailSignIn.rejected.match(response)) {
        if (response.payload) {
          setError(response.payload);
        }
      }
    },
    [dispatch, tempUser]
  );

  const performSignUp = useCallback(
    async (code: string) => {
      const response = await dispatch(
        authActions.mailSignUp({
          email: tempUser?.email || '',
          fname: tempUser?.fname || '',
          lname: tempUser?.lname || '',
          marketingConsent: !!tempUser?.marketingConsent,
          password: code
        })
      );

      if (authActions.mailSignUp.rejected.match(response)) {
        if (response.payload) {
          setError(response.payload);
        }
      }
    },
    [dispatch, tempUser]
  );

  const onChangeHandler = (code: string) => {
    setCode(code);

    if (code.length !== 6) {
      return;
    }

    if (referrer === OTPReferrer.singIn) {
      performSignIn(code);
    } else if (referrer === OTPReferrer.signUp) {
      performSignUp(code);
    }
  };

  const handleResendCode = () => {
    dispatch(
      authActions.getOTP({
        email: tempUser?.email as string
      })
    );
  };

  return (
    <>
      <SHeader>
        <Translate str="frontend.auth.check_your_email_for_a_code" />
      </SHeader>

      <SSubHeader
        dangerouslySetInnerHTML={{
          __html: t('frontend.auth.we_ve_sent_a_code', {
            email: tempUser ? tempUser.email : '--',
            interpolation: { escapeValue: false }
          })
        }}
      />

      <SOtpInputWrapper>
        <OtpInput
          containerStyle="otp-container"
          inputStyle="otp-input"
          focusStyle="otp-focus"
          disabledStyle="otp-disabled"
          errorStyle="otp-error"
          value={code}
          onChange={onChangeHandler}
          numInputs={6}
          isInputNum
          shouldAutoFocus
        />
      </SOtpInputWrapper>

      {error && (
        <Alert variant="danger">
          <SUrlIcon url={DangerIcon} height="24px" width="24px" />
          {error}
        </Alert>
      )}

      <SResendCodeButton onClick={handleResendCode} />

      <GoBackFooter isFaded str="frontend.auth.back" onChangeVariant={onChangeVariant} />
    </>
  );
};

export default OTPCheckForm;

const SUrlIcon = styled(UrlIcon)`
  display: inline-block;
  margin-right: 16px;
  vertical-align: bottom;
`;

const SResendCodeButton = styled(ResendCodeButton)`
  margin: 28px 0 32px;
`;
