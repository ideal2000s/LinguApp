import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { IProfile } from 'students/models';
import { SignInButton } from 'students/views/screens/Auth';
import { useOutsideClick, useBreakPoint } from 'students/views/shared/hooks';

import NavMenu from './NavMenu';
import UserAvatar from './UserAvatar';

interface IUserProfileButton {
  user: IProfile | null;
}

const UserProfileButton: FC<IUserProfileButton> = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const userAvatarRef = useRef<HTMLElement>(null);
  const navMenuRef = useRef<HTMLElement>(null);
  const isMobile = useBreakPoint('sm', true);

  const handleAvatarClick = () => {
    if (!isMobile) {
      setShowMenu((show) => !show);
    }
  };

  useOutsideClick(userAvatarRef, () => setShowMenu(false), [navMenuRef]);

  if (!user) {
    return <SignInButton />;
  }

  return (
    <SUserProfileButton>
      <SUserAvatarWrapper ref={userAvatarRef as any} onClick={handleAvatarClick}>
        <UserAvatar user={user} />
      </SUserAvatarWrapper>

      <SNavMenuWrapper ref={navMenuRef as any}>
        {showMenu ? <SNavMenu /> : null}
      </SNavMenuWrapper>
    </SUserProfileButton>
  );
};

export default UserProfileButton;

const SUserProfileButton = styled.div`
  background: white;
  border-radius: 2.25rem;
  padding: 0.25rem;
  box-shadow: 0 0 6px #00000020;
  margin-left: 0.2rem;
  position: relative;
`;

const SUserAvatarWrapper = styled.div`
  cursor: pointer;
`;

const SNavMenuWrapper = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const SNavMenu = styled(NavMenu)`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  padding: 16px 20px;
  min-width: 128px;
  max-width: 200px;
  width: max-content;
  align-items: flex-start;
`;
