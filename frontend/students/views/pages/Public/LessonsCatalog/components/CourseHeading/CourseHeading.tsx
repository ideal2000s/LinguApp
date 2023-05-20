import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';
import Picture from 'students/views/shared/components/Picture';

import BannerImage from '../../../assets/lessons_catalog_main_banner.svg';

interface ICourseHeading {
  title: string;
  subTitle?: string;
  className?: string;
}

const CourseHeading: FC<ICourseHeading> = ({ title, subTitle, className }) => (
  <SWrapper className={cn(className)}>
    <STextBlock>
      <STitle>{title}</STitle>

      {subTitle && <SSubTitle>{subTitle}</SSubTitle>}
    </STextBlock>

    <SBannerImage>
      <Picture lazy src={BannerImage} alt={title} />
    </SBannerImage>
  </SWrapper>
);

export default CourseHeading;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 70px 0 80px;

  ${customMediaQuery('tablet')} {
    flex-direction: row;
    justify-content: center;
    margin: 80px 0 60px;
  }
`;

const STextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 24px;

  ${customMediaQuery('tablet')} {
    align-items: flex-start;
    margin: 0 24px 0 0;
  }
`;

const STitle = styled.h1`
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 2.25rem;
  padding: 0;
  margin: 0 0 14px;
  text-align: center;

  ${customMediaQuery('tablet')} {
    font-size: 3rem;
    line-height: 3.75rem;
    margin: 0 0 30px;
    text-align: left;
  }
`;

const SSubTitle = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75rem;
  padding: 0;
  margin: 0;
  text-align: center;

  ${customMediaQuery('tablet')} {
    font-size: 1.375rem;
    line-height: 2.25rem;
    text-align: left;
  }
`;

const SBannerImage = styled.div`
  min-width: 260px;
  min-height: 240px;
`;
