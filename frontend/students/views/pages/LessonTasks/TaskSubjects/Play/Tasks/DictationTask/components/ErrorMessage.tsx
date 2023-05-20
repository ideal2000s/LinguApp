import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { customMediaQuery } from 'students/views/shared/styled';
import CrossIcon from 'students/views/shared/assets/icons/x-times_icon.svg';

interface IErrorMessage {
  header: string;
  subHeader?: string;
  className?: string;
  onClickNext?: () => void;
}

const ERROR_MESSAGE_VARIANTS = {
  initial: {
    opacity: 0
  },
  appear: {
    opacity: [0, 1],
    transition: {
      opacity: {
        duration: 0.5
      }
    }
  },
  disappear: {
    opacity: [1, 0],
    transition: {
      opacity: {
        duration: 0.5
      }
    }
  }
};

const ErrorMessage: FC<IErrorMessage> = ({
  header,
  subHeader,
  className,
  onClickNext
}) => (
  <AnimatePresence>
    <SWrapper
      variants={ERROR_MESSAGE_VARIANTS}
      initial="initial"
      animate="appear"
      exit="disappear"
      className={cn(className)}
      onClick={onClickNext}
    >
      <SUrlIcon url={CrossIcon} color="#ffffff" />

      <SHeader>{header}</SHeader>

      {subHeader && <SSubHeader>{subHeader}</SSubHeader>}
    </SWrapper>
  </AnimatePresence>
);

export default ErrorMessage;

const SWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
  width: 100%;
  cursor: pointer;
`;

const SUrlIcon = styled(UrlIcon)`
  min-height: 88px;
  min-width: 88px;
  margin-bottom: 24px;

  ${customMediaQuery('tablet')} {
    min-height: 112px;
    min-width: 112px;
    margin-bottom: 18px;
  }
`;

const SHeader = styled.h1`
  color: #ffffff;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.875rem;
  margin: 0 0 16px;
  padding: 0;

  ${customMediaQuery('tablet')} {
    font-size: 3rem;
    line-height: 3.25rem;
    margin: 0 0 28px;
  }
`;

const SSubHeader = styled.h2`
  color: #fbfcff;
  opacity: 0.5;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin: 0;
  padding: 0;

  ${customMediaQuery('tablet')} {
    font-size: 1.5rem;
  }
`;
