import React, { ReactNode } from 'react';
import { AlertCustomOptionsWithType } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import styled from 'styled-components';

type tProps = {
  style: React.CSSProperties;
  options: AlertCustomOptionsWithType;
  message: ReactNode | undefined;
  close: () => any;
};

const AlertContainer = styled.div`
  margin: 10px;
  background-color: #68bbe3;
  color: white;
  text-transform: uppercase;
  padding: 10px 20px;
`;

export const MessageContainer = styled.span`
  display: inline-block;
  width: calc(100% - 32px);
`;

const CloseButton = styled.button`
  margin-left: 10px;
  border: none;
  background: transparent;
  padding: 0;
  vertical-align: top;
`;

const AlertTemplate: React.FunctionComponent<tProps> = ({
  style,
  options,
  message,
  close
}) => {
  const backgroundColor =
    options.type === 'success'
      ? '#DDECBB'
      : options.type === 'info'
      ? '#FDF2D6'
      : '#FCE0EC';
  const borderColor =
    options.type === 'success'
      ? '#DDECBB'
      : options.type === 'info'
      ? '#FDF2D6'
      : '#FCE0EC';
  const color =
    options.type === 'success'
      ? '#8FB932'
      : options.type === 'info'
      ? '#F7971D'
      : '#E1288F';

  return (
    <AlertContainer
      style={{
        ...style,
        backgroundColor,
        borderColor,
        color
      }}
    >
      <MessageContainer>{message}</MessageContainer>
      <CloseButton style={{ color, fontWeight: 'bold' }} onClick={close}>
        <FontAwesomeIcon icon={faTimes} size={'lg'} />
      </CloseButton>
    </AlertContainer>
  );
};

export default AlertTemplate;
