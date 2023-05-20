import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';

interface IDesktopFilterBlock {
  children: ReactNode;
  onSave: () => void;
  onClear: () => void;
  className?: string;
}

const DesktopFilterBlock: FC<IDesktopFilterBlock> = ({
  children,
  onSave,
  onClear,
  className
}) => (
  <SWrapper className={cn(className)}>
    <SContentBlock>{children}</SContentBlock>

    <SFooterBlock>
      <SClearButton onClick={onClear}>
        <Translate str="frontend.course.clear" />
      </SClearButton>

      <SSaveButton onClick={onSave}>
        <Translate str="frontend.course.save" />
      </SSaveButton>
    </SFooterBlock>
  </SWrapper>
);

export default DesktopFilterBlock;

const SWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SContentBlock = styled.div`
  margin-bottom: 30px;
`;

const SFooterBlock = styled.div`
  border-top: 1px solid #e6e6f0;
  padding-top: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SClearButton = styled.button`
  color: rgba(167, 170, 182, 0.3);
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: rgba(167, 170, 182, 0.6);
  }
`;

const SSaveButton = styled.button`
  color: #00a5d7;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #0090ba;
  }
`;
