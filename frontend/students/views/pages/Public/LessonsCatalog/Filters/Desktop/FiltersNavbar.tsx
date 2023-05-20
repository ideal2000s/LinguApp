import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import darkLogo from 'students/views/shared/assets/lingu-logo.svg';

import FiltersGroup from './FiltersGroup';

interface IFiltersNavbar {
  className?: string;
  isSticky: boolean;
}

const FiltersNavbar: FC<IFiltersNavbar> = ({ className, isSticky }) =>
  isSticky ? (
    <SContainer className={cn(className)}>
      <SLogo href="/" $image={darkLogo} title="Lingu" />

      <SWrapper>
        <FiltersGroup variant="light" />
      </SWrapper>
    </SContainer>
  ) : null;

export default FiltersNavbar;

const SContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  padding: 12px 150px;
  position: relative;
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
`;

const SLogo = styled.a<{ $image: string }>`
  display: inline-block;
  background-image: url(${({ $image }) => $image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 110px;
  height: 50px;
  position: absolute;
  top: 12px;
  left: 32px;
`;
