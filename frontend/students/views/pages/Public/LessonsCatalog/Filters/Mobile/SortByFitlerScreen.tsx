import React, { forwardRef, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { Translate } from 'i18n';
import { useOutsideClick } from 'students/views/shared/hooks';

import SortByFilter from '../../components/SortByFilter';

interface ISortByFilterInput {
  onClose: () => void;
  className?: string;
}

const SortByFilterScreen = forwardRef<HTMLDivElement | null, ISortByFilterInput>(
  function ({ onClose, className }, _ref) {
    const filterRef = useRef(null);

    useOutsideClick(filterRef, onClose, []);

    const wrapperVariants = {
      initial: {
        background: 'rgba(255, 255, 255, 0)'
      },
      appear: {
        background: 'rgba(246, 247, 251, 0.8)'
      },
      disappear: {
        background: 'rgba(255, 255, 255, 0)'
      }
    };

    const filterVariants = {
      initial: {
        y: 200
      },
      appear: {
        y: [200, 0]
      },
      disappear: {
        y: 200
      }
    };

    return (
      <AnimatePresence>
        <SWrapper
          className={cn(className)}
          initial="initial"
          animate="appear"
          exit="disappear"
          variants={wrapperVariants}
        >
          <SFilterWrapper
            ref={filterRef}
            initial="initial"
            animate="appear"
            exit="disappear"
            variants={filterVariants}
          >
            <SHeader>
              <Translate str="frontend.course.sort_by" />
            </SHeader>

            <SSortByFilter onClose={() => null} triggerRef={null} />
          </SFilterWrapper>
        </SWrapper>
      </AnimatePresence>
    );
  }
);

export default SortByFilterScreen;

const SWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const SFilterWrapper = styled(motion.div)`
  z-index: 11;
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px 16px 0 0;

  & > div {
    box-shadow: none;
    background: transparent;
    width: 100%;
    padding: 0;

    & > div {
      margin: 0 0 16px;
    }
  }
`;

const SHeader = styled.p`
  color: #a7aab6;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1rem;
  padding: 0;
  margin: 0 0 12px;
`;

const SSortByFilter = styled(SortByFilter)``;
