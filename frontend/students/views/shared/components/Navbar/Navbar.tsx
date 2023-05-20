import React, { Suspense, lazy } from 'react';
import { Navbar as BNavbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import LangSwitcher from '../LangSwitcher';
import logo from 'students/views/shared/assets/lingu-light-logo.svg';
import Burger from './Burger';
import UserProfile from './UserProfile';
import { userSelectors } from 'students/stores/user';

const AuthModal = lazy(() => import('students/views/screens/Auth'));

interface IProps {
  darkBurger?: boolean;
}
const Navbar: React.FC<IProps> = ({ darkBurger }) => {
  const user = useSelector(userSelectors.selectProfile);

  return (
    <SNavbar>
      <SBNavbar bg="light" expand="md">
        <BNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <BNavbar.Brand href="/" className="mr-auto p-0" title="Lingu">
              <SLogo src={logo} alt="Lingutest" />
            </BNavbar.Brand>
          </Nav>

          <Nav className="mr-4">
            <LangSwitcher lightStyled />
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

const SNavbar = styled.div`
  .navbar {
    @media (max-width: ${({ theme }) => theme.linguBrPts.md - 1}px) {
      background-color: transparent !important;
    }
  }
`;

const SBNavbar = styled(BNavbar)`
  background-color: rgba(0, 0, 0, 0.2) !important;
  padding: 0.75rem 1.125rem 0;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    padding: 1.25rem 2rem;
  }
`;

const SLogo = styled.img`
  width: 6.75rem;
  height: 3rem;
`;
