import React from 'react';
import { motion } from 'framer-motion';
import styles from './NodeStage.module.scss';
import NodePoint, { IProps as INodePointProps } from './NodePoint';

export interface IProps {
  nodePoints: {
    id: number;
    text: string;
    x: number;
    y: number;
    status: INodePointProps['status'];
  }[];
  onAnimationComplete: () => void;
  onErrorAnimationComplete?: () => void;
}

const NodePointList: React.FC<IProps> = ({
  nodePoints,
  onAnimationComplete,
  onErrorAnimationComplete = () => {}
}) => {
  return (
    <>
      {nodePoints.map((node, i) => (
        <motion.div
          className={styles.nodesMotionDiv}
          key={node.id}
          variants={pointVariants}
          custom={i}
          animate="appearing"
        >
          <NodePoint
            left={node.x}
            top={node.y}
            text={node.text}
            status={node.status}
            onErrorAnimationComplete={onErrorAnimationComplete}
            onAnimationComplete={onAnimationComplete}
          />
        </motion.div>
      ))}
    </>
  );
};

export default NodePointList;

const pointVariants = {
  appearing: (index: number) => ({
    opacity: [0, 1],
    y: [20, 0],
    transition: {
      delay: index * 0.1,
      ease: 'linear'
    }
  })
};
