import React from 'react';
import styled from 'styled-components';
import { ButtonProps } from 'react-bootstrap';
import cn from 'classnames';

interface IProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon: string;
  variant?: ButtonProps['variant'];
}
const IconButton: React.FC<IProps> = ({ onClick, className, disabled, icon }) => {
  return (
    <SIconButton
      type="button"
      onClick={onClick}
      className={cn(className)}
      disabled={disabled}
    >
      <SIcon icon={icon} />
    </SIconButton>
  );
};

export default IconButton;

const SIconButton = styled.button`
  width: 1.79rem;
  height: 1.79rem;
  background: none;
  border: none;
  padding: 0.2rem;
  display: flex;
  align-items: center;
`;
const SIcon = styled.i<{ icon: string }>`
  width: 100%;
  height: 100%;
  display: inline-block;
  background: url(${({ icon }) => icon});
  background-position: center;
  background-size: contain;
`;
