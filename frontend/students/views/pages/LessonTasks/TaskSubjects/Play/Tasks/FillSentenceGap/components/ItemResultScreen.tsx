import React, { FC, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { motion as m, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IFillSentenceGapItem } from 'students/models';
import { useAudioPlayer } from 'students/views/shared/bundles/audio/hooks';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';

interface IProps {
  item: IFillSentenceGapItem;
  onFinish: () => void;
}

const ItemResultScreen: FC<IProps> = ({ item, onFinish }) => {
  const { audioURL, answers, solution } = item;
  const animationControls = useAnimation();
  const iconControls = useAnimation();
  const isMobile = useBreakPoint('md', true);
  const blocks = item.statement.split('**');
  const incorrectAnswersList = answers.flat().filter((answer) => solution[0] !== answer);

  const handleFinish = useCallback(() => {
    setTimeout(() => {
      onFinish();
    }, DEFAULT_TIMEOUT);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    document.addEventListener('click', onFinish);

    return () => {
      document.removeEventListener('click', onFinish);
    };
  }, []);

  useAudioPlayer({
    src: audioURL || '',
    autoplay: true,
    onEnd: handleFinish,
    onError: handleFinish
  });

  useEffect(() => {
    animationControls.start({
      opacity: 1,
      y: [-100, 0],
      transition: {
        duration: 0.3
      }
    });
  }, [animationControls]);

  useEffect(() => {
    iconControls.start({
      width: isMobile ? 49 : 70,
      height: isMobile ? 49 : 70,
      opacity: 1,
      y: [-50, 0],
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    });
  }, [iconControls, isMobile]);

  return (
    <SResultWrapper>
      <SIconWrapper
        initial={{ width: 125, height: 125, opacity: 0 }}
        animate={iconControls}
      >
        <FontAwesomeIcon size="lg" icon={faCheck} color="#ffffff" />
      </SIconWrapper>

      <SSentence initial={{ opacity: 0 }} animate={animationControls}>
        {blocks.map((block: string, index: number) => (
          <React.Fragment key={index}>
            {block}
            {index < item.answers.length && <SAnswerWord>{item.solution[0]}</SAnswerWord>}
          </React.Fragment>
        ))}
      </SSentence>
      <SIncorrectItemsList initial={{ opacity: 0 }} animate={animationControls}>
        {incorrectAnswersList.map((incorrectAnswer, idx) => (
          <li key={`${item.id}-${idx}`}>{incorrectAnswer}</li>
        ))}
      </SIncorrectItemsList>
    </SResultWrapper>
  );
};

export default React.memo(ItemResultScreen);

const DEFAULT_TIMEOUT = 1500;

const SResultWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${customMediaQuery('tablet')} {
    max-width: 670px;
    width: 100%;
  }
`;

const SSentence = styled(m.h2)`
  color: #fbfcff;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.75rem;
  text-align: center;

  ${customMediaQuery('tablet')} {
    max-width: 670px;
    font-size: 3rem;
    line-height: 3.875rem;
  }
`;

const SAnswerWord = styled.span`
  color: #fbfcff;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.75rem;
  text-align: center;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 3px;
    background: #a92968;
    border-radius: 8px;
  }

  ${customMediaQuery('tablet')} {
    font-size: 3rem;
    line-height: 3.875rem;
  }
`;

const SIconWrapper = styled(m.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, #5cc269 -15.31%, #27a939 137.76%), #1db05b;
  border-radius: 50%;
  width: 49px;
  height: 49px;
  margin: 0 0 16px;

  ${customMediaQuery('tablet')} {
    box-shadow: inset 0px 2px 0px #58cd68, inset 0px -2px 0px #0b9444;
    padding: 20px;
    width: 70px;
    height: 70px;
    margin: 0 0 30px;
  }
`;

const SIncorrectItemsList = styled(m.ul)`
  list-style: none;
  padding: 0;
  margin-top: 6.25rem;
  text-align: center;

  > li {
    font-size: 2.25rem;
    line-height: 2.75rem;
    text-decoration: line-through;
  }

  ${customMediaQuery('tablet')} {
    margin-top: 3.75rem;
  }
`;
