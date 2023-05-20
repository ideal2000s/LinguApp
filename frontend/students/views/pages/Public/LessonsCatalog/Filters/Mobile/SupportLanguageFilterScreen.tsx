import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { SPrimaryButton } from 'students/views/shared/styled';

import SupportLanguageFilter from '../../components/SupportLanguageFilter';
import BackButtonIcon from '../../../assets/back_button_icon.svg';

interface ISupportLanguageFilterInput {
  onClose: () => void;
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  className?: string;
}

const SupportLanguageFilterScreen: FC<ISupportLanguageFilterInput> = ({
  onClose,
  selectedOptions,
  onChange,
  className
}) => (
  <SWrapper className={cn(className)}>
    <SHeader>
      <Translate str="frontend.course.i_understand" />

      <SBackButton onClick={onClose} />
    </SHeader>

    <SSupportLanguageFilter
      $fullHeight={selectedOptions.length === 0}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />

    {selectedOptions.length > 0 && (
      <SFooter>
        <SClearButton onClick={() => onChange([])}>
          <Translate str="frontend.course.clear_filters" />
        </SClearButton>

        <SShowButton onClick={onClose}>
          <Translate
            str="frontend.course.select_num_languages"
            params={{ number: selectedOptions.length }}
          />
        </SShowButton>
      </SFooter>
    )}
  </SWrapper>
);

export default SupportLanguageFilterScreen;

const SWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(248, 249, 252);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
`;

const SHeader = styled.h2`
  margin: 22px 12px 26px;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 2.25rem;
  color: #2d2d3a;
  padding: 0;
  position: relative;
  text-align: center;
  width: 100%;
`;

const SBackButton = styled.button`
  border: none;
  background: none;
  background-image: url(${BackButtonIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 7px;
  left: 0;
  padding: 0;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SSupportLanguageFilter = styled(SupportLanguageFilter)<{ $fullHeight: boolean }>`
  max-height: ${({ $fullHeight }) =>
    $fullHeight ? 'calc(100vh - 110px)' : 'calc(100vh - 180px)'};
`;

const SFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SClearButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #5e5d71;
  margin-right: 12px;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SShowButton = styled(SPrimaryButton)`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25rem;
  margin: 0;
  min-height: 3rem;
  max-height: 3rem;

  ${styleInnerButton()} {
    padding: 0.75rem 1.5rem;
  }
`;
