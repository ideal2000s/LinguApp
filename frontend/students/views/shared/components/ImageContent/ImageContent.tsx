import React from 'react';
import cn from 'classnames';
import styled, { css } from 'styled-components';
import { tGiphyImage } from 'students/models';

interface IProps {
  image?: string | null;
  smallImage?: string | null;
  giphyImage?: tGiphyImage;
  cover?: boolean | null;
  className?: string;
  responsiveGiphy?: boolean;
}

const ImageContent: React.FC<IProps> = ({
  image,
  smallImage,
  giphyImage,
  cover,
  className,
  responsiveGiphy = true
}) => {
  if (image) {
    return (
      <SCoveringContent $cover={cover} className={cn(className)}>
        <picture>
          {!!smallImage && <source media="(max-width: 400px)" srcSet={smallImage} />}
          <img className="mw-100" src={image} alt={''} />
        </picture>
      </SCoveringContent>
    );
  }

  if (giphyImage) {
    return (
      <SGiphyBlock className={cn(className, { responsiveGiphy })}>
        <img className="mw-100" src={giphyImage.originalURL} alt={giphyImage.title} />

        <p>
          <a href={giphyImage.url}>via GIPHY</a>
        </p>
      </SGiphyBlock>
    );
  }

  return null;
};

export default ImageContent;

const SCoveringContent = styled.div<{ $cover?: boolean | null }>`
  padding: ${({ $cover }) => ($cover ? '0' : '24px')};
  padding-bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  picture {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & img {
    ${({ $cover }) =>
      $cover
        ? css`
            object-fit: cover;
            width: 100%;
          `
        : css`
            object-fit: contain;
          `};
    object-position: 50% 50%;
  }

  &,
  picture,
  & img {
    max-height: 232px;
  }
  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    &,
    picture,
    & img {
      max-height: 496px;
    }

    padding: ${({ $cover }) => ($cover ? '0' : '70px')};
    padding-bottom: 0;
  }
`;

const SGiphyBlock = styled.div`
  max-height: 232px;
  margin: 12px auto 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: calc(100% - 24px);

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    &.responsiveGiphy {
      max-height: 496px;
      margin: 70px auto 0;
      max-width: calc(100% - 140px);
    }
  }

  & img {
    object-fit: contain;
    height: 200px;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.linguBptMd}) {
      &.responsiveGiphy {
        height: 450px;
      }
    }
  }
`;
