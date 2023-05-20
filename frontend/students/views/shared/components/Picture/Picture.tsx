import React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
  src: string | null;
  srcSet?: string;
  alt?: string;
  lazy?: boolean;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const Picture: React.FC<IProps> = ({
  className,
  src,
  srcSet,
  alt,
  onError,
  lazy = false
}) => {
  if (!src) return null;
  return (
    <picture className={className}>
      {srcSet && <source srcSet={srcSet} type="image/webp" />}
      <SImg loading={lazy ? 'lazy' : 'eager'} src={src} alt={alt} onError={onError} />
    </picture>
  );
};

export default Picture;

const SImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
