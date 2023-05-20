import React, { useEffect, useRef, useState } from 'react';
import { PanInfo, TapInfo } from 'framer-motion';
import { IPhrase } from 'students/models';
import { playSound, useGameAudioPlayer } from '../../common/helpers';
import { SViewport } from './styled';
import MatchWordBlock from './MatchWordBlock';

interface IArea {
  width: number;
  height: number;
  x: number;
  y: number;
  percentX: number;
  percentY: number;
}

export interface IWordPosition {
  origin: boolean;
  phrase: IPhrase;
  ref?: HTMLElement | null;
  area: IArea;
}

export interface IWordAnswer {
  word: string;
  solved: boolean;
}
interface IProps {
  phrases: IPhrase[];
  onComplete: () => void;
  onRoundComplete: (payload: IWordAnswer) => void;
}
interface IItemMatch {
  status: '' | 'correct' | 'incorrect';
  first: number;
  second: number;
}
const MatchWordViewport: React.FC<IProps> = ({
  phrases,
  onRoundComplete,
  onComplete
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hoveringIndex, setHoveringIndex] = useState(-1);
  const [matchedWords, setMatchedWords] = useState<number[]>([]);
  const [itemMatch, setItemMatch] = useState<IItemMatch>({
    status: '',
    first: -1,
    second: -1
  });
  const wordPositions = useDraggableBlocks(viewportRef, phrases);
  const { playCorrectSound, playIncorrectSound } = useGameAudioPlayer();

  const getHoveringIndex = (x: number, y: number) => {
    for (let i = 0; i < wordPositions.current.length; i++) {
      if (
        x >= wordPositions.current[i].area.x &&
        x <= wordPositions.current[i].area.x + wordPositions.current[i].area.width &&
        y >= wordPositions.current[i].area.y &&
        y <= wordPositions.current[i].area.y + wordPositions.current[i].area.height
      ) {
        return i;
      }
    }
    return -1;
  };

  const onDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    _index: number
  ) => {
    if (selectedIndex !== -1 && viewportRef.current) {
      const offset = {
        x:
          (viewportRef.current.getBoundingClientRect().left || 0) +
          document.documentElement.scrollLeft,
        y:
          (viewportRef.current.getBoundingClientRect().top || 0) +
          document.documentElement.scrollTop
      };
      const hoveringIndex = getHoveringIndex(
        info.point.x - offset.x,
        info.point.y - offset.y
      );
      if (hoveringIndex !== selectedIndex) setHoveringIndex(hoveringIndex);
    }
  };

  const onDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    _info: PanInfo,
    _index: number
  ) => {
    let isCorrect = false;
    const selectedWord = wordPositions.current[selectedIndex];
    if (hoveringIndex !== -1) {
      isCorrect =
        wordPositions.current[selectedIndex].phrase.id ===
        wordPositions.current[hoveringIndex].phrase.id;
      setHoveringIndex(-1);
      onRoundComplete({
        word: selectedWord.phrase.body,
        solved: isCorrect
      });
      if (isCorrect) {
        setItemMatch({ status: 'correct', first: selectedIndex, second: hoveringIndex });
        setMatchedWords([...matchedWords, hoveringIndex, selectedIndex]);
        playCorrectSound();
      } else {
        setItemMatch({
          status: 'incorrect',
          first: selectedIndex,
          second: hoveringIndex
        });
        playIncorrectSound();
      }
    } else if (selectedIndex !== -1) {
      setItemMatch({ status: 'incorrect', first: selectedIndex, second: -1 });
    }
    setSelectedIndex(-1);
  };

  const onBlockAnimationComplete = (index: number) => {
    if (itemMatch.status !== '') {
      if (itemMatch.status !== 'correct' || itemMatch.first !== index) {
        setItemMatch({ status: '', first: -1, second: -1 });
        if (matchedWords.length >= phrases.length * 2) onComplete();
      }
    }
  };

  const onTapWord = (
    mouseEvent: MouseEvent | TouchEvent | PointerEvent,
    info: TapInfo,
    index: number
  ) => {
    const wordSound = wordPositions.current[index].phrase.audioURL;
    if (!wordPositions.current[index].origin && wordSound) {
      playSound(wordSound);
    }
  };

  return (
    <SViewport ref={viewportRef}>
      {wordPositions.current.map((word, key) => {
        let animateTarget = selectedIndex !== -1 ? '' : 'visible';
        if (itemMatch.status === 'correct') {
          animateTarget =
            itemMatch.first === key
              ? 'correct1'
              : itemMatch.second === key
              ? 'correct2'
              : '';
        } else if (itemMatch.status === 'incorrect') {
          animateTarget =
            itemMatch.first === key
              ? 'incorrect1'
              : itemMatch.second === key
              ? 'incorrect2'
              : '';
        }
        return (
          <MatchWordBlock
            key={key}
            isHovering={hoveringIndex === key}
            isSelected={selectedIndex === key}
            animateTarget={animateTarget}
            sequence={key}
            word={word}
            onItemDrag={onDrag}
            onItemDragStart={onDragStart}
            onItemDragEnd={onDragEnd}
            onItemTap={onTapWord}
            onItemAnimationComplete={onBlockAnimationComplete}
          />
        );
      })}
    </SViewport>
  );
};

export default MatchWordViewport;

const useDraggableBlocks = (
  viewportRef: React.RefObject<HTMLElement>,
  phrases: IPhrase[]
) => {
  const [_dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const wordPositions = useRef<Array<IWordPosition>>([]);
  useEffect(() => {
    const getDimensions = () => ({
      width: viewportRef.current?.offsetWidth || 0,
      height: viewportRef.current?.offsetHeight || 0
    });
    if (viewportRef.current) {
      const { width, height } = getDimensions();

      const words = wordPositions.current;
      const filledAreas: IArea[] = [];
      const maxSearchIterations = 1000;
      const calcOverlap = (a1: IArea) => {
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
        let bestChoice: IArea | undefined;
        for (let i = 0; i < maxSearchIterations; i++) {
          randX = (Math.random() % 1) * 100;
          randY = (Math.random() % 1) * 100;
          const area = {
            x: (randX / 100.0) * width,
            y: (randY / 100.0) * height,
            width: words[idx].ref?.offsetWidth || 0,
            height: words[idx].ref?.offsetHeight || 0,
            percentX: randX,
            percentY: randY
          };
          if (area.x + area.width > width || area.y + area.height > height) {
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
      wordPositions.current = words;

      setDimensions(getDimensions());
    }
  }, [viewportRef]);

  if (wordPositions.current.length === 0) {
    wordPositions.current = phrases
      .map((p) => [
        { phrase: p, origin: true },
        { phrase: p, origin: false }
      ])
      .flat()
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => {
        return {
          phrase: a.value.phrase,
          origin: a.value.origin,
          area: { x: 0, y: 0, width: 0, height: 0, percentX: 0, percentY: 0 }
        };
      });
  }
  return wordPositions;
};
