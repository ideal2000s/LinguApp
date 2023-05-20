import React, { FC, Suspense, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { authActions, authSelectors } from 'students/stores/auth';
import { tAppState } from 'students/stores/rootStore';
import { ReactLazyPreload } from 'students/views/shared/helpers';

import OTPCheckForm, { OTPReferrer } from './views/OTPCheckForm';
import StartView from './views/StartView';
import { SArticle } from './styled';

const SignUpMailForm = ReactLazyPreload(() => import('./views/SignUpMailForm'));
const SignInMailForm = ReactLazyPreload(() => import('./views/SignInMailForm'));

const AuthModal: FC = () => {
  const { show, isSignUp } = useSelector<
    tAppState,
    ReturnType<typeof authSelectors.selectModal>
  >(authSelectors.selectModal);

  const dispatch = useDispatch();
  const body = useModalBody(isSignUp, show);

  usePreloadedForms(show);

  const handleClose = () => {
    dispatch(authActions.close());
  };

  return (
    <>
      <GlobalAuthModalStyle />

      <Modal show={show} onHide={handleClose} centered dialogClassName="auth-modal">
        <Modal.Body>
          <SArticle>{body}</SArticle>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModal;

const GlobalAuthModalStyle = createGlobalStyle`
  .auth-modal {
    max-width: 29.5rem;
    min-width: 320px;
    .modal-content {
      border-radius: 1.125rem;
    }
    .modal-body {
      padding: 0;
    }
  }
`;

function useModalBody(isSignUp: boolean, show: boolean) {
  const [view, setView] = useState<
    'start' | 'mail_sign_up' | 'mail_sign_in' | 'verify_otp'
  >('start');
  const [referrer, setReferrer] = useState<OTPReferrer | null>(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      setView('start');
    }
  }, [show]);

  // const toggleVariantHandler = () => {
  //   dispatch(authActions.toggleVariant());
  // };

  const goToStartView = () => {
    setView('start');
  };

  const goToMailVariant = () => {
    setView(isSignUp ? 'mail_sign_up' : 'mail_sign_in');
  };

  const goToSignUp = () => {
    setView('mail_sign_up');
  };

  const showOTPCheckForm = (referrer: OTPReferrer) => {
    setReferrer(referrer);
    setView('verify_otp');
  };

  let body;
  switch (view) {
    case 'mail_sign_up': {
      body = <SignUpMailForm onChangeVariant={goToStartView} onNext={showOTPCheckForm} />;
      break;
    }

    case 'mail_sign_in': {
      body = <SignInMailForm onChangeVariant={goToStartView} onNext={showOTPCheckForm} />;
      break;
    }

    case 'verify_otp': {
      body = <OTPCheckForm onChangeVariant={goToMailVariant} referrer={referrer} />;
      break;
    }

    default: {
      body = (
        <StartView
          emailVariantClickHandler={goToMailVariant}
          footerAction={goToSignUp}
          isSignUp={false}
        />
      );
    }
  }
  return <Suspense fallback="">{body}</Suspense>;
}

let lazyFormsLoaded = false;
function usePreloadedForms(show: boolean) {
  useEffect(() => {
    if (!lazyFormsLoaded && show) {
      SignUpMailForm.preload();
      SignInMailForm.preload();
      lazyFormsLoaded = true;
    }
  }, [show]);
}
