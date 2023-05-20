import React, { ChangeEventHandler, FC, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { t, Translate } from 'i18n';
import { authActions } from 'students/stores/auth';
import { tAppDispatch } from 'students/stores/rootStore';
import PrimarySubmitButton from 'students/views/shared/components/PrimarySubmitButton';

import { OTPReferrer } from './OTPCheckForm';
import { GoBackFooter } from '../components';
import { SFormControl, SHeader } from '../styled';

interface IProps {
  onChangeVariant: () => void;
  onNext: (referrer: OTPReferrer) => void;
}
const SignInMailForm: FC<IProps> = ({ onChangeVariant, onNext }) => {
  const dispatch: tAppDispatch = useDispatch();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const response = await dispatch(
      authActions.getOTP({
        email: formData.get('email') as string
      })
    );

    if (authActions.getOTP.rejected.match(response)) {
      if (response.payload) {
        setError(response.payload);
      }
    } else {
      onNext(OTPReferrer.singIn);
    }
  };

  const emailChangeHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setEmail(target.value);
    setError('');
  };

  return (
    <>
      <SHeader>
        <Translate str="frontend.auth.sign_in" />
      </SHeader>

      <SForm onSubmit={submitHandler}>
        <SFormControl
          name="email"
          type="email"
          placeholder={t('frontend.auth.email_address')}
          autoComplete="username"
          required
          value={email}
          onChange={emailChangeHandler}
        />

        {error && <SAlert variant="danger">{error}</SAlert>}

        <PrimarySubmitButton textLocaleKey="frontend.auth.get_unique_code" />
      </SForm>

      <GoBackFooter
        str="frontend.auth.more_login_options"
        onChangeVariant={onChangeVariant}
      />
    </>
  );
};

export default SignInMailForm;

const SForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

  *:not(button) {
    font-family: 'Inter', 'Product Sans', sans-serif;
  }

  button:last-child {
    margin: 0;
  }
`;

const SAlert = styled(Alert)`
  width: 100%;
  text-transform: capitalize;
`;
