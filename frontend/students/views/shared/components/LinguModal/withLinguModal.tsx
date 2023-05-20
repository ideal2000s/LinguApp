import React, { FC } from 'react';
import LinguModal from './LinguModal';
type tOptions = {
  preventClose?: boolean;
  preventDefaultModalStyles?: boolean;
};
export function withLinguModal(
  modalKey: string,
  options?: tOptions
): <P extends Record<string, any>>(WrappedComponent: React.ComponentType<P>) => FC<P> {
  function wrapper<P extends Record<string, any>>(
    WrappedComponent: React.ComponentType<P>
  ): FC<P> {
    const preventClose = options?.preventClose;
    const preventDefaultModalStyles = options?.preventDefaultModalStyles;

    const hocComponent: FC<P> = ({ ...props }) => (
      <LinguModal
        modalKey={modalKey}
        preventClose={preventClose}
        preventDefaultModalStyles={preventDefaultModalStyles}
      >
        {(close) => <WrappedComponent close={close} {...props} />}
      </LinguModal>
    );

    return hocComponent;
  }

  return wrapper;
}

export type tWithLinguModalProps = {
  close?: () => void;
};
