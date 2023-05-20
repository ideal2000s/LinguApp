import React, { useCallback } from 'react';
import styled from 'styled-components';
import emailIconWebp from 'students/views/shared/assets/icons/email.webp';
import emailIcon from 'students/views/shared/assets/icons/email.png';
import { Translate } from 'i18n';

import { /*QuestionFooter, */ SocialButton } from '../components';
import { getTextForVariant, socials } from '../helpers';
import { SFaddedText, SHeader } from '../styled';

interface IProps {
  isSignUp: boolean;
  footerAction: () => void;
  emailVariantClickHandler: () => void;
}

const StartView: React.FC<IProps> = ({
  isSignUp,
  // footerAction,
  emailVariantClickHandler
}) => {
  const { header } = getTextForVariant(isSignUp);

  const handleSocialClick = useCallback((link?: string) => {
    if (!link) return;
    window.open(link);
  }, []);

  return (
    <>
      <SHeader>
        <Translate str={header} />
      </SHeader>

      <SVariants>
        {socials.map(({ providerName, link, logo, fallbackLogo }) => (
          <SocialButton
            key={providerName}
            link={link}
            onClick={handleSocialClick}
            providerName={providerName}
            logo={logo}
            fallbackLogo={fallbackLogo}
          />
        ))}

        <SFaddedText>
          <Translate str="frontend.auth.or" />
        </SFaddedText>

        <SEmailVariant
          onClick={emailVariantClickHandler}
          fullNameLocaleKey="frontend.auth.continue_with_email"
          logo={emailIconWebp}
          fallbackLogo={emailIcon}
        />
      </SVariants>

      {/* <QuestionFooter onActionClick={footerAction} /> */}
    </>
  );
};

export default StartView;

const SVariants = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;

  button {
    margin: 0.5rem 0;

    &:hover {
      text-decoration: none;
    }
  }
`;

const SEmailVariant = styled(SocialButton)`
  margin-top: 0.5rem;
`;
