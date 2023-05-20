import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { customMediaQuery } from 'students/views/shared/styled';
import SAnswerOptionIconWrap from '../../components/styled/SAnswerOptionIconWrap';

interface IProps {
  isCorrect: boolean;
  children: React.ReactText;
  solutions: string[];
}

const AnswerSentenceGap: React.FC<IProps> = ({ isCorrect, children, solutions }) => {
  const renderTooltip = (props?: any) => (
    <SPopover {...props}>
      <SPopoverContent>
        {solutions.map((solution, idx) => (
          <SPopoverItem key={idx}>
            <SOptionIcon>
              <FontAwesomeIcon icon={faCheck} />
            </SOptionIcon>
            <SAnswerOptionText>{solution}</SAnswerOptionText>
          </SPopoverItem>
        ))}
      </SPopoverContent>
    </SPopover>
  );

  return (
    <OverlayTrigger placement="bottom-end" overlay={renderTooltip}>
      <SAnswerSentenceGap isCorrect={isCorrect}>{children}</SAnswerSentenceGap>
    </OverlayTrigger>
  );
};

const SAnswerSentenceGap = styled.span<{ isCorrect: boolean }>`
  display: inline-block;
  border: 1px solid transparent;
  padding: 0.438rem 0.625rem;
  border-radius: 10px;
  line-height: 1em;
  cursor: pointer;

  ${({ isCorrect }) =>
    isCorrect
      ? `
          border-color: #39B54A;
          background-color: rgba(247, 255, 230, 0.8);
        `
      : `
          border-color: #ff5858; 
          background-color: rgba(255, 229, 229, 0.8);
        `}

  ${customMediaQuery('tablet')} {
    border-width: 2px;
  }
`;

const SPopover = styled(Popover)`
  background-color: #fff;
  color: #2d2d3a;
  border-radius: 6px;
  border-color: transparent;
  box-shadow: 0 0 16px rgba(45, 45, 58, 0.16);

  .arrow::before {
    border-color: transparent;
  }
`;

const SPopoverContent = styled(Popover.Content)`
  padding: 0.875rem 1.125rem;
  display: flex;
  flex-direction: column;
`;

const SPopoverItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SOptionIcon = styled(SAnswerOptionIconWrap)`
  width: 1rem;
  height: 1rem;
  font-size: 0.625rem;
`;

const SAnswerOptionText = styled.span`
  font-size: 1rem;
  line-height: 1.25em;
  color: #2d2d3a;
  margin-left: 8px;
`;

export default AnswerSentenceGap;
