import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import FiltersNavbar from './FiltersNavbar';
import StickyHeader from '../../components/StickyHeader';

interface IMobileFilters {
  subTitle: string;
  className?: string;
}

const MobileFilters: FC<IMobileFilters> = ({ subTitle, className }) => (
  <div className={cn(className)}>
    <SSubTitle>{subTitle}</SSubTitle>

    <StickyHeader
      options={{ topOffset: 100 }}
      stickyStyles={{ bottom: 0, top: 'unset', zIndex: 2 }}
    >
      {({ isSticky }) => <FiltersNavbar isSticky={isSticky} />}
    </StickyHeader>
  </div>
);

export default MobileFilters;

const SSubTitle = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  margin: 0 0 12px;
`;
