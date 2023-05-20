import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { AudioPlayer, IProps as IPlayButtonProps } from './AudioPlayer';

interface IProps extends Pick<IPlayButtonProps, 'size'> {
  audio: string | null | undefined;
  className?: string;
}

export const AudioContent: React.FC<IProps> = ({ audio, size, className }) => {
  if (!audio) return null;
  return (
    <SAudionContentContainer className={cn(className)}>
      <AudioPlayer src={audio} size={size || 'md'} />
    </SAudionContentContainer>
  );
};

const SAudionContentContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;
