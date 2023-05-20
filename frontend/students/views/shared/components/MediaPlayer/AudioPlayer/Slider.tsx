import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import cn from 'classnames';

interface IProps {
  played: number;
  onSeekMouseDown: () => void;
  onSeekChange: (value: number) => void;
  onSeekMouseUp: (value: number) => void;
  className?: string;
}

const Slider: React.FC<IProps> = ({
  played = 0,
  onSeekMouseDown,
  onSeekChange,
  onSeekMouseUp,
  className
}) => {
  const progress = played * 100 || 0;

  const handleSeekMouseDown = () => {
    onSeekMouseDown();
  };

  const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSeekChange(Number(event.target.value));
  };

  const handleSeekMouseUp = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSeekMouseUp(Number(event.target.value));
  };

  return (
    <SRange
      progress={progress}
      className={cn(className)}
      type="range"
      step="any"
      min={0}
      max={0.999999}
      value={played}
      onMouseDown={handleSeekMouseDown}
      onTouchStart={handleSeekMouseDown}
      onChange={handleSeekChange}
      onMouseUp={handleSeekMouseUp}
      onTouchEnd={handleSeekMouseUp}
    />
  );
};

function getProgress(props: { progress: number }) {
  return Math.floor(props.progress);
}

const SRange = styled(Form.Control)<{ progress: number }>`
  --thumbSize: 0;
  --trackSize: 8px;
  --thumbBg: #fff;
  --trackBg: #e6e6f0;
  --progressBg: #00bce8;

  /* webkit progress workaround */
  --webkitProgressPercent: ${getProgress}%;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: var(--thumbSize);
  width: 100%;
  margin: 0;
  padding: 0;

  &:focus {
    outline: none;
  }

  /* Thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--thumbSize);
    height: var(--thumbSize);
    background-color: var(--thumbBg);
    border-radius: calc(var(--thumbSize) / 2);
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
    cursor: pointer;
  }
  &::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    width: var(--thumbSize);
    height: var(--thumbSize);
    background-color: var(--thumbBg);
    border-radius: calc(var(--thumbSize) / 2);
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
    cursor: pointer;
  }
  &::-ms-thumb {
    -ms-appearance: none;
    appearance: none;
    width: var(--thumbSize);
    height: var(--thumbSize);
    background-color: var(--thumbBg);
    border-radius: calc(var(--thumbSize) / 2);
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
    cursor: pointer;
  }

  /* Track */
  &::-webkit-slider-runnable-track {
    height: var(--trackSize);
    background-image: linear-gradient(
      90deg,
      var(--progressBg) var(--webkitProgressPercent),
      var(--trackBg) var(--webkitProgressPercent)
    );
    border-radius: calc(var(--trackSize) / 2);
  }
  &::-moz-range-track {
    height: var(--trackSize);
    background-color: var(--trackBg);
    border-radius: calc(var(--trackSize) / 2);
  }
  &::-ms-track {
    height: var(--trackSize);
    background-color: var(--trackBg);
    border-radius: calc(var(--trackSize) / 2);
  }

  /* Progress */
  &::-moz-range-progress {
    height: var(--trackSize);
    background-color: var(--progressBg);
    border-radius: calc(var(--trackSize) / 2) 0 0 calc(var(--trackSize) / 2);
  }
  &::-ms-fill-lower {
    height: var(--trackSize);
    background-color: var(--progressBg);
    border-radius: calc(var(--trackSize) / 2) 0 0 calc(var(--trackSize) / 2);
  }
`;

export default Slider;
