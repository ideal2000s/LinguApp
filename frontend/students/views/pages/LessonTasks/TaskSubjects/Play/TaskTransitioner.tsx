import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  growingBubbleChanger,
  loadingBubbleChanger
} from 'students/views/shared/bundles/bubbleAnimationManager';
import { SpinnerBlock } from 'students/views/shared/components/Spinner';

interface IProps {
  showBubbleAnimation: boolean;
  loadingOnly: boolean;
}

const TaskTransitioner: React.FC<IProps> = ({ showBubbleAnimation, loadingOnly }) => {
  return (
    <SSpinnerWrapper
      as={motion.div}
      transition={{ duration: showBubbleAnimation ? 0.3 : 0 }}
      exit={{ opacity: 0 }}
    >
      {showBubbleAnimation ? (
        loadingOnly ? (
          loadingBubbleChanger()
        ) : (
          growingBubbleChanger()
        )
      ) : (
        <SpinnerBlock />
      )}
    </SSpinnerWrapper>
  );
};

export default TaskTransitioner;

const SSpinnerWrapper = styled.div`
  position: fixed;
  z-index: 1002;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
