import React, { useCallback, useMemo, useRef, useState, ComponentProps } from 'react';
import styled from 'styled-components';
import _sampleSize from 'lodash/sampleSize';
import WordBlock from './WordBlock';
import { IPlayAuditionItem } from 'students/models/lessonTasks';
import LottieIcon from 'students/views/shared/components/LottieIcon/LottieIcon';

import pulsatingCircleAnimationData from '../assets/pulsatingCircle.json';

type tWordPosition = ComponentProps<typeof WordBlock>['wordPosition'];
type tArea = tWordPosition['area'];

export type tHintStatus = 'none' | 'tap' | 'pulsate';

interface IProps {
  item: IPlayAuditionItem;
  hint: tHintStatus;
  onSuccess: () => void;
  onError: () => void;
}

const WordViewport: React.FC<IProps> = ({ item, onSuccess, onError, hint }) => {
  const { rect, ref: viewportRef } = useClientRect();
  const wordPositions = useScatteredBlocks(rect, item);
  const correctPosition = wordPositions.current[wordPositions.current.length - 1];

  const handleSuccess = () => {
    onSuccess();
  };

  const handleError = () => {
    onError();
  };

  return (
    <SViewport ref={viewportRef}>
      {wordPositions.current.map((wp, key) => (
        <WordBlock
          wordPosition={wp}
          sequence={key}
          key={key}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      ))}
      {hint === 'pulsate' && (
        <SPulsatingCircle
          style={{
            left: correctPosition.area.x + correctPosition.area.width / 2 - CIRCLE_RADIUS,
            top: correctPosition.area.y + correctPosition.area.height / 2 - CIRCLE_RADIUS
          }}
        >
          <LottieIcon
            animationJSONData={pulsatingCircleAnimationData}
            width={`${CIRCLE_RADIUS * 2}px`}
            loop={true}
            autoPlay={true}
          />
        </SPulsatingCircle>
      )}
    </SViewport>
  );
};

export default WordViewport;

const CIRCLE_RADIUS = 96;
const MAX_WORDS_COUNT = 6;

const useClientRect = () => {
  const [rect, setRect] = useState({ width: 0, height: 0 });
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect({ width: node.offsetWidth, height: node.offsetHeight });
    }
  }, []);
  return { rect, ref };
};

const useScatteredBlocks = (
  rect: { width: number; height: number },
  taskItem: IPlayAuditionItem
) => {
  const wordPositions = useRef<Array<tWordPosition>>([]);
  if (wordPositions.current.length === 0) {
    const words = _sampleSize(taskItem.words, MAX_WORDS_COUNT - 1);
    words.push(taskItem.correctWord);
    wordPositions.current = words.map((p) => ({
      word: p,
      area: { x: 0, y: 0, width: 0, height: 0, percentX: 0, percentY: 0 },
      correct: p.body === taskItem.correctWord.body
    }));
  }

  wordPositions.current = useMemo(() => {
    if (rect.width > 0 && rect.height > 0) {
      const words = wordPositions.current;
      const filledAreas: tArea[] = [];
      const maxSearchIterations = 1000;
      const calcOverlap = (a1: tArea) => {
        let overlap = 0;
        for (let i = 0; i < filledAreas.length; i++) {
          const a2 = filledAreas[i];
          // no intersection cases
          if (
            a1.x + a1.width < a2.x ||
            a2.x + a2.width < a1.x ||
            a1.y + a1.height < a2.y ||
            a2.y + a2.height < a1.y
          ) {
            continue;
          }
          // intersection exists : calculate it !
          const x1 = Math.max(a1.x, a2.x);
          const y1 = Math.max(a1.y, a2.y);
          const x2 = Math.min(a1.x + a1.width, a2.x + a2.width);
          const y2 = Math.min(a1.y + a1.height, a2.y + a2.height);
          const intersection = (x1 - x2) * (y1 - y2);
          overlap += intersection;
        }
        return overlap;
      };
      for (let idx = 0; idx < words.length; idx++) {
        let randX = 0,
          randY = 0;
        let smallestOverlap = Number.MAX_VALUE;
        let bestChoice: tArea | undefined;
        for (let i = 0; i < maxSearchIterations; i++) {
          randX = (Math.random() % 1) * 100;
          randY = (Math.random() % 1) * 100;
          const area = {
            x: (randX / 100.0) * rect.width,
            y: (randY / 100.0) * rect.height,
            width: words[idx].ref?.offsetWidth || 0,
            height: words[idx].ref?.offsetHeight || 0,
            percentX: randX,
            percentY: randY
          };
          if (area.x + area.width > rect.width || area.y + area.height > rect.height) {
            i--;
            continue;
          }
          const overlap = calcOverlap(area);
          if (overlap < smallestOverlap) {
            smallestOverlap = overlap;
            bestChoice = area;
          }
          if (overlap === 0) {
            break;
          }
        }
        if (bestChoice) {
          filledAreas.push(bestChoice);
          words[idx].area = bestChoice;
        }
      }
      return words;
    } else {
      return wordPositions.current;
    }
  }, [rect.width, rect.height]);
  return wordPositions;
};

const SViewport = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 400px;
  max-height: 400px;
  margin: auto;
`;

const SPulsatingCircle = styled.div`
  position: absolute;
`;
