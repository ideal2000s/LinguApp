import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import UrlIcon from 'students/views/shared/components/UrlIcon/UrlIcon';
import xTimesIcon from 'students/views/shared/assets/icons/x-times_icon.svg';
import rightArrowIcon from 'students/views/shared/assets/icons/arrow_right_icon.svg';
import { SLightButton } from 'students/views/shared/styled';
import { Translate } from 'i18n';
import styles from '../MatchWord.module.scss';

interface IProps {
  onNextClick: () => void;
}

const TimeoutScreen: React.FC<IProps> = ({ onNextClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.resultContainer}
    >
      <div>
        <UrlIcon
          className={styles.inlineBlock}
          url={xTimesIcon}
          height="88px"
          width="88px"
        />
      </div>
      <div className={styles.endPara} style={{ position: 'relative' }}>
        <p style={{ marginBottom: '2rem' }}>
          <Translate str="frontend.games.match_word.time_is_up" />
        </p>
        <p>
          <Translate str="frontend.games.match_word.click_and_move_each_word_to_counterpart" />
        </p>
      </div>
      <div className={styles.nextButtonContainer}>
        <SNextTaskButton onClick={onNextClick}>
          <UrlIcon url={rightArrowIcon} color="#2D2D3A" height="2.5rem" width="2.5rem" />
        </SNextTaskButton>
      </div>
    </motion.div>
  );
};

export default TimeoutScreen;

const SNextTaskButton = styled(SLightButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 6rem;
  height: 6rem;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.2);
`;
