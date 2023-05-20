import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IPlayArrangeWordsItem } from 'students/models';
import SvgAudioPlayer from 'students/views/shared/components/MediaPlayer/SvgAudioPlayer';
import { customMediaQuery } from 'students/views/shared/styled';

import ItemResult from './ItemResult';

interface IProps {
  item: IPlayArrangeWordsItem;
  onFinish: () => void;
}

const ItemResultScreen: React.FC<IProps> = ({ item, onFinish }) => {
  const { audioURL } = item;

  const handleFinish = useCallback(() => {
    setStartFinalAnimation(true);
  }, []);

  useEffect(() => {
    if (!audioURL) {
      const timer = window.setTimeout(() => handleFinish(), DEFAULT_TIMEOUT);
      return () => clearTimeout(timer);
    }
    return () => null;
  }, [audioURL, handleFinish]);

  const [startFinalAnimation, setStartFinalAnimation] = useState(false);

  if (!item) return null;

  return (
    <SResultWrapper>
      {audioURL && (
        <SSvgAudioPlayer
          src={audioURL}
          autoplay
          color="#639cd4"
          progressColor="#ffffff"
          onEnd={handleFinish}
          $hidden={startFinalAnimation}
        />
      )}
      <ItemResult
        startAnimation={startFinalAnimation}
        onFinish={onFinish}
        solution={item.solution}
      />
    </SResultWrapper>
  );
};

export default React.memo(ItemResultScreen);

const DEFAULT_TIMEOUT = 500;

const SResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const SSvgAudioPlayer = styled(SvgAudioPlayer)<{ $hidden: boolean }>`
  width: 40px;
  height: 40px;
  margin-bottom: 2rem;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};

  ${customMediaQuery('tablet')} {
    width: 61px;
    height: 61px;
    margin-bottom: 3.6rem;
  }
`;
