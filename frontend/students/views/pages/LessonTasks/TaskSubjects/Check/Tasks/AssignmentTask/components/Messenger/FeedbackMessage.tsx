import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';

import ThumbUpPersonIcon from '../../assets/thumb_up_person_icon.svg';

interface IMessage {
  message: string;
  className?: string;
}

const FeedbackMessage: FC<IMessage> = ({ message, className }) => (
  <SMessage className={cn(className)}>
    <SMessageText>{message}</SMessageText>
  </SMessage>
);

export default FeedbackMessage;

const SMessage = styled.div`
  background: #00a5d7;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  padding: 16px 35px 16px 70px;
  width: 100%;
  max-width: 95%;

  ${customMediaQuery('tablet')} {
    padding: 20px 75px;
    max-width: 85%;
  }

  &:before {
    content: '';
    display: block;
    background-image: url(${ThumbUpPersonIcon});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: -25px;
    left: -16px;
    height: 114px;
    width: 77px;

    ${customMediaQuery('tablet')} {
      top: -36px;
    }
  }
`;

const SMessageText = styled.p`
  margin: 0;
  padding: 0;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.125rem;
`;
