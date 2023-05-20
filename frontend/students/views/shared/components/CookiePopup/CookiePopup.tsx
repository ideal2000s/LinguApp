import React, { FC } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Translate } from 'i18n';

import ButtonGeneral, { styleInnerButton } from '../ButtonGeneral/ButtonGeneral';
import useCookieAgreePopup from '../../hooks/useCookieAgreePopup';

const CookiePopup: FC = () => {
  const [show, onAgree] = useCookieAgreePopup();

  return (
    <AnimatePresence>
      {show && (
        <SWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          exit={{ opacity: [1, 0] }}
        >
          <SContainer>
            <SText>
              <Translate str="frontend.cookie_agreement.condition" />
            </SText>

            <SAgreeButton variant="primary" onClick={onAgree as () => void}>
              <Translate str="frontend.cookie_agreement.agree" />
            </SAgreeButton>
          </SContainer>
        </SWrapper>
      )}
    </AnimatePresence>
  );
};

export default CookiePopup;

const SWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2d2d3a;
  z-index: 999;
`;

const SContainer = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SText = styled.h4`
  padding: 0;
  margin: 0 16px 0 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1rem;
  color: #fbfcff;
  overflow-wrap: break-word;
`;

const SAgreeButton = styled(ButtonGeneral)`
  background: linear-gradient(100.99deg, #00bce8 0.59%, #0082b2 99.22%);
  border-radius: 2.25rem;

  ${styleInnerButton()} {
    padding: 0.75rem 1.75rem;
  }
`;
