import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import cn from 'classnames';

export interface ISpinnerProps {
  loading?: boolean;
  className?: string;
}

const Spinner: FC<ISpinnerProps> = ({ loading = true, className }) => {
  const wrapperControls = useAnimation();
  const dotControls = useAnimation();

  useEffect(() => {
    if (loading) {
      dotControls.start((props) => ({
        x: 0,
        y: [0, -8, 0, 8, 0],
        transition: {
          x: {
            duration: 0.4
          },
          y: {
            type: 'Inertia',
            ease: 'easeInOut',
            duration: 1,
            delay: 0.4 + props.index * 0.08,
            loop: Infinity
          }
        }
      }));
    } else {
      wrapperControls.start({
        opacity: [1, 0],
        transition: {
          opacity: { duration: 0.4, delay: 0.4 }
        }
      });

      dotControls.start((props) => ({
        x: props.x,
        y: 0,
        opacity: [1, 0],
        transition: {
          duration: 0.4,
          opacity: {
            duration: 0.3,
            delay: 0.4
          }
        }
      }));
    }
  }, [loading, dotControls, wrapperControls]);

  return (
    <Wrapper className={cn(className)}>
      <SDot animate={dotControls} initial={{ x: 12 }} custom={{ index: 1, x: 12 }} />
      <SDot animate={dotControls} initial={{ x: 0 }} custom={{ index: 2, x: 0 }} />
      <SDot animate={dotControls} initial={{ x: -12 }} custom={{ index: 3, x: -12 }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SDot = styled(motion.div)`
  background-color: ${({ theme }) => theme.indigo};
  width: 8px;
  height: 8px;
  margin: 2px;
  border-radius: 100%;
`;

export default Spinner;
