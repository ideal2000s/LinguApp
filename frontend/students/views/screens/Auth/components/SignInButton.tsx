import React, { useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { useAuthModalOpen } from '../hooks';

interface IProps {
  className?: string;
  primary?: boolean;
}

const SignInButton: React.FC<IProps & React.HTMLProps<HTMLButtonElement>> = ({
  className,
  onClick,
  primary
}) => {
  const openAuthModal = useAuthModalOpen();

  const signInClickHandler = useCallback(
    (e) => {
      openAuthModal();
      if (onClick) {
        onClick(e);
      }
    },
    [onClick, openAuthModal]
  );

  return (
    <SButton
      variant={primary ? 'primary' : 'light'}
      className={cn(className)}
      onClick={signInClickHandler}
    >
      <Translate str="frontend.auth.sign_in" />
    </SButton>
  );
};

export default SignInButton;

const SButton = styled(ButtonGeneral)`
  margin: 0 0.5rem;
  border-radius: 2.25rem;
  font-weight: 600;
  font-size: 0.75rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  border: none;

  ${styleInnerButton()} {
    padding: 0.75rem 1.75rem;
  }

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.125rem;
    background-color: ${({ theme }) => theme.linguBlue700};
    color: white;

    &:hover,
    ${styleInnerButton('focus')}, &:active {
      color: white !important;
      background-color: ${({ theme }) => theme.linguBlue1000} !important;
    }
  }
`;
