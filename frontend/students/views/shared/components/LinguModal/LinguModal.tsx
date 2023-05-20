import React, { FC, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Modal } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';
import { tAppState } from 'students/stores/rootStore';
import { modalActions } from 'students/stores/modal';

type tProps = {
  modalKey: string;
  preventClose?: boolean;
  preventDefaultModalStyles?: boolean;
  children: (close: () => void) => ReactElement;
} & ConnectedProps<typeof connector>;

const LinguModal: FC<tProps> = ({
  children,
  modalKey,
  close,
  modal,
  preventClose,
  preventDefaultModalStyles
}) => {
  const handleClose = () => {
    close();
  };

  const showModal = modal.show && modal.modalKey === modalKey;

  return (
    <>
      {!preventDefaultModalStyles && <GlobalModalStyle />}

      <Modal
        animation={false}
        show={showModal}
        onHide={preventClose ? null : handleClose}
        centered
        dialogClassName="lingu-modal"
        backdropClassName="lingu-backdrop"
      >
        <Modal.Body>
          <SArticle>{children(handleClose)}</SArticle>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ modal }: tAppState) => {
  return { modal };
};

const mapDispatchToProps = {
  ...modalActions
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LinguModal);

const GlobalModalStyle = createGlobalStyle`
  .lingu-backdrop {
    opacity: 0.5 !important;
  }

  .lingu-modal {  
    .modal-content {
      background: transparent;
      border: none;
      border-radius: 0;
    }
    
    .modal-body {
      padding: 0;
      margin: 0;
    }
  }
`;

const SArticle = styled.article`
  font-family: ${({ theme }) => theme.linguFontFamily};
  padding: 1.5rem;
  min-width: 18.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
