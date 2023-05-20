import React, { FC, useState } from 'react';
import { Form, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Translate } from 'i18n';
import { t } from 'i18n';
import { authActions } from 'students/stores/auth';
import { tAppDispatch } from 'students/stores/rootStore';
import PrimarySubmitButton from 'students/views/shared/components/PrimarySubmitButton';

import { OTPReferrer } from './OTPCheckForm';
import { SHeader, SFormControl, SFormGroup } from '../styled';
import { GoBackFooter } from '../components';

interface IProps {
  onChangeVariant: () => void;
  onNext: (referrer: OTPReferrer) => void;
}

const SignUpMailForm: FC<IProps> = ({ onChangeVariant, onNext }) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch<tAppDispatch>();

  const submitHandler = async (e: React.FormEvent<SignUpForm>) => {
    e.preventDefault();

    const { elements } = e.target as SignUpForm;
    const student = {
      email: elements.email.value,
      fname: elements.fname.value,
      lname: elements.lname.value,
      marketingConsent: elements.marketingConsent.checked
    };

    const response = await dispatch(authActions.getOTP(student));

    if (authActions.getOTP.rejected.match(response)) {
      if (response.payload) {
        setError(response.payload);
      }
    } else {
      onNext(OTPReferrer.signUp);
    }
  };

  const cleanErrors = () => {
    setError('');
  };

  return (
    <>
      <SHeader>
        <Translate str="frontend.auth.join_lingu" />
      </SHeader>

      <SForm onSubmit={submitHandler}>
        <Form.Row>
          <SFormGroup as={Col} sm={12} md={6}>
            <SFormControl
              name="fname"
              type="text"
              autoComplete="given-name"
              placeholder={t('frontend.auth.first_name')}
              onChange={cleanErrors}
              required
            />
          </SFormGroup>

          <SFormGroup as={Col} sm={12} md={6}>
            <SFormControl
              name="lname"
              type="text"
              autoComplete="family-name"
              placeholder={t('frontend.auth.last_name')}
              onChange={cleanErrors}
              required
            />
          </SFormGroup>
        </Form.Row>

        <SFormGroup>
          <SFormControl
            name="email"
            type="email"
            autoComplete="username"
            placeholder={t('frontend.auth.email_address')}
            onChange={cleanErrors}
            required
          />
        </SFormGroup>

        {/* TODO add privacy policy and Terms and conditions links and checkbox*/}
        {/* <Form.Group controlId="policy">
          <Form.Check type="checkbox" label="I agree ..." custom />
        </Form.Group> */}
        <Form.Group controlId="subscribe" className="mb-4">
          <Form.Check
            type="checkbox"
            name="marketingConsent"
            label={t('frontend.auth.want_to_receive_marketing_messages')}
            custom
          />
        </Form.Group>

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

export default SignUpMailForm;

interface FormElements extends HTMLFormControlsCollection {
  fname: HTMLInputElement;
  lname: HTMLInputElement;
  email: HTMLInputElement;
  marketingConsent: HTMLInputElement;
}
interface SignUpForm extends HTMLFormElement {
  elements: FormElements;
}

const SForm = styled(Form)`
  *:not(button) {
    font-family: 'Inter', 'Product Sans', sans-serif;
  }
`;

const SAlert = styled(Alert)`
  width: 100%;
  text-transform: capitalize;
`;
