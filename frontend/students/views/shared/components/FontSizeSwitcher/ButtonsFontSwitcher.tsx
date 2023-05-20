import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface IProps {
  onChange: MouseEventHandler<HTMLButtonElement>;
}
const ButtonsFontSwitcher: React.FC<IProps> = ({ onChange }) => {
  return (
    <SActionButtons>
      <button
        className="btn font-increase"
        type="button"
        data-sign="+"
        onClick={onChange}
      >
        A
      </button>
      <button
        className="btn font-decrease"
        style={{ fontVariant: 'all-small-caps' }}
        type="button"
        data-sign="-"
        onClick={onChange}
      >
        A
      </button>
    </SActionButtons>
  );
};

const SActionButtons = styled.div`
  .font-increase,
  .font-decrease {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

export default ButtonsFontSwitcher;
