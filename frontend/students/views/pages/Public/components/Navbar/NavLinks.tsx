import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Translate } from 'i18n';

const NavLinks: FC = () => (
  <SWrapper>
    <SLink to="#">
      <Translate str="frontend.course.lessons" />
    </SLink>

    <SLink to="#">
      <Translate str="frontend.course.teach" />
    </SLink>

    <SLink to="#">
      <Translate str="frontend.course.plans" />
    </SLink>
  </SWrapper>
);

export default NavLinks;

const SWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.125rem;
  color: #2d2d3a;
  margin: 0 24px 0 0;
  padding: 0;
  transition: color 0.3s;

  &:hover {
    color: #606075;
    text-decoration: none;
  }

  &:last-child {
    margin: 0;
  }
`;
