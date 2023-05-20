import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import styled from 'styled-components';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import ButtonGeneral from '../../ButtonGeneral';

type tSize = 'sm' | 'md' | 'lg';

export interface IProps {
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  className?: string;
  size?: tSize;
  icon: IconDefinition;
}

const NavButton: React.FC<IProps> = ({
  onClick,
  disabled,
  className,
  size = 'sm',
  icon
}) => {
  const sizingClassName = 'audio-player-size-' + size;
  return (
    <SNextButton
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(className, sizingClassName)}
    >
      <FontAwesomeIcon className="btn-svg" icon={icon} size={'lg'} color="#ffffff" />
    </SNextButton>
  );
};

export default NavButton;

const SNextButton = styled(ButtonGeneral)`
  --btnWidth: 80px;
  --btnHeight: 80px;

  align-self: center;
  background: #009ee2;
  border: none;
  position: relative;
  width: var(--btnWidth);
  height: var(--btnHeight);
  border-radius: 50px;
  padding: 0;

  &.audio-player-size {
    &-md {
      width: calc(var(--btnWidth) / 10 * 8);
      height: calc(var(--btnHeight) / 10 * 8);
    }
    &-sm {
      width: calc(var(--btnWidth) / 10 * 5);
      height: calc(var(--btnHeight) / 10 * 5);
    }
  }

  &:disabled {
    background: #e6e6f0;

    &::before {
      background: #b9b9b9;
    }
    &::after {
      background: radial-gradient(circle, #ffffff 60%, #b9b9b9 65%);
    }

    .btn-svg {
      color: #fbfcff;
    }
  }
`;
