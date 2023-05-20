import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

interface IProps {
  url: string;
  color?: string;
  className?: string;
  width?: string;
  height?: string;
  title?: string;
}
const UrlIcon: React.FC<IProps> = ({ url, color, className, width, height, title }) => {
  return (
    <SIcon
      url={url}
      color={color}
      className={cn(className)}
      $width={width}
      $height={height}
      title={title}
    />
  );
};

export default UrlIcon;

const SIcon = styled.div<{
  url: string;
  color?: string;
  $width?: string;
  $height?: string;
}>`
  min-width: ${({ $width }) => $width || '100px'};
  min-height: ${({ $height }) => $height || '100px'};

  ${({ color, url }) => {
    if (color) {
      return `
        background-color: ${color};
        mask-image: url(${url});
        mask-size: contain;
        mask-position: center;
        mask-repeat: no-repeat;
      `;
    } else {
      return `
        background: url(${url});
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      `;
    }
  }}
`;
