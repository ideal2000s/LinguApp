import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import './font-size-switcher.style.scss';

interface IProps {
  onChange: MouseEventHandler<HTMLButtonElement>;
}
const PopoverFontSwitcher: React.FC<IProps> = ({ onChange }) => {
  const popover = (
    <Popover id="font-size-switcher" className="font-size-switcher">
      <Popover.Content as={SFontSizePopoverBody}>
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
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
      <button className="btn" type="button">
        <span>A</span>
        <span style={{ fontVariant: 'all-small-caps' }}>a</span>
      </button>
    </OverlayTrigger>
  );
};

export default PopoverFontSwitcher;

const SFontSizePopoverBody = styled.div`
  background-color: ${({ theme }) => theme.gray100};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 10px;
  border-radius: 5px;

  .font-increase,
  .font-decrease {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  button {
    font-size: 16px;
    vertical-align: bottom;
  }
`;
