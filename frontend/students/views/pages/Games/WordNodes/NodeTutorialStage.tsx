import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './NodeStage.module.scss';

import handIcon from './assets/hand.svg';
import greenCheckIcon from './assets/green-check.svg';

import UrlIcon from 'students/views/shared/components/UrlIcon';
import TutorialExplainer from './TutorialExplainer';
import { useNodeViewport } from './hooks';
import NodePointList from './NodePointList';

const NEXT_QUESTION_TIMEOUT = 2000;
const POINTER_ICON_OFFSET = {
  x: 43,
  y: 10
};

export interface IProps {
  question: string;
  nodes: string[];
  answer: string;
  onComplete: () => void;
}

const NodeTutorialStage: React.FC<IProps> = ({ question, nodes, answer, onComplete }) => {
  const [gameStatus, setGameStatus] = useState<'playing' | 'succeeded'>('playing');
  const [connectedNodes, setConnectedNodes] = useState<number[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { origin, nodePoints, pathData, linkedString } = useNodeViewport(
    viewportRef,
    nodes,
    answer,
    connectedNodes
  );

  useEffect(() => {
    if (gameStatus === 'succeeded') {
      const timer2 = window.setTimeout(() => onComplete(), NEXT_QUESTION_TIMEOUT);
      return () => clearTimeout(timer2);
    }
    return () => null;
  }, [gameStatus, onComplete]);

  const lineData =
    nodePoints.length > 0
      ? `M ${nodePoints[0].x + origin.x} ${nodePoints[0].y + origin.y} L ${
          nodePoints[1].x + origin.x
        } ${nodePoints[1].y + origin.y} `
      : '';

  const onAnimationComplete = () => {
    if (answer === linkedString) {
      setGameStatus('succeeded');
    }
  };
  const onTutorialStart = () => {
    setTimeout(() => setConnectedNodes([0]), 2000);
  };
  const onTutorialEnd = () => {
    setConnectedNodes([0, 1]);
  };

  return (
    <div className={styles.container}>
      <div>
        <TutorialExplainer onComplete={onComplete} />
        {gameStatus !== 'playing' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>
              <UrlIcon
                url={greenCheckIcon}
                className={styles.inlineBlock}
                width="50px"
                height="50px"
              />
            </div>
            <p className={styles.question}>{answer}</p>
            <p className={styles.weakText}>{question}</p>
          </motion.div>
        )}
      </div>
      {gameStatus === 'playing' && (
        <>
          <div className={styles.nodesViewport} ref={viewportRef}>
            <div className={styles.nodesContainer}>
              <NodePointList
                nodePoints={nodePoints.map((node, i) => ({
                  ...node,
                  status: connectedNodes.indexOf(i) > -1 ? 'success' : ''
                }))}
                onAnimationComplete={onAnimationComplete}
              />
            </div>
          </div>
          <motion.div className={styles.drawingBox}>
            <svg className={styles.drawingSvg}>
              <path className={styles.links} d={pathData} />
              {lineData && (
                <motion.path
                  className={styles.line}
                  d={lineData}
                  initial={{ pathLength: 0, strokeDasharray: '0 2400px' }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 2 }}
                  onAnimationStart={onTutorialStart}
                  onAnimationComplete={onTutorialEnd}
                />
              )}
            </svg>
            {lineData && (
              <motion.div
                className={styles.handContainer}
                animate={{
                  left: [
                    origin.x,
                    origin.x,
                    nodePoints[0].x + origin.x - POINTER_ICON_OFFSET.x,
                    nodePoints[1].x + origin.x - POINTER_ICON_OFFSET.x
                  ],
                  top: [
                    origin.y,
                    origin.y,
                    nodePoints[0].y + origin.y - POINTER_ICON_OFFSET.y,
                    nodePoints[1].y + origin.y - POINTER_ICON_OFFSET.y
                  ]
                }}
                transition={{ duration: 4, times: [0, 0.25, 0.5, 1] }}
              >
                <UrlIcon url={handIcon} width="90px" height="90px" />
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default NodeTutorialStage;
