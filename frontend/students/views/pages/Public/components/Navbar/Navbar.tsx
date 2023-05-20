import React, { Suspense, lazy } from 'react';
import { Navbar as BNavbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { Translate } from 'i18n';
import LangSwitcher from 'students/views/shared/components/LangSwitcher';
import Burger from 'students/views/shared/components/Navbar/Burger';
// import CurrencySwitcher from 'students/views/shared/components/CurrencySwitcher';
import { userSelectors } from 'students/stores/user';
import darkLogo from 'students/views/shared/assets/lingu-logo.svg';
import lightLogo from 'students/views/shared/assets/lingu-light-logo.svg';

// import NavLinks from './NavLinks';
import UserProfile from './UserProfile';

{
  /*const CURRENCIES = [
  {
    value: 'usd',
    label: 'USD'
  },
  {
    value: 'eur',
    label: 'EUR'
  },
  {
    value: 'nok',
    label: 'NOK'
  }
];
*/
}

const AuthModal = lazy(() => import('students/views/screens/Auth'));

interface IProps {
  darkBurger?: boolean;
  isLight?: boolean;
}

const Navbar: React.FC<IProps> = ({ darkBurger, isLight }) => {
  const user = useSelector(userSelectors.selectProfile);

  return (
    <SNavbar>
      <SBNavbar bg="light" expand="md">
        <BNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-2">
            <BNavbar.Brand href="/" className="mr-auto p-0" title="Lingu">
              <SLogo src={isLight ? lightLogo : darkLogo} alt="Lingu" />
            </BNavbar.Brand>
          </Nav>

          <Nav className="mr-auto">{/*<NavLinks />*/}</Nav>

          <Nav className="mr-3">
            <GlobalTooltipStyle />

            <OverlayTrigger
              placement="bottom"
              trigger={['hover', 'focus']}
              delay={400}
              overlay={
                <Tooltip id="language-tooltip">
                  <Translate str="frontend.course.website_language" />
                </Tooltip>
              }
            >
              <div>
                <SLangSwitcher lightStyled noTitle $lightFont={isLight} />
              </div>
            </OverlayTrigger>
          </Nav>

          <Nav className="mr-3">
            {/*<SCurrencySwitcher options={CURRENCIES} lightStyled />*/}
          </Nav>
        </BNavbar.Collapse>

        <Burger darkIcon={darkBurger} user={user} />

        <UserProfile user={user} />

        <Suspense fallback="">{!user && <AuthModal />}</Suspense>
      </SBNavbar>
    </SNavbar>
  );
};

export default Navbar;

const SNavbar = styled.div``;

const SBNavbar = styled(BNavbar)`
  background-color: rgba(0, 0, 0, 0.2) !important;
  padding: 0.75rem 1.125rem 0.75rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    padding: 1.25rem 2rem;
  }
`;

const SLogo = styled.img`
  width: 6.75rem;
  height: 3rem;
`;

const SLangSwitcher = styled(LangSwitcher)<{ $lightFont?: boolean }>`
  .lang-switcher__native-single-value {
    color: ${({ $lightFont }) => ($lightFont ? '#ffffff' : '#2d2d3a')};
  }

  .lingu__indicators > div {
    color: ${({ $lightFont }) => ($lightFont ? '#ffffff' : '#2d2d3a')};
  }
`;

{
  /*
  const SCurrencySwitcher = styled(CurrencySwitcher)`
  .lang-switcher__native-single-value {
    color: ${({ lightFont }) => lightFont ? '#ffffff': '#2d2d3a'};
  }

  .lingu__indicators > div {
    color: ${({ lightFont }) => lightFont ? '#ffffff': '#2d2d3a'};
    padding: 8px 0;
  };
 */
}

const GlobalTooltipStyle = createGlobalStyle`
  #language-tooltip {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(3px);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: #5E5D71;
    
    .arrow {
      top: -4px;
      left: 50% !important;
      transform: translate(-50%, 0) !important;
      
      &:before {
        content: "";
        border-bottom: 4px solid rgba(255, 255, 255, 0.8);
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        display: block;
      }
    }
  }
`;
