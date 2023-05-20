import React from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner/Spinner';

import { withErrorBoundary } from '../../HOCs';

export interface IButtonGeneral extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: 'primary' | 'link' | 'light';
  showSpinner?: boolean;
}

const ButtonGeneralComponent: React.FC<IButtonGeneral> = ({
  children,
  onClick,
  block,
  variant,
  showSpinner,
  ...props
}) => {
  return (
    <SButtonGeneral onClick={onClick} block={block} variant={variant} {...props}>
      <div className="inner" tabIndex={-1}>
        {showSpinner ? <Spinner /> : children}
      </div>
    </SButtonGeneral>
  );
};

const SButtonGeneral = styled.button<IButtonGeneral>`
  border: 1px solid transparent;
  text-align: center;
  user-select: none;
  padding: 0;
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  width: ${({ block }) => (block ? '100%' : 'auto')};

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          color: #fff;
          background-color: #00a5d7;
          border-color: #00a5d7;
        `;

      case 'link':
        return `
          font-weight: 400;
          color: #00a5d7;
          text-decoration: none;
        `;

      case 'light':
        return `
          color: #344050;
          background-color: #f9fafd;
          border-color: #f9fafd;
        `;

      default:
        return 'color: #fff;';
    }
  }};

  &:focus,
  > .inner:focus {
    outline: none;
  }

  > .inner {
    height: 100%;
    width: 100%;
    min-height: inherit;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:focus > .inner {
    box-shadow: 0 0 0 0.2rem rgba(0, 165, 215, 0.25);
  }

  &:disabled {
    opacity: 0.65;
    pointer-events: none;
  }
`;

type tPseudo = 'hover' | 'focus' | 'active';
export function styleInnerButton(pseudoClass?: tPseudo): string {
  if (pseudoClass) return `&:${pseudoClass} > .inner`;
  return '& > .inner';
}
export default withErrorBoundary(ButtonGeneralComponent);
