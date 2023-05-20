import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { IPlayImageObjectItem } from 'students/models/lessonTasks';
import SvgAudioPlayer from 'students/views/shared/components/MediaPlayer/SvgAudioPlayer';
import { getElementTargetPosition } from '../../common/helpers';
import successPoint from './assets/SuccessPoint.svg';
import {
  SItemContainer,
  SHeadContainer,
  SBodyContainer,
  SImgContainer,
  SImg,
  SInstruction,
  SSuccessPoint,
  SAudioPlayer
} from './components/styled';
import { usePlayAudioPlayer } from '../../common/hooks';
import { PointFailAnimated, PointSuccessAnimated } from './components';
import { useAnimateScenarios, useBreakPoint } from 'students/views/shared/hooks';
import { animationScenarios } from './assets/animation/scenarios';

export interface ISelectAnswerPayload {
  itemId: number;
  attemptsCount: number;
}

export interface IPointOptions {
  top: number;
  left: number;
}

const iconSize = {
  height: 8,
  width: 8
};

const iconMobileSize = {
  height: 4,
  width: 4
};

interface IProps {
  item: IPlayImageObjectItem;
  points: IPointOptions[];
  imageURL: string | null;
  imageSize: { height: number; width: number } | null;
  currentIndex?: number;
  className?: string;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
}

const ImageObjectItem: React.FC<IProps> = ({
  currentIndex = 0,
  item,
  points,
  onSelectAnswer,
  imageURL,
  imageSize,
  className
}) => {
  const pickEnabledRef = useRef(true);
  const [wrongAnswer, setWrongAnswer] = useState<IPointOptions | null>(null);
  const [successAnswer, setSuccessAnswer] = useState<IPointOptions | null>(null);
  const attemptsCountRef = useRef<number>(0);
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();
  const isMobile = useBreakPoint('sm', true);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);

  const [instructionControls, animateInstructionControls] = useAnimateScenarios(
    animationScenarios
  );
  const [audioControls, animateAudioControls] = useAnimateScenarios(animationScenarios);
  const [bodyControls, animateBodyControls] = useAnimateScenarios(animationScenarios);
  const [imageControls, animateImageControls] = useAnimateScenarios(animationScenarios);

  const imageHeight = imageSize?.height;
  const imageWidth = imageSize?.width;
  const imageContainerHeight = imgContainerRef.current?.offsetHeight;

  const [maxImageHeight, maxImageWidth] = useMemo(() => {
    if (!imageWidth || !imageHeight || !imageContainerHeight) return [0, 0];
    const width = (imageWidth / imageHeight) * imageContainerHeight;
    const height = imageContainerHeight;
    return [height, width];
  }, [imageHeight, imageWidth, imageContainerHeight]);

  // Animate header
  useEffect(() => {
    const scenario = 0 === currentIndex ? 'header-initial' : 'header-regular';
    if (item.audioURL) {
      animateAudioControls([scenario]);
    } else {
      animateInstructionControls([scenario]);
    }
  }, [
    animateAudioControls,
    animateInstructionControls,
    currentIndex,
    item.audioURL,
    item.instruction
  ]);

  // Center image
  const scrollImageToCenter = useCallback(() => {
    const container = imgContainerRef.current;
    if (!container) return;
    container.scrollTo({
      left: maxImageWidth / 2 - window.innerWidth / 2,
      behavior: 'smooth'
    });
  }, [maxImageWidth]);

  // Animate body
  useEffect(() => {
    animateBodyControls(['body-appear', isMobile ? 'body-zoomed' : 'body-default']);
    if (isMobile) {
      animateImageControls(
        [
          2,
          {
            height: maxImageHeight,
            width: maxImageWidth,
            transition: { type: 'Inertia', duration: 1 }
          }
        ],
        scrollImageToCenter
      );
    }
  }, [
    animateBodyControls,
    animateImageControls,
    scrollImageToCenter,
    maxImageHeight,
    maxImageWidth,
    isMobile
  ]);

  const autoPlayDelay = 0 === currentIndex ? 2200 : 1200;
  const currentIconSize = isMobile ? iconMobileSize : iconSize;

  const hideHeaderAnimation = () => {
    if (item.audioURL) animateAudioControls(['header-hidden']);
    else animateInstructionControls(['header-hidden']);
  };

  const processCorrectAnswer = () => {
    playCorrectSound();

    pickEnabledRef.current = false;

    setWrongAnswer(null);
    setSuccessAnswer({
      top: item.top + item.height / 2,
      left: item.left + item.width / 2
    });
    hideHeaderAnimation();

    setTimeout(() => {
      setSuccessAnswer(null);
      pickEnabledRef.current = true;

      onSelectAnswer({
        itemId: item.id,
        attemptsCount: attemptsCountRef.current
      });
    }, 1000);
  };

  const processWrongAnswer = (payload: IPointOptions) => {
    playIncorrectSound();

    attemptsCountRef.current += 1;
    setSuccessAnswer(null);
    setWrongAnswer(payload);
  };

  const handleClick = (event: React.MouseEvent): void => {
    if (!pickEnabledRef.current) {
      return;
    }

    const [targetX, targetY] = getElementTargetPosition(event);

    const [topX, topY, bottomX, bottomY] = [
      item.left,
      item.top,
      item.left + item.width,
      item.top + item.height
    ];

    if (targetX >= topX && targetX <= bottomX && targetY >= topY && targetY <= bottomY) {
      processCorrectAnswer();
    } else {
      processWrongAnswer({ top: targetY, left: targetX });
    }
  };

  return (
    <SItemContainer className={cn(className)}>
      <SHeadContainer>
        <AnimatePresence>
          {!item.audioURL ? (
            <SInstruction
              as={motion.div}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={instructionControls}
              exit={{
                opacity: 0,
                scale: 1.5,
                transition: { type: 'Inertia', duration: 0.5, delay: 0.5 }
              }}
            >
              {item.instruction}
            </SInstruction>
          ) : (
            <SAudioPlayer
              as={motion.div}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={audioControls}
              exit={{
                opacity: 0,
                scale: 1.5,
                transition: { type: 'Inertia', duration: 0.5, delay: 0.5 }
              }}
            >
              <SvgAudioPlayer
                src={item.audioURL}
                autoPlayDelay={autoPlayDelay}
                color="#639cd4"
                progressColor="#ffffff"
              />
            </SAudioPlayer>
          )}
        </AnimatePresence>
      </SHeadContainer>

      <SBodyContainer
        layout="position"
        ref={imgContainerRef}
        as={motion.div}
        initial={{
          x: 0,
          y: -40,
          opacity: 0
        }}
        animate={bodyControls}
      >
        <SImgContainer as={motion.div} animate={imageControls}>
          {!!imageURL && (
            <SImg
              onClick={handleClick}
              role="image"
              src={imageURL}
              alt={'Image object'}
            />
          )}

          {!!wrongAnswer && (
            <PointFailAnimated coordinates={wrongAnswer} size={currentIconSize} />
          )}

          {!!successAnswer && (
            <PointSuccessAnimated coordinates={successAnswer} size={currentIconSize} />
          )}

          {points.map(({ top, left }) => {
            return (
              <SSuccessPoint
                key={top * left}
                src={successPoint}
                top={top}
                left={left}
                height={currentIconSize.height}
                width={currentIconSize.width}
              />
            );
          })}
        </SImgContainer>
      </SBodyContainer>
    </SItemContainer>
  );
};

export default ImageObjectItem;
