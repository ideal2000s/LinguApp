import React, { MouseEventHandler, useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useBreakPoint } from '../../hooks';
import PopoverFontSwitcher from './PopoverFontSwitcher';
import ButtonsFontSwitcher from './ButtonsFontSwitcher';

const MAX_FONT_SIZE = 22;
const MIN_FONT_SIZE = 10;
const DEFAULT_FONT_SIZE = 16;
const SHIFT = 2;

interface IProps {}
const FontSizeSwitcher: React.FC<IProps> = () => {
  const [, setFontSize] = useFontSize();
  const isMobile = useBreakPoint('sm', true);

  const handleChangeFontSize: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget.dataset.sign === '+') {
      increase();
    } else {
      decrease();
    }
  };

  const increase = () => {
    setFontSize((prevSize) => (prevSize < MAX_FONT_SIZE ? prevSize + SHIFT : prevSize));
  };
  const decrease = () => {
    setFontSize((prevSize) => (MIN_FONT_SIZE < prevSize ? prevSize - SHIFT : prevSize));
  };

  return (
    <SFontSizeSwitcher aria-hidden="true">
      {isMobile ? (
        <PopoverFontSwitcher onChange={handleChangeFontSize} />
      ) : (
        <ButtonsFontSwitcher onChange={handleChangeFontSize} />
      )}
    </SFontSizeSwitcher>
  );
};

const SFontSizeSwitcher = styled.article`
  button {
    font-size: 16px;
    padding: 6px 12px;
  }
`;

export default FontSizeSwitcher;

const useFontSize: () => [number, React.Dispatch<React.SetStateAction<number>>] = () => {
  const [size, setSize] = useState(() => readFontSize());
  useEffect(() => {
    document.documentElement.style.fontSize = `${size}px`;
  }, [size]);
  useEffect(() => {
    setSize(readFontSize());
  }, [setSize]);

  useLayoutEffect(() => {
    document.documentElement.style.fontSize = `${size}px`;
    saveFontSize(size);
  }, [size]);

  return [size, setSize];
};

function readFontSize() {
  const size = sessionStorage.getItem('fontSize');
  if (size) {
    return +size;
  } else {
    return DEFAULT_FONT_SIZE;
  }
}

function saveFontSize(size: number) {
  return sessionStorage.setItem('fontSize', size.toString());
}
