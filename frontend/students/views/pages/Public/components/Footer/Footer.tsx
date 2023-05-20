import React, { FC, memo } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';

// import playStoreIcon from '../../assets/play_store_icon.svg';
// import appStoreIcon from '../../assets/app_store_icon.svg';
// import facebookIcon from '../../assets/facebook_icon.svg';
import instagramIcon from '../../assets/instagram_icon.svg';
// import twitterIcon from '../../assets/twitter_icon.svg';
import linkedinIcon from '../../assets/linkedin_icon.svg';

const Footer: FC = () => (
  <SWrapper>
    <SContainer>
      {/*<SRow mobileReverse={false}>*/}
      {/*<SNavigationLinks>*/}
      {/*  <SNavigationLink to="#">*/}
      {/*    <Translate str="frontend.course.lessons" />*/}
      {/*  </SNavigationLink>*/}

      {/*  <SNavigationLink to="#">*/}
      {/*    <Translate str="frontend.course.teach" />*/}
      {/*  </SNavigationLink>*/}

      {/*  <SNavigationLink to="#">*/}
      {/*    <Translate str="frontend.course.plans" />*/}
      {/*  </SNavigationLink>*/}

      {/*  <SNavigationLink to="#">*/}
      {/*    <Translate str="frontend.course.contact_us" />*/}
      {/*  </SNavigationLink>*/}
      {/*</SNavigationLinks>*/}

      {/*<SStoreLinks>*/}
      {/*  <SStoreLink href="#">*/}
      {/*    <SStoreImage src={playStoreIcon} alt="Play Store" />*/}
      {/*  </SStoreLink>*/}

      {/*<SStoreLink href="#">*/}
      {/*  <SStoreImage src={appStoreIcon} alt="App Store" />*/}
      {/*</SStoreLink>*/}
      {/*</SStoreLinks>*/}
      {/*</SRow>*/}

      {/*<SDivider />*/}

      <SRow mobileReverse>
        <STermsBlock>
          <SCopyrightText>© 2021 Lingu AS</SCopyrightText>

          <STermsLinksBlock>
            <STermsLink href="https://lingu.no/godkjent-kurstilbyder">
              <Translate str="frontend.course.accredited_course_provider" />
            </STermsLink>

            <SBullet>•</SBullet>

            <STermsLink href="https://lingu.no/personvern">
              <Translate str="frontend.course.privacy_policy" />
            </STermsLink>

            <SBullet>•</SBullet>

            <STermsLink href="https://lingu.no/terms-and-conditions">
              <Translate str="frontend.course.terms_and_conditions" />
            </STermsLink>
          </STermsLinksBlock>
        </STermsBlock>

        <SSocialsBlock>
          <SPhoneNumber>+47 40 3000 30</SPhoneNumber>

          <SSocialsWrapper>
            {/*<SSocialLink href="#">*/}
            {/*  <SSocialIcon src={facebookIcon} />*/}
            {/*</SSocialLink>*/}

            <SSocialLink aria-label="Instagram" href="https://www.instagram.com/linguno/">
              <SSocialIcon src={instagramIcon} />
            </SSocialLink>

            {/*<SSocialLink href="#">*/}
            {/*  <SSocialIcon src={twitterIcon} />*/}
            {/*</SSocialLink>*/}

            <SSocialLink
              aria-label="LinkedIn"
              href="https://www.linkedin.com/company/lingunorge/"
            >
              <SSocialIcon src={linkedinIcon} />
            </SSocialLink>
          </SSocialsWrapper>
        </SSocialsBlock>
      </SRow>
    </SContainer>
  </SWrapper>
);

export default memo(Footer);

const SWrapper = styled.div`
  background: #ffffff;
  border-top: 1px solid #e6e6f0;
  padding: 70px 0 100px;

  ${customMediaQuery('tablet')} {
    //padding: 60px 0 40px;
    padding: 40px 0; /* [TODO] REMOVE this padding and uncomment previous line when the first section is ready! */
  }
`;

