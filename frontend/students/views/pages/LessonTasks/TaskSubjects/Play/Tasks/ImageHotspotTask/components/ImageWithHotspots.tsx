import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { customMediaQuery } from 'students/views/shared/styled';
import { IPlayImageHotspotItem } from 'students/models';
import PointIcon from './PointIcon';
import { IImage } from '../ImageHotspotItem';

interface IProps {
  attemptsCount: number;
  fullSized: boolean;
  activeIndex: number;
  successfulHotspots: number[];
  hotspots: IPlayImageHotspotItem[];
  image?: IImage;
  onSelectHotspot: (index: number) => void;
}

const IMAGE_MAX_HEIGHT = 480;

const ImageWithHotspots: React.FC<IProps> = ({
  attemptsCount,
  fullSized,
  successfulHotspots,
  activeIndex,
  hotspots,
  image,
  onSelectHotspot
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgContainerCotrols = useAnimation();
  const currentLeftPosition = hotspots[activeIndex].left;

  const imageURL = image?.url;
  const imageInitialWidth = image ? image.size.width : 0;
  const imageInitialHeight = image ? image.size.height : 0;
  const maxImageWidth = useMemo(
    () => (imageInitialWidth / imageInitialHeight) * IMAGE_MAX_HEIGHT,
    [imageInitialWidth, imageInitialHeight]
  );

  const scrolImageTo = useCallback(
    (pos: number) => {
      if (!maxImageWidth || window.innerWidth > maxImageWidth) return;
      const left = (maxImageWidth / 100) * pos - window.innerWidth / 2 + 16;
      imgContainerRef.current?.scrollTo({ left, behavior: 'smooth' });
    },
    [maxImageWidth, imgContainerRef]
  );

  useEffect(() => {
    scrolImageTo(currentLeftPosition);
  }, [scrolImageTo, isZoomed, currentLeftPosition]);

  const zoomTimeout = useRef<number | null>(null);
  useEffect(() => {
    if (!fullSized && !isZoomed) {
      imgContainerCotrols.start('zoom');
      zoomTimeout.current = window.setTimeout(() => setIsZoomed(true), 1000);
    }
    if (fullSized && isZoomed) {
      imgContainerCotrols.start('fullsized');
      setIsZoomed(false);
    }

    return () => {
      if (zoomTimeout.current) clearTimeout(zoomTimeout.current);
    };
  }, [fullSized, isZoomed, imgContainerCotrols]);

  const handleSelectHotspot = (index: number) => {
    if (activeIndex !== index) onSelectHotspot(index);
  };

  return (
    <SContainer
      ref={imgContainerRef}
      initial="fullsized"
      variants={imageContainerVariants}
      animate={imgContainerCotrols}
      transition={{ duration: 0.3 }}
      as={motion.div}
    >
      <SImgWrapper>
        {imageURL && (
          <SImg
            role="image"
            alt={'Image object'}
            variants={{
              fullsized: { width: '90vw', borderRadius: 14 },
              zoom: { width: maxImageWidth, borderRadius: 0 }
            }}
            transition={{ duration: 0.1 }}
            src={imageURL}
            as={motion.img}
          />
        )}
        {!fullSized &&
          hotspots.map(({ top, left }, index) => {
            const succeed = successfulHotspots.includes(index);
            const fails = activeIndex === index ? attemptsCount : 0;
            return (
              <SPoint
                disabled={succeed}
                onClick={() => handleSelectHotspot(index)}
                key={top * left + index}
                top={top}
                left={left}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                as={motion.button}
              >
                <PointIcon
                  active={activeIndex === index}
                  fails={fails}
                  succeed={succeed}
                />
              </SPoint>
            );
          })}
      </SImgWrapper>
    </SContainer>
  );
};

export default ImageWithHotspots;

const imageContainerVariants = {
  fullsized: {
    marginTop: 0,
    width: '90vw',
    borderRadius: 14
  },
  zoom: {
    marginTop: -70,
    width: '100vw',
    borderRadius: 0
  }
};

const SContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: ${`${IMAGE_MAX_HEIGHT}px`};
  border-radius: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  transition: all 0.5s ease;

  ${customMediaQuery('tablet')} {
    transform: none;
    height: 100% !important;
    width: 100% !important;
    margin-top: 0 !important;
    overflow: visible;
  }
`;

const SImgWrapper = styled.div`
  position: relative;
  width: max-content;
  height: max-content;
  max-height: 100%;
  transition: all 0.5s ease;

  ${customMediaQuery('tablet')} {
    display: flex;
    justify-content: center;
    position: relative;
    transform: none !important;
  }
`;

const SImg = styled.img`
  max-height: 480px;
  transition: all 0.5s ease;
  object-fit: contain;

  ${customMediaQuery('tablet')} {
    width: 100% !important;
    border-radius: 14px !important;
    max-width: 670px;
    max-height: 80vh;
  }
`;

const SPoint = styled.button<{
  top: number;
  left: number;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 77px;
  width: 77px;
  transform: translate(-30%, -30%);
  top: ${({ top }) => `${top}%` || '0'};
  left: ${({ left }) => `${left}%` || '0'};
  background: none;
  border: none;

  &:hover,
  &:focus,
  &:active {
    background: none;
    border: none;
    outline: none;
    opacity: 1;
  }
`;
