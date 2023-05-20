import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { customMediaQuery } from 'students/views/shared/styled';

interface IProps {
  label: string;
  iconUrl: string;
  isActive?: boolean;
  className?: string;
  onClick: () => void;
}

const ControlItem: FC<IProps> = ({
  label,
  iconUrl,
  isActive = false,
  className,
  onClick
}) => {
  return (
    <SControlContainer className={cn(className)}>
      <SControlButtonContainer>
        <SControlButton active={isActive} onClick={onClick}>
          <UrlIcon
            url={iconUrl}
            width="2em"
            height="2em"
            color={isActive ? '#543C94' : '#705BA9'}
          />
        </SControlButton>
      </SControlButtonContainer>
      <SControlLabel>{label}</SControlLabel>
    </SControlContainer>
  );
};

export default ControlItem;

const SControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;

  ${customMediaQuery('mobile')} {
    font-size: 0.5rem;
  }
`;

const SControlButtonContainer = styled.div`
  text-align: center;
  height: 71px;
  width: 71px;

  ${customMediaQuery('mobile')} {
    height: 47px;
    width: 47px;
  }
`;

const SControlButton = styled(ButtonGeneral)<{ active: boolean }>`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  border: 0;
  border-radius: 16px;
  background: ${({ active }) =>
    active
      ? 'linear-gradient(135.47deg, #ffffff 0.35%, #cccfde 99.54%)'
      : 'rgba(0, 0, 0, 0.3)'};

  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);

  ${customMediaQuery('mobile')} {
    border-radius: 10px;
  }
`;

const SControlLabel = styled.div`
  color: #fbfcff;
  text-align: center;
  margin-top: 12px;
  font-size: 0.75rem;

  ${customMediaQuery('mobile')} {
    margin-top: 8px;
    font-size: 1.5em;
  }
`;
