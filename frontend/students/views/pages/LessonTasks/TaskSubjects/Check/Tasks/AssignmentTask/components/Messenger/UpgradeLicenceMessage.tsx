import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import UrlIcon from 'students/views/shared/components/UrlIcon';

import WarningIcon from '../../assets/warning_icon.svg';

interface IUpgradeLicenceMessage {
  amountOfAssignments: number;
  onUpgrade: () => void;
  onSkip: () => void;
  className?: string;
}

const UpgradeLicenceMessage: FC<IUpgradeLicenceMessage> = ({
  amountOfAssignments,
  onUpgrade,
  onSkip,
  className
}) => (
  <SWrapper className={cn(className)}>
    <SWarningBlock>
      <STitleWrapper>
        <UrlIcon url={WarningIcon} color="#FF5858" height="22px" width="22px" />

        <STitle>
          <Translate
            str="frontend.lesson_task.tasks.check.assignment.you_have_used_amount_of_assignments"
            params={{
              amountOfAssignments: (
                <>
                  <SRed>10</SRed>/{amountOfAssignments}
                </>
              )
            }}
          />
        </STitle>
      </STitleWrapper>

      <SSubTitle>
        <Translate str="frontend.lesson_task.tasks.check.assignment.upgrade_your_plan" />
      </SSubTitle>

      <SActionButtonsBlock>
        <SDesktopSkipButton onClick={onSkip}>
          <Translate str="frontend.lesson_task.tasks.check.assignment.skip" />
        </SDesktopSkipButton>

        <SUpgradeButton onClick={onUpgrade}>
          <Translate str="frontend.lesson_task.tasks.check.assignment.upgrade_licence" />
        </SUpgradeButton>
      </SActionButtonsBlock>
    </SWarningBlock>

    <SMobileSkipButton onClick={onSkip}>
      <Translate str="frontend.lesson_task.tasks.check.assignment.skip" />
    </SMobileSkipButton>
  </SWrapper>
);

export default UpgradeLicenceMessage;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const SWarningBlock = styled.div`
  width: 100%;
  background: #ffe6c8;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;

  ${customMediaQuery('tablet')} {
    align-items: center;
    padding: 20px;
  }
`;

const SActionButtonsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SMobileSkipButton = styled.button`
  margin: 12px 0 0;
  border: 2px solid transparent;
  background: rgba(45, 45, 58, 0.1);
  border-radius: 10px;
  width: 100%;
  height: 44px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 2.25rem;
  color: rgba(45, 45, 58, 0.8);
  transition: color 0.3s, background 0.3s;

  &:hover {
    background: rgba(45, 45, 58, 0.2);
    color: #2d2d3a;
  }

  &:focus {
    background: rgba(45, 45, 58, 0.2);
    border: 2px solid #66d6f3;
    color: #2d2d3a;
    outline: none;
  }

  &:active {
    background: rgba(45, 45, 58, 0.4);
    color: #2d2d3a;
    outline: none;
  }

  ${customMediaQuery('tablet')} {
    display: none;
  }
`;

const SDesktopSkipButton = styled.button`
  margin: 0 20px 0 0;
  border: 2px solid transparent;
  background: rgba(45, 45, 58, 0.1);
  border-radius: 10px;
  width: 100%;
  height: 48px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 2.25rem;
  color: rgba(45, 45, 58, 0.8);
  display: none;
  transition: color 0.3s, background 0.3s;

  &:hover {
    background: rgba(45, 45, 58, 0.2);
    color: #2d2d3a;
  }

  &:focus {
    background: rgba(45, 45, 58, 0.2);
    border: 2px solid #66d6f3;
    color: #2d2d3a;
    outline: none;
  }

  &:active {
    background: rgba(45, 45, 58, 0.4);
    color: #2d2d3a;
    outline: none;
  }

  ${customMediaQuery('tablet')} {
    display: block;
  }
`;

const SUpgradeButton = styled.button`
  margin: 0;
  border: 2px solid transparent;
  background: rgba(251, 252, 255, 0.7);
  border-radius: 6px;
  width: 100%;
  height: 44px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: #2d2d3a;
  transition: background 0.3s;
  outline: none;

  &:hover {
    background: #fbfcff;
  }

  &:focus {
    background: #fbfcff;
    border: 2px solid #66d6f3;
    outline: none;
  }

  &:active {
    background: #fbfcff;
    outline: none;
  }

  ${customMediaQuery('tablet')} {
    background: #fbfcff;
    height: 48px;
  }
`;

const STitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  ${customMediaQuery('tablet')} {
    margin-bottom: 12px;
  }

  & > div {
    margin-right: 4px;
  }
`;

const STitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  color: #2d2d3a;

  ${customMediaQuery('tablet')} {
    font-size: 1rem;
  }
`;

const SRed = styled.span`
  color: #ff5858;
`;

const SSubTitle = styled.p`
  margin: 0 0 12px;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.125rem;
  color: #5e5d71;

  ${customMediaQuery('tablet')} {
    font-size: 1rem;
    line-height: 1.5rem;
    margin: 0 0 20px;
  }
`;
