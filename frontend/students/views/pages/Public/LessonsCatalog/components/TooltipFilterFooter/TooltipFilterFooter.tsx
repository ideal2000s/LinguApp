import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';

interface ITooltipFilterBlock {
  className?: string;
  onClear: () => void;
  onSave: () => void;
  optionSelected: boolean;
}

const TooltipFilterFooter: FC<ITooltipFilterBlock> = ({
  onClear,
  onSave,
  className,
  optionSelected
}) => (
  <SFooter className={cn(className)}>
    <SClearButton onClick={onClear} disabled={!optionSelected}>
      <Translate str="frontend.course.clear" />
    </SClearButton>

    <SSaveButton onClick={onSave}>
      <Translate str="frontend.course.save" />
    </SSaveButton>
  </SFooter>
);

export default TooltipFilterFooter;

const SFooter = styled.div`
  border-top: 1px solid #e6e6f0;
  padding: 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SClearButton = styled(ButtonGeneral)`
  border: none;
  background: transparent;
  color: #a7aab6;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  transition: color 0.3s;

  &:disabled {
    opacity: 0.3;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

const SSaveButton = styled(ButtonGeneral)`
  border: none;
  background: transparent;
  color: #00a5d7;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25rem;
  transition: color 0.3s;

  &:hover {
    color: #0081a9;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;
