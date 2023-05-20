import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { Modal } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { t, Translate } from 'i18n';
import LogoIcon from 'students/views/shared/assets/lingu-logo.svg';
import CloseIcon from 'students/views/shared/assets/icons/close_icon.svg';
import { SRootStyle } from 'students/views/shared/styled';
import { SignInButton } from 'students/views/screens/Auth';
import { authActions } from 'students/stores/auth';
import { tAppDispatch } from 'students/stores/rootStore';
import LanguageListSwitcher from './LanguageListSwitcher';
import { UserAvatar } from './UserProfile';
import { IProfile } from 'students/models';
import UrlIcon from '../UrlIcon';
import ButtonGeneral, { styleInnerButton } from '../ButtonGeneral/ButtonGeneral';

interface IProps {
  darkIcon?: boolean;
  user: IProfile | null;
}
const Burger: React.FC<IProps> = ({ darkIcon, user }) => {
  const burgerIconColor = darkIcon ? '#2d2d3a' : 'white';
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch<tAppDispatch>();

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const signInClickHandler = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const handleLogOut = useCallback(() => {
    dispatch(authActions.logOut());
  }, [dispatch]);

  return (
    <div>
      <SBurgerButton
        variant="link"
        className="d-md-none"
        onClick={openMenu}
        aria-label={t('frontend.lesson_page.hamburger_menu_btn')}
      >
        <FontAwesomeIcon size="2x" icon={faBars} color={burgerIconColor} />
      </SBurgerButton>

      <SModal show={showMenu} dialogClassName="100w 100h m-0">
        <SRootStyle>
          <Modal.Body>
            <SMenuBody>
              <SCloseButton variant="link" onClick={closeMenu}>
                <UrlIcon
                  url={CloseIcon}
                  color="#000"
                  height="0.875rem"
                  width="0.875rem"
                />
              </SCloseButton>
              <div className="menu__top">
                <SLogoLink href="/">
                  <img src={LogoIcon} alt="Lingutest" />
                </SLogoLink>

                <SAvatar>
                  {!!user && <UserAvatar user={user} responsive={false} mirror />}
                </SAvatar>
                <SLanguageListSwitcher />
                {!user ? (
                  <SSignInButton primary onClick={signInClickHandler} />
                ) : (
                  <SLogoutButton onClick={handleLogOut}>
                    <Translate str="frontend.profile.navigation.log_out" />
                  </SLogoutButton>
                )}
              </div>
            </SMenuBody>
          </Modal.Body>
        </SRootStyle>
      </SModal>
    </div>
  );
};

export default Burger;

const SModal = styled(Modal)`
  .modal-dialog,
  .modal-body {
    max-width: 100vw;
    min-width: 100vw;

    max-height: 100vh;
    min-height: 100vh;
    overflow: scroll;

    display: flex;
  }

  .modal-content {
    border: none;
    border-radius: 0;
  }
`;

const SMenuBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .menu__top,
  .menu__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SLogoLink = styled.a`
  img {
    width: 8.75rem;
    height: 4rem;
    object-fit: cover;
  }
`;

const SButtonStyles = css`
  border-radius: 62px;
  background: #f0f0f3;
  width: 100%;
  letter-spacing: -0.02em;
  font-size: 1rem;
  line-height: 1.21rem;
  margin-bottom: 1.75rem;
  text-align: center;

  ${styleInnerButton()} {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const SLanguageListSwitcher = styled(LanguageListSwitcher)`
  ${SButtonStyles}

  ${styleInnerButton()} {
    &:after {
      position: static;
      display: inline-block;
      display: flex;
      align-items: center;
      margin-left: 0.625rem;
    }
  }
`;

const SSignInButton = styled(SignInButton)`
  ${SButtonStyles}
  background: #00a5d7;
`;

const SAvatar = styled.div`
  min-height: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 3.438rem;
  margin-top: 4.5rem;

  article {
    span {
      font-size: 1.125rem;
      font-weight: 500;
      letter-spacing: -0.02em;
    }
    flex: 1;
    justify-content: center;
  }

  img {
    max-height: 3.25rem;
    max-width: 3.25rem;
    width: 100%;
    height: 100%;
  }
`;

const SLogoutButton = styled(ButtonGeneral)`
  ${SButtonStyles}
  color: #5E5D71;
  font-family: ${({ theme }) => theme.linguTextFontFamily};
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    text-decoration: none;
    color: #5959bc;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SBurgerButton = styled(ButtonGeneral)`
  background-color: transparent;
  ${styleInnerButton()} {
    padding: 0.375rem 0.75rem;
  }
`;

const SCloseButton = styled(ButtonGeneral)`
  position: absolute;
  top: 1.25rem;
  left: 1rem;
  background-color: transparent;

  ${styleInnerButton()} {
    padding: 0.375rem 0.75rem;
  }
`;
