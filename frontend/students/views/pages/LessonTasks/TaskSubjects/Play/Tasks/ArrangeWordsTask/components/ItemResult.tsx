import React, { useEffect } from 'react';
import { motion as m, useAnimation } from 'framer-motion';
import styled from 'styled-components';

interface IProps {
  startAnimation: boolean;
  onFinish?: () => void;
  solution: string;
}

const ItemResult: React.FC<IProps> = ({ startAnimation, onFinish, solution }) => {
  const animationControls = useAnimation();

  useEffect(() => {
    animationControls.start({
      opacity: 1,
      transition: {
        duration: 0.5
      }
    });
  }, [animationControls]);

  useEffect(() => {
    async function startFinishAnimation() {
      await animationControls.start({
        y: [0, 350],
        opacity: [1, 0],
        transition: {
          opacity: {
            duration: 0.6
          },
          y: {
            duration: 0.6,
            ease: 'easeInOut'
          }
        }
      });

      onFinish && onFinish();
    }

    if (startAnimation) {
      startFinishAnimation();
    }
  }, [startAnimation, animationControls, onFinish]);

  return (
    <m.div initial={{ opacity: 0 }} animate={animationControls}>
      <SResultWord>{solution}</SResultWord>
    </m.div>
  );
};

const SResultWord = styled.h1`
  color: ${({ theme }) => theme.linguLightFont};
  text-align: center;
`;

export default ItemResult;
