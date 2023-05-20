import React, { FC, ReactNode, RefObject, useCallback, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { useOutsideClick } from 'students/views/shared/hooks';

import TooltipFilterFooter from '../../components/TooltipFilterFooter';
import { useFilter } from '../../hooks';

interface IAdditionalFilterBlock {
  filterNames: string[];
  className?: string;
  children: (
    filtersControls: [options: string[], setOption: (opt: string[]) => void][]
  ) => ReactNode;
  onSave: () => void;
  triggerRef: RefObject<HTMLButtonElement>;
}

const AdditionalFilterBlock: FC<IAdditionalFilterBlock> = ({
  filterNames,
  children,
  className,
  onSave,
  triggerRef
}) => {
  const filterRef = useRef(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filtersControls = filterNames.map((filter: string) => useFilter(filter));

  useOutsideClick(filterRef, onSave, [triggerRef]);

  const handleClear = useCallback(() => {
    filtersControls.forEach((filtersControl) => filtersControl[1]([]));
  }, [filtersControls]);

  const handleSave = () => {
    onSave();
  };

  return (
    <SWrapper ref={filterRef} className={cn(className)}>
      <SContentWrapper>{children(filtersControls)}</SContentWrapper>

      <STooltipFilterFooter
        onClear={handleClear}
        onSave={handleSave}
        optionSelected={!!filtersControls.length}
      />
    </SWrapper>
  );
};

export default AdditionalFilterBlock;

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