const SContainer = styled.div`
  padding: 0 1rem;
  margin: 0 auto;

  ${customMediaQuery('tablet')} {
    padding: 0 2rem;
    max-width: 700px;
  }

  ${customMediaQuery('tablet')} {
    padding: 0 3rem;
    max-width: 1100px;
  }
`;

const SRow = styled.div<{ mobileReverse: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${({ mobileReverse }) => (mobileReverse ? 'column-reverse' : 'column')};
  width: 100%;

  ${customMediaQuery('tablet')} {
    flex-direction: row;
  }
`;

// const SDivider = styled.div`
//   width: 100%;
//   height: 1px;
//   background: #e6e6f0;
//   margin: 30px 0 20px;
//
//   ${customMediaQuery('tablet')} {
//     margin: 30px 0 30px;
//   }
// `;

// const SNavigationLinks = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: max-content;
// `;
//
// const SNavigationLink = styled(Link)`
//   font-size: 1rem;
//   font-weight: 800;
//   line-height: 1.25rem;
//   color: #2d2d3a;
//   margin: 0 36px 0 0;
//   padding: 0;
//   transition: color 0.3s;
//
//   &:hover {
//     color: #606075;
//     text-decoration: none;
//   }
//
//   &:last-child {
//     margin: 0;
//   }
// `;

// const SStoreLinks = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 50px;
//
//   ${customMediaQuery('tablet')} {
//     margin-top: 0;
//   }
// `;
//
// const SStoreLink = styled.a`
//   display: inline-block;
//
//   &:first-child {
//     margin: 0 8px 0 0;
//   }
//
//   &:last-child {
//     margin: 0 0 0 8px;
//   }
//
//   ${customMediaQuery('tablet')} {
//     &:first-child {
//       margin: 0 12px 0 0;
//     }
//
//     &:last-child {
//       margin: 0 0 0 12px;
//     }
//   }
// `;
//
// const SStoreImage = styled.img`
//   width: 100%;
//
//   ${customMediaQuery('tablet')} {
//     max-width: 160px;
//   }
// `;

const STermsBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: space-between;

  ${customMediaQuery('tablet')} {
    flex-direction: row;
  }
`;

const SCopyrightText = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: #2d2d3a;
  margin: 30px 0 0;
  padding: 0;

  ${customMediaQuery('tablet')} {
    margin: 0 24px 0 0;
  }
`;

const STermsLinksBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 40px 0 0;

  ${customMediaQuery('tablet')} {
    flex-direction: row;
    margin: 0;
  }
`;

const STermsLink = styled.a`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: #2d2d3a;
  margin: 0 0 16px;
  padding: 0;
  transition: color 0.3s;

  &:hover {
    color: #606075;
    text-decoration: none;
  }

  ${customMediaQuery('tablet')} {
    margin: 0;
  }
`;

const SBullet = styled.span`
  font-size: 0;
  display: inline-block;
  margin: 0 8px;

  ${customMediaQuery('tablet')} {
    font-size: 0.4rem;
  }
`;

const SSocialsBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: space-between;
  width: 100%;

  ${customMediaQuery('tablet')} {
    flex-direction: row;
    width: auto;
  }
`;

const SPhoneNumber = styled.h4`
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1rem;
  color: #2d2d3a;
  margin: 32px 0 0 0;
  padding: 0;

  ${customMediaQuery('tablet')} {
    margin: 0;
    min-width: 180px;
  }
`;

const SSocialsWrapper = styled.div`
  border-bottom: 1px solid #e6e6f0;
  padding: 0 0 26px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${customMediaQuery('tablet')} {
    border: 0;
    padding: 0;
  }
`;

const SSocialLink = styled.a`
  transition: transform 0.3s ease-in;

  &:hover {
    transform: scale(1.05);
    text-decoration: none;
  }
`;

const SSocialIcon = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  height: 35px;
  width: 35px;
  margin: 0 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;

  ${customMediaQuery('tablet')} {
    height: 24px;
    width: 24px;
    margin: 0 8px;
    opacity: 0.6;
  }
`;
