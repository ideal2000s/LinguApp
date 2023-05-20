import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { customMediaQuery } from 'students/views/shared/styled';

interface ITag {
  icon?: string;
  text: string;
  className?: string;
}

const Tag: FC<ITag> = ({ icon, text, className }) => (
  <SWrapper className={cn(className)}>
    {icon && <UrlIcon url={icon} color="#ffffff" />}

    <SText>{text}</SText>
  </SWrapper>
);

export default Tag;

const SWrapper = styled.div`
  background: rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;

  & > div {
    min-height: 12px;
    min-width: 12px;
    margin-right: 4px;
  }

  ${customMediaQuery('tablet')} {
    padding: 10px 12px;

    & > div {
      min-height: 16px;
      min-width: 16px;
    }
  }
`;

const SText = styled.span`
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.875rem;

  ${customMediaQuery('tablet')} {
    font-size: 0.875rem;
  }
`;
