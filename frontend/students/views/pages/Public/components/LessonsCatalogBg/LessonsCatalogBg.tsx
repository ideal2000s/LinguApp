import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

import LessonsCatalogLeftBg from '../../assets/lessons_catalog_left_bg.svg';
import LessonsCatalogRightBg from '../../assets/lessons_catalog_right_bg.svg';

interface ILessonsCatalogBg {
  children: ReactNode;
}

const LessonsCatalogBg: FC<ILessonsCatalogBg> = ({ children }) => (
  <SWrapper>
    <SBanner />

    <SContentWrapper>{children}</SContentWrapper>
  </SWrapper>
);

export default LessonsCatalogBg;

const SWrapper = styled.div`
  background: rgba(246, 247, 251, 0.8);
  position: relative;
`;

const SContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const SBanner = styled.div`
  background-color: #00a5d7;
  background-image: url(${LessonsCatalogLeftBg}), url(${LessonsCatalogRightBg});
  background-size: contain;
  background-repeat: no-repeat, no-repeat;
  background-position-x: -340px, 330px;
  height: 800px;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  ${customMediaQuery('tablet')} {
    background-position-x: left, right;
    height: 620px;
  }
`;
