import React, { ComponentType, useMemo } from 'react';
import styled from 'styled-components';

interface IProps {
  progress?: number;
  radius?: number;
  stroke?: number;
  color?: string;
  showValue?: boolean;
  doneIcon?: ComponentType;
  zeroProgressIcon?: ComponentType;
}

const CircleProgress: React.FC<IProps> = ({
  progress = 0,
  radius = 21,
  stroke = 5,
  color,
  showValue,
  doneIcon: DoneIcon,
  zeroProgressIcon: ZeroProgressIcon
}) => {
  const normalizedRadius = useMemo(() => radius - stroke / 2, [radius, stroke]);
  const circumference = useMemo(() => 2 * Math.PI * normalizedRadius, [normalizedRadius]);
  const strokeDashoffset = useMemo(() => ((100 - progress) / 100) * circumference, [
    progress,
    circumference
  ]);

  if (progress === 0 && ZeroProgressIcon) return <ZeroProgressIcon />;
  if (progress === 100 && DoneIcon) return <DoneIcon />;

  return (
    <SSvg width={radius * 2} height={radius * 2}>
      <SCircle
        stroke={color}
        fill="transparent"
        strokeLinecap="round"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <SCircle
        fill={showValue ? '#FBFCFF' : 'transparent'}
        stroke={showValue ? 'transparent' : '#FBFCFF'}
        strokeWidth={stroke - 1}
        opacity={showValue ? 0.2 : 0.5}
        r={normalizedRadius - 0.5}
        cx={radius}
        cy={radius}
      />
      {showValue && (
        <SText className="text" x={radius} y={radius}>
          {progress}%
        </SText>
      )}
    </SSvg>
  );
};

export default CircleProgress;

const SSvg = styled.svg`
  overflow: visible;
`;

const SCircle = styled.circle`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease;
`;

const SText = styled.text`
  width: 100%;
  height: 100%;
  fill: #fff;
  text-anchor: middle;
  dominant-baseline: middle;
  line-height: 100%;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.41px;
`;
