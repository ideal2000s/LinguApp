import React, { useState, useEffect, useRef } from 'react';
import { motion, PanInfo, TapInfo } from 'framer-motion';
import { IProps as INodePointProps } from './NodePoint';
import styles from './NodeStage.module.scss';
import { useNodeViewport } from './hooks';

import { IPhrase } from 'students/models';
import PhraseIcon from 'students/views/shared/components/PhraseIcon';
import ProgressiveText from './ProgressiveText';
import NodePointList from './NodePointList';

const NEXT_QUESTION_TIMEOUT = 2000;
const QUESTION_SHOW_DELAY = 2000;

export interface IProps {
  question: string;
  nodes: string[];
  answer: string;
  phrase?: IPhrase;
  onComplete: () => void;
}

const NodeStage: React.FC<IProps> = ({ question, nodes, answer, phrase, onComplete }) => {
  const [gameStatus, setGameStatus] = useState<'init' | 'playing' | 'succeeded'>('init');
  const [connectedNodes, setConnectedNodes] = useState<number[]>([]);
  const [potentialNode, setPotentialNode] = useState(-1);
  const [line, setLine] = useState({ x1: 0, y1: 0, x2: 0, y2: 0, isDrawing: false });
  const viewportRef = useRef<HTMLDivElement>(null);
  const {
    height,
    origin,
    nodePoints,
    pathData,
    linkedString,
    completedParts
  } = useNodeViewport(viewportRef, nodes, answer, connectedNodes);

  useEffect(() => {
    if (potentialNode !== -1) {
      const potentialString = connectedNodes
        .concat(potentialNode)
        .map((idx) => nodePoints[idx].text)
        .join('');
      if (answer.startsWith(potentialString)) {
        setConnectedNodes((prevArray) => [...prevArray, potentialNode]);
        setLine({
          x1: origin.x + nodePoints[potentialNode].x,
          y1: origin.y + nodePoints[potentialNode].y,
          x2: origin.x + nodePoints[potentialNode].x,
          y2: origin.y + nodePoints[potentialNode].y,
          isDrawing: true
        });
        setPotentialNode(-1);
      }
    }
  }, [potentialNode, answer, origin, connectedNodes, nodePoints]);

  useEffect(() => {
    let timeout: number | undefined = undefined;

    switch (gameStatus) {
      case 'init':
        timeout = window.setTimeout(() => setGameStatus('playing'), QUESTION_SHOW_DELAY);
        break;
      case 'succeeded':
        timeout = window.setTimeout(() => onComplete(), NEXT_QUESTION_TIMEOUT);
        break;
      default:
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [gameStatus, onComplete]);

  const lineData = line.isDrawing
    ? `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`
    : '';

  const triggerResize = () => {
    if (height <= 0) {
      window.dispatchEvent(new Event('resize'));
    }
  };

  const getNearPoint = (mouseX: number, mouseY: number): number => {
    for (let i = 0; i < nodePoints.length; i++) {
      const point = nodePoints[i];
      if (nearPoint(origin.x + point.x, origin.y + point.y, mouseX, mouseY)) {
        return i;
      }
    }
    return -1;
  };

  const handleMouseDown = (
    mouseEvent: MouseEvent | TouchEvent | PointerEvent,
    info: TapInfo
  ) => {
    if (nodePoints.length === 0) {
      return;
    }
    let startPointIndex = -1;
    if (connectedNodes.length === 0) {
      startPointIndex = getNearPoint(info.point.x, info.point.y);
    } else if (answer.startsWith(linkedString)) {
      const lastPoint = nodePoints[connectedNodes[connectedNodes.length - 1]];
      if (
        nearPoint(
          origin.x + lastPoint.x,
          origin.y + lastPoint.y,
          info.point.x,
          info.point.y
        )
      ) {
        startPointIndex = connectedNodes[connectedNodes.length - 1];
      }
    }
    if (startPointIndex !== -1) {
      setLine({
        x1: origin.x + nodePoints[startPointIndex].x,
        y1: origin.y + nodePoints[startPointIndex].y,
        x2: origin.x + nodePoints[startPointIndex].x,
        y2: origin.y + nodePoints[startPointIndex].y,
        isDrawing: true
      });
      if (connectedNodes.length === 0)
        setConnectedNodes((prevArray) => [...prevArray, startPointIndex]);
    }
  };

  const handleMouseMove = (
    mouseEvent: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!line.isDrawing) {
      return;
    }
    setLine((old) => ({
      x1: old.x1,
      y1: old.y1,
      x2: info.point.x,
      y2: info.point.y,
      isDrawing: true
    }));
    const pointIndex = getNearPoint(info.point.x, info.point.y);
    if (pointIndex !== -1 && connectedNodes.indexOf(pointIndex) === -1) {
      setPotentialNode(pointIndex);
    } else if (potentialNode !== -1) {
      setPotentialNode(-1);
    }
  };

  const handleMouseUp = (
    mouseEvent: MouseEvent | TouchEvent | PointerEvent,
    info: TapInfo
  ) => {
    if (!line.isDrawing) {
      return;
    }
    const pointIndex = getNearPoint(info.point.x, info.point.y);
    if (pointIndex !== -1 && connectedNodes.indexOf(pointIndex) === -1) {
      setConnectedNodes((prevArray) => [...prevArray, pointIndex]);
    } else {
      if (connectedNodes.length === 1) setConnectedNodes([]);
    }
    setLine({
      x1: line.x1,
      y1: line.y1,
      x2: info.point.x,
      y2: info.point.y,
      isDrawing: false
    });
    setPotentialNode(-1);
  };

  const onAnimationComplete = () => {
    if (answer === linkedString) {
      setGameStatus('succeeded');
    }
  };
  const onPictureClick = () => {
    if (gameStatus === 'succeeded') {
      onComplete();
    }
  };
  const onErrorAnimationComplete = () => {
    if (line.isDrawing) return;
    if (connectedNodes.length > 2) {
      const temp = [...connectedNodes];
      temp.pop();
      setConnectedNodes(temp);
    } else {
      setConnectedNodes([]);
    }
  };

  const getPointStatus = (idx: number): INodePointProps['status'] => {
    let status: INodePointProps['status'] = '';
    if (potentialNode === idx) {
      status = 'potential';
    } else if (connectedNodes.length > 0) {
      if (connectedNodes[connectedNodes.length - 1] === idx) {
        if (answer.startsWith(linkedString)) {
          status = 'success';
        } else {
          status = 'error';
        }
      } else if (connectedNodes.indexOf(idx) > -1) {
        status = 'selected';
      }
    }
    return status;
  };

  return (
    <div className={styles.container}>
      <motion.div
        layout
        onLayoutAnimationComplete={triggerResize}
        transition={{ duration: 1 }}
        className={styles.questionContainer}
        onTap={onPictureClick}
      >
        {phrase && (
          <PhraseIcon
            imageUrl={phrase.imageURL}
            colorRequired={phrase.colorRequired}
            animationUrl={phrase.animationURL}
            text=""
            width="100px"
            height="100px"
          />
        )}
        <p className={styles.question}>
          {gameStatus !== 'succeeded' ? question : answer}
        </p>
        <p className={styles.weakText}>
          {gameStatus !== 'succeeded' ? (
            <ProgressiveText syllables={completedParts} />
          ) : (
            question
          )}
          {'\u00A0'}
        </p>
      </motion.div>
      {gameStatus === 'playing' && (
        <>
          <div className={styles.nodesViewport} ref={viewportRef}>
            <div className={styles.nodesContainer}>
              <NodePointList
                nodePoints={nodePoints.map((node, i) => ({
                  ...node,
                  status: getPointStatus(i)
                }))}
                onErrorAnimationComplete={onErrorAnimationComplete}
                onAnimationComplete={onAnimationComplete}
              />
            </div>
          </div>
          <motion.div
            className={styles.drawingBox}
            onTapStart={handleMouseDown}
            onPan={handleMouseMove}
            onTap={handleMouseUp}
          >
            <svg className={styles.drawingSvg}>
              <path className={styles.links} d={pathData} />
              <path className={styles.line} d={lineData} />
            </svg>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default NodeStage;

const nearPoint = (pointX: number, pointY: number, mouseX: number, mouseY: number) => {
  const margin = 30;
  if (
    pointX - margin < mouseX &&
    pointX + margin > mouseX &&
    pointY - margin < mouseY &&
    pointY + margin > mouseY
  ) {
    return true;
  } else {
    return false;
  }
};
