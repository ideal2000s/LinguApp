import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n/components';
import { tAppDispatch } from 'students/stores/rootStore';
import { authActions } from 'students/stores/auth';

interface INavMenu {
  className?: string;
}

const NavMenu: FC<INavMenu> = ({ className }) => {
  const dispatch = useDispatch<tAppDispatch>();

  const handleLogOut = useCallback(async () => {
    await dispatch(authActions.logOut());
  }, [dispatch]);

  return (
    <SContainer className={cn(className)}>
      <SLink to="#">
        <Translate str="frontend.profile.navigation.my_profile" />
      </SLink>

      <SLink to="#">
        <Translate str="frontend.profile.navigation.settings" />
      </SLink>

      <SLink to="#" onClick={handleLogOut}>
        <Translate str="frontend.profile.navigation.log_out" />
      </SLink>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 1.25rem;
`;

const SLink = styled(Link)`
  color: #2d2d3a;
  font-family: ${({ theme }) => theme.linguTextFontFamily};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25rem;
  padding: 0;
  margin-bottom: 2rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-family: ${({ theme }) => theme.linguTextFontFamily};
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.5rem;
    margin-bottom: 0.5rem;
  }

  &:hover {
    text-decoration: none;
    color: #5959bc;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default NavMenu;
