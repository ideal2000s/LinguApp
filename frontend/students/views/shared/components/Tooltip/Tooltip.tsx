import React, { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { t } from 'i18n';

type tProps = {
  body: ReactNode;
};

const Tooltip: React.FunctionComponent<tProps> = ({ body }) => {
  if (!body) return null;

  const popover = (
    <Popover id="task-help-popover" className="task-help-popover">
      <Popover.Content as={SHintPopupBody}>{body}</Popover.Content>
    </Popover>
  );
  return (
    <>
      <GlobalTooltipStyle />

      <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
        <STooltipButton
          aria-label={t('frontend.old.task_header.tooltip_instruction', { text: body })}
          type="button"
          title={t('frontend.old.task_header.tooltip_instruction', { text: body })}
        >
          <TooltipIcon>
            <FontAwesomeIcon icon={faQuestionCircle} size={'xs'} />
          </TooltipIcon>
        </STooltipButton>
      </OverlayTrigger>
    </>
  );
};

export default Tooltip;

export const TooltipIcon = styled.span`
  color: #009ee2;
`;

const STooltipButton = styled.button`
  border: none;
  margin-left: 10px;
  background: none;
`;

const SHintPopupBody = styled.div`
  background-color: #233048;
  color: white;
  padding: 18px 18px;
  border-radius: 5px;
`;

const GlobalTooltipStyle = createGlobalStyle`
  .task-help-popover {
    .arrow:after {
      border-bottom-color: #233048;
    }
  }
`;
