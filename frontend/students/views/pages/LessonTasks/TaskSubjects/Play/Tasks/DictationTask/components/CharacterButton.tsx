import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

interface ICharacterBlock {
  character: string;
  onClick: (character: string) => void;
  className?: string;
}

const CharacterButton: FC<ICharacterBlock> = ({ character, onClick, className }) => {
  const handleClick = useCallback(() => {
    onClick(character);
  }, [onClick, character]);

  return (
    <SCharacterButton className={cn(className)} onClick={handleClick}>
      {character}
    </SCharacterButton>
  );
};

export default CharacterButton;

const SCharacterButton = styled.button`
  background: rgba(122, 67, 136, 0.4);
  border: none;
  border-radius: 8px;
  color: rgba(251, 252, 255, 0.7);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 14px 15px;
  transition: backgroung 0.3s, color 0.3s;

  &:hover,
  &:focus {
    outline: none;
    background: rgba(122, 67, 136, 0.65);
    color: rgba(251, 252, 255, 0.85);
  }

  &:active {
    outline: none;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #ffffff 100%);
    box-shadow: 0 2px 0 rgba(46, 33, 98, 0.5), inset 0 1px 0 #ffffff;
  }
`;
