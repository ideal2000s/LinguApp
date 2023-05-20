import React from 'react';
import { Modal } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';
import { Translate } from 'i18n';
import { SRootStyle } from 'students/views/shared/styled';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';

interface IShortAssayConfirmationModalProps {
  onSend: () => void;
  show: boolean;
  close: () => void;
  currentWordsNumber: number;
  minWordsNumber: number;
}
const ShortAssayConfirmationModal: React.FC<IShortAssayConfirmationModalProps> = ({
  close,
  onSend,
  show,
  currentWordsNumber,
  minWordsNumber
}) => {
  const handleClose = () => {
    close();
  };
  const handleSend = () => {
    onSend();
  };

  return (
    <Modal show={show} onHide={() => close()} centered dialogClassName="shortAssayModal">
      <SRootStyle>
        <GlobalModalStyle />
        <SModalBody>
          <SBody>
            <SHeader>
              <Translate str="frontend.lesson_task.tasks.check.assignment.too_short_answer" />
            </SHeader>
            <SText>
              <Translate
                str="frontend.lesson_task.tasks.check.assignment.essay_does_not_have_enough_words"
                params={{
                  minWordsNumber,
                  currentWordsNumber
                }}
              />
            </SText>
            <SLinkButton onClick={handleClose}>
              <Translate str="frontend.lesson_task.tasks.check.assignment.continue_writing" />
            </SLinkButton>
            <SLinkButton secondary onClick={handleSend}>
              <Translate str="frontend.lesson_task.tasks.check.assignment.send_anyway" />
            </SLinkButton>
          </SBody>
        </SModalBody>
      </SRootStyle>
    </Modal>
  );
};

export default ShortAssayConfirmationModal;

const SBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 23rem;
`;

const SHeader = styled.h1`
  font-family: Encode Sans;
  font-weight: bold;
  color: #2d2d3a;
  text-align: center;
  font-size: 1.75rem;
  line-height: 2.25rem;
`;

const SText = styled.p`
  text-align: center;
  font-size: 1.125rem;
  line-height: 1.375rem;
  letter-spacing: -0.02em;
  color: #5e5d71;
`;

const SLinkButton = styled(ButtonGeneral)<{ secondary?: boolean }>`
  min-height: 3.5rem;
  background: ${({ secondary }) => (secondary ? '#f0f0f3' : '#00a5d7')};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: ${({ secondary }) => (secondary ? '#2d2d3a' : '#fff')};
  font-size: 1.125rem;
  line-height: 1.375rem;
  font-family: Encode Sans;
  font-weight: 600;
  min-width: 20rem;
  text-align: center;
  margin-bottom: 0.875rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${styleInnerButton()} {
    padding: 1rem;
  }

  &:hover {
    ${({ secondary }) =>
      !secondary &&
      `
        color: #fff;
        text-decoration: none;
      `}
  }
`;

const SModalBody = styled(Modal.Body)`
  padding: 2.75rem 1.25rem 1.625rem 1.25rem;
`;

const GlobalModalStyle = createGlobalStyle`
  * {
    overflow: hidden;
  }

  #app {
    filter: blur(20px);
    /* To remove border glow */
    transform: scale(1.15);
  }

  .shortAssayModal {
    max-width: 23rem;
  }
`;
