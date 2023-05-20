import React, { useRef, useMemo } from 'react';
import { useContainerDimensions } from '../common/helpers';

const toRadians = (angle: number) => {
  return angle * (Math.PI / 180);
};

const useScatteredPoints = (
  viewportRef: React.RefObject<HTMLElement>,
  nodes: string[]
) => {
  const startAngle = useRef(Math.random() * 360);
  const { width, height } = useContainerDimensions(viewportRef, true);

  const nodePoints = useMemo(() => {
    // Recalculate position of every nodes whenever the viewport width/height are changed
    // The calculated points here are relative coordinates to the center of the container
    const nPoints: { id: number; text: string; x: number; y: number }[] = [];
    if (height > 0) {
      const RADIUS_PADDING = 48;
      const POINTS_IN_A_CIRCLE = 5;
      const gap = 360 / Math.min(nodes.length, POINTS_IN_A_CIRCLE);
      let angle = startAngle.current;
      let radius = height / 2 - RADIUS_PADDING;
      nodes.forEach((node: string, index: number) => {
        // After arranging points around the circle one time,
        // we modify the start angle and radius so that the points cannot be overlapped
        if (index > 0 && index % POINTS_IN_A_CIRCLE === 0) {
          angle -= gap / 2;
          radius = (radius * 2) / 3;
        }
        nPoints.push({
          id: index,
          text: node,
          x: ((Math.sin(toRadians(angle)) * radius) / height) * width + width / 2,
          y: Math.cos(toRadians(angle)) * radius + height / 2
        });
        angle += gap;
      });
    }
    return nPoints;
  }, [width, height, nodes]);

  const origin = { x: 0, y: 0 };
  if (viewportRef.current) {
    origin.x =
      viewportRef.current.getBoundingClientRect().left +
      document.documentElement.scrollLeft;
    origin.y =
      viewportRef.current.getBoundingClientRect().top +
      document.documentElement.scrollTop;
  }

  return { width, height, origin, nodePoints };
};

export const useNodeViewport = (
  viewportRef: React.RefObject<HTMLElement>,
  nodes: string[],
  answer: string,
  connectedNodes: number[]
): {
  width: number;
  height: number;
  origin: { x: number; y: number };
  nodePoints: { id: number; text: string; x: number; y: number }[];
  pathData: string;
  linkedString: string;
  completedParts: string[];
} => {
  const { width, height, origin, nodePoints } = useScatteredPoints(viewportRef, nodes);

  const [pathData, linkedString, completedParts] = useMemo(() => {
    let cPathData = '';
    const cLinkedString = connectedNodes.map((idx) => nodePoints[idx].text).join('');
    let cCompletedParts: string[] = [];
    const drawingNodes = [...connectedNodes];
    if (!answer.startsWith(cLinkedString)) drawingNodes.pop();
    if (drawingNodes.length) {
      cPathData =
        'M ' +
        drawingNodes
          .map((idx) => {
            return `${origin.x + nodePoints[idx].x} ${origin.y + nodePoints[idx].y}`;
          })
          .join(' L ');
      cCompletedParts = drawingNodes.map((idx) => nodePoints[idx].text);
      if (!answer.startsWith(cCompletedParts.join(''))) cCompletedParts = [];
    }
    return [cPathData, cLinkedString, cCompletedParts];
  }, [connectedNodes, answer, origin, nodePoints]);

  return {
    width,
    height,
    origin,
    nodePoints,
    pathData,
    linkedString,
    completedParts
  };
};
