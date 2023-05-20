import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { t } from 'i18n';
import { customMediaQuery } from '../../styled';
import CircleButton, { ICircleButton } from '../CircleButton/CircleButton';
import { styleInnerButton } from '../ButtonGeneral/ButtonGeneral';

const CloseButton: React.FC<ICircleButton> = ({ onClick, className }) => {
  return (
    <SCloseIcon
      onClick={onClick}
      bgColor="rgba(0, 0, 0, 0.2)"
      className={cn(className)}
      shadowColor="none"
      title={t('frontend.lesson_page.close')}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.75 1.69922L1.25 15.1992"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.25 1.69922L14.75 15.1992"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SCloseIcon>
  );
};

const SCloseIcon = styled(CircleButton)`
  z-index: 1;
  color: #fff;
  width: auto;
  height: auto;
  margin-top: 0;
  margin-bottom: 0;

  svg {
    width: 0.75rem;
    height: 0.75rem;
    opacity: 0.7;

    ${customMediaQuery('tablet')} {
      width: 0.875rem;
      height: 0.875rem;
      opacity: 1;
    }
  }

  ${styleInnerButton()} {
    padding: 8px;

    ${customMediaQuery('tablet')} {
      padding: 11px;
    }
  }
`;

export default CloseButton;
