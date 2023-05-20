import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';
import Picture from 'students/views/shared/components/Picture';

interface IBanner {
  imageUrl: string;
  title?: string;
  className?: string;
}

const Banner: FC<IBanner> = ({ imageUrl, title, className }) => (
  <SBanner className={cn(className)} imageUrl={imageUrl} title={title}>
    <Picture lazy src={imageUrl} alt={title} />
  </SBanner>
);

export default Banner;

const SBanner = styled.div<{ imageUrl: string }>`
  background-color: #e6e6f0;
  height: 376px;
  width: calc(100% + 2rem);
  margin: -1rem -1rem 20px;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    height: 464px;
    width: 100%;
    border-radius: 20px;
    margin: 0 auto 40px;
  }
`;
