import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { customMediaQuery, SPrimaryButton } from 'students/views/shared/styled';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';

interface ITitle {
  title: string;
  navigateToLesson: () => void;
  className?: string;
}

const Title: FC<ITitle> = ({ title, navigateToLesson, className }) => (
  <SWrapper className={cn(className)}>
    <STitle>{title}</STitle>

    <SActionButton onClick={navigateToLesson}>
      <Translate str="frontend.course.try_this_course" />
    </SActionButton>
  </SWrapper>
);

export default Title;

const SWrapper = styled.div`
  margin: 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${customMediaQuery('tablet')} {
    margin: 0 0 36px;
  }
`;

const STitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.875rem;
  color: #2d2d3a;
  margin: 0;
  padding: 0;

  ${customMediaQuery('tablet')} {
    font-size: 2.75rem;
    line-height: 3.5rem;
  }
`;

const SActionButton = styled(SPrimaryButton)`
  display: none;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.375rem;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);

  ${styleInnerButton()} {
    padding: 0.5rem 2rem;
  }

  ${customMediaQuery('tablet')} {
    display: block;
  }
`;
