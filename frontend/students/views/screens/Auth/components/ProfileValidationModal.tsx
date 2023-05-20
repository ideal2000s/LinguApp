import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Col, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { t, Translate } from 'i18n';
import {
  withLinguModal,
  tWithLinguModalProps
} from 'students/views/shared/components/LinguModal';
import { SRootStyle } from 'students/views/shared/styled';

import PrimarySubmitButton from 'students/views/shared/components/PrimarySubmitButton';
import { SFormControl, SFormGroup, SHeader } from '../styled';
import { profileActions } from 'students/stores/user';
import { tAppDispatch } from 'students/stores/rootStore';

interface FormElements extends HTMLFormControlsCollection {
  fname: HTMLInputElement;
  lname: HTMLInputElement;
  marketingConsent: HTMLInputElement;
}
interface ProfileValidationForm extends HTMLFormElement {
  elements: FormElements;
}

interface IProfileValidationModalProps {
  // onExit: () => void;
}

const ProfileValidationModal: FC<IProfileValidationModalProps & tWithLinguModalProps> = ({
  close
}) => {
  // const exitClickHandler = () => {
  //   close && close();
  // };
  const dispatch = useDispatch<tAppDispatch>();
  const [isUpdating, setIsUpdating] = useState(false);

  const submitHandler = async (e: React.FormEvent<ProfileValidationForm>) => {
    e.preventDefault();
    const { elements } = e.target as ProfileValidationForm;
    const student = {
      fname: elements.fname.value,
      lname: elements.lname.value,
      marketingConsent: elements.marketingConsent.checked
    };
    setIsUpdating(true);
    const response = await dispatch(profileActions.updateProfile(student));
    setIsUpdating(false);
    if (profileActions.updateProfile.fulfilled.match(response)) {
      close && close();
    }
  };

  return (
    <SContainer>
      <SRootStyle>
        <Modal.Body>
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
                  required
                />
              </SFormGroup>

              <SFormGroup as={Col} sm={12} md={6}>
                <SFormControl
                  name="lname"
                  type="text"
                  autoComplete="family-name"
                  placeholder={t('frontend.auth.last_name')}
                  required
                />
              </SFormGroup>
            </Form.Row>

            <Form.Group controlId="subscribe" className="mb-4">
              <Form.Check
                type="checkbox"
                name="marketingConsent"
                label={t('frontend.auth.want_to_receive_marketing_messages')}
                custom
              />
            </Form.Group>

            <PrimarySubmitButton
              textLocaleKey="frontend.auth.continue"
              disabled={isUpdating}
            />
          </SForm>
        </Modal.Body>
      </SRootStyle>
    </SContainer>
  );
};

export default withLinguModal('profileValidation', {
  preventClose: true,
  preventDefaultModalStyles: true
})(ProfileValidationModal);

const SContainer = styled.div``;

const SForm = styled(Form)`
  *:not(button) {
    font-family: 'Inter', 'Product Sans', sans-serif;
  }
`;
