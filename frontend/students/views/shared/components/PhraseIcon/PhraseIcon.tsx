import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { convertHexToRgb } from 'students/views/shared/helpers';

import AnimatedIcon from '../AnimatedIcon';
import UrlIcon from '../UrlIcon';

interface IPhraseIcon {
  imageUrl: string | null;
  animationUrl: string | null;
  colorRequired: boolean;
  text: string;
  className?: string;
  iconClassName?: string;
  width?: string;
  height?: string;
  color?: string;
}

const PhraseIcon: FC<IPhraseIcon> = ({
  imageUrl,
  animationUrl,
  colorRequired,
  text,
  className,
  iconClassName,
  height,
  width,
  color
}) => {
  if (!animationUrl && !imageUrl && !text) return null;

  const renderBody = () => {
    if (animationUrl) {
      return (
        <SFilterWrapper $colorRequired={colorRequired} $color={color}>
          <AnimatedIcon
            animationUrl={animationUrl}
            title={text}
            height={height}
            width={width}
            className={iconClassName}
          />
        </SFilterWrapper>
      );
    } else if (imageUrl) {
      return (
        <SFilterWrapper $colorRequired={colorRequired} $color={color}>
          <UrlIcon
            url={imageUrl}
            title={text}
            height={height}
            width={width}
            className={iconClassName}
          />
        </SFilterWrapper>
      );
    }

    return text;
  };

  return <SWrapper className={cn(className)}>{renderBody()}</SWrapper>;
};

export default PhraseIcon;

const SWrapper = styled.div`
  text-align: center;
`;

/* Solution for painting icons with filters: https://stackoverflow.com/a/62880368 */

const SFilterWrapper = styled.div<{ $colorRequired?: boolean; $color?: string }>`
  display: flex;
  justify-content: center;
  width: 100%;
  filter: ${({ $color, $colorRequired }) =>
      !$color && !$colorRequired ? 'brightness(0) invert(1)' : ''}
    drop-shadow(0 4px 0 rgba(0, 0, 0, 0.14))
    ${({ $color }) =>
      $color
        ? `
      url('data:image/svg+xml;utf8,
        <svg xmlns="http://www.w3.org/2000/svg">
          <filter id="recolor" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="
              0 0 0 0 ${convertHexToRgb($color)?.r || 0}
              0 0 0 0 ${convertHexToRgb($color)?.g || 0}
              0 0 0 0 ${convertHexToRgb($color)?.b || 0}
              0 0 0 ${convertHexToRgb($color) ? 1 : 0} 0
            "/>
          </filter>
        </svg>
      #recolor')
    `
        : ''};
`;
