import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';

interface ICourseMetric {
  icon: string;
  text: string;
  className?: string;
}

const CourseMetric: FC<ICourseMetric> = ({ icon, text, className }) => (
  <SWrapper className={cn(className)}>
    <SIcon src={icon} />

    <SText>{text}</SText>
  </SWrapper>
);

export default CourseMetric;

const SWrapper = styled.div`
  background: rgba(230, 230, 240, 0.5);
  border-radius: 10px;
  padding: 18px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: max-content;
  min-width: 110px;

  ${customMediaQuery('tablet')} {
    padding: 10px 18px;
    flex-direction: row;
    min-width: 150px;
  }
`;

const SIcon = styled.div<{ src: string }>`
  display: inline-block;
  background-image: url(${({ src }) => src});
  margin-right: 0;
  height: 15px;
  width: 15px;
  min-width: 15px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  ${customMediaQuery('tablet')} {
    margin-right: 12px;
  }
`;

const SText = styled.h3`
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1rem;
  color: #2d2d3a;
  margin: 8px 0 0;
  padding: 0;
  text-transform: lowercase;

  ${customMediaQuery('tablet')} {
    font-size: 1rem;
    line-height: 1.25rem;
    margin: 0;
  }
`;
