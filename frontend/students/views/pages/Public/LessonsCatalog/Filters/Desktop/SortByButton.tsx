import React, { FC, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { OverlayChildren } from 'react-bootstrap/Overlay';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate, t } from 'i18n';

import { SORT_BY_CONFIG } from '../../components/SortByFilter/Config';
import { FILTER_SORT } from '../../Config';
import { useFilterEventListener } from '../../hooks';
import { getAllFilterConditions } from '../../helpers/filter';

interface ISortByButton {
  popover: (
    close: () => void,
    triggerRef: RefObject<HTMLButtonElement>
  ) => OverlayChildren;
  isLight?: boolean;
  className?: string;
}

const SortByButton: FC<ISortByButton> = ({ popover, isLight, className }) => {
  const buttonRef = useRef(null);
  const [show, setShow] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>('');

  useFilterEventListener(FILTER_SORT, ({ data }) => {
    setCurrentFilter(
      SORT_BY_CONFIG.find((option) => option.fields === data[0])?.title ||
        t('frontend.course.select_dots')
    );
  });

  useEffect(() => {
    setCurrentFilter(
      SORT_BY_CONFIG.find(
        (option) => option.fields === getAllFilterConditions(FILTER_SORT)[0]
      )?.title || t('frontend.course.select_dots')
    );
  }, [setCurrentFilter]);

  const toggle = useCallback(() => {
    setShow((prev) => !prev);
  }, [setShow]);

  const close = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <OverlayTrigger
      rootClose
      show={show}
      placement="bottom"
      overlay={popover(close, buttonRef)}
    >
      <SWrapper className={cn(className)}>
        <SText $isLight={!!isLight}>
          <Translate str="frontend.course.by" />:
        </SText>

        <SButton $isLight={!!isLight} onClick={toggle} ref={buttonRef}>
          {currentFilter}
        </SButton>
      </SWrapper>
    </OverlayTrigger>
  );
};

export default SortByButton;

const SWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SText = styled.p<{ $isLight: boolean }>`
  padding: 0;
  margin: 0 8px 0 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: ${({ $isLight }) =>
    $isLight ? 'rgba(47, 47, 47, 0.5)' : 'rgba(255, 255, 255, 0.7)'};
`;

const SButton = styled.button<{ $isLight: boolean }>`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: ${({ $isLight }) => ($isLight ? '#2d2d3a' : '#ffffff')};
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 13px;
    right: -16px;
    width: 0;
    height: 0;
    border-top: 5px solid ${({ $isLight }) => ($isLight ? '#2d2d3a' : '#ffffff')};
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-radius: 2px;
  }

  &:active,
  &:focus {
    outline: none;
  }
`;
