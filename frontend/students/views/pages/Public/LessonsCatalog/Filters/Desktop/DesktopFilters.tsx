import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import FiltersGroup from './FiltersGroup';
import FiltersNavbar from './FiltersNavbar';
import StickyHeader from '../../components/StickyHeader';

interface IDesktopFilters {
  subTitle: string;
  className?: string;
}

const DesktopFilters: FC<IDesktopFilters> = ({ subTitle, className }) => (
  <SWrapper className={cn(className)}>
    <SSubTitle>{subTitle}</SSubTitle>

    <FiltersGroup variant="default" />

    <StickyHeader options={{ topOffset: 50 }} stickyStyles={{ zIndex: 2 }}>
      {({ isSticky }) => <FiltersNavbar isSticky={isSticky} />}
    </StickyHeader>
  </SWrapper>
);

export default DesktopFilters;

const SWrapper = styled.div``;

const SSubTitle = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  margin: 0 0 12px;
`;
