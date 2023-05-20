import React, { FC, ReactNode, RefObject, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { useOutsideClick } from 'students/views/shared/hooks';

import TooltipFilterFooter from '../../components/TooltipFilterFooter';
import { useFilter } from '../../hooks';

interface ITooltipFilterBlock {
  filterName: string;
  className?: string;
  onSave: () => void;
  children: (options: string[], setOptions: (opt: string[]) => void) => ReactNode;
  triggerRef: RefObject<HTMLButtonElement>;
}

const TooltipFilterBlock: FC<ITooltipFilterBlock> = ({
  filterName,
  children,
  onSave,
  className,
  triggerRef
}) => {
  const filterRef = useRef(null);
  const [filterOptions, setFilterOptions] = useFilter(filterName);

  useOutsideClick(filterRef, onSave, [triggerRef]);

  const handleClear = () => {
    setFilterOptions([]);
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <SWrapper ref={filterRef} className={cn(className)}>
      <SContentWrapper>{children(filterOptions, setFilterOptions)}</SContentWrapper>

      <STooltipFilterFooter
        onClear={handleClear}
        onSave={handleSave}
        optionSelected={!!filterOptions.length}
      />
    </SWrapper>
  );
};

export default TooltipFilterBlock;

const SWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 8px;
`;

const SContentWrapper = styled.div`
  padding: 0 0 16px;
`;

const STooltipFilterFooter = styled(TooltipFilterFooter)`
  margin-top: 10px;
`;
