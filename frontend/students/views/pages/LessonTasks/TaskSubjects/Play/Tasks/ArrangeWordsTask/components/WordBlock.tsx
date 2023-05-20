import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';

interface IProps {
  value: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
  sourceKey: number;
}
const WordBlock: React.FC<IProps> = ({ value, onClick, selected, sourceKey }) => {
  const [randomAlignment] = useState(randomAlignSelf);
  return (
    <SWordRandomBlock>
      <SWordRandomInnerBlock alignSelf={randomAlignment}>
        <SWordButton
          onClick={onClick}
          disabled={selected}
          hide={selected}
          data-source-index={sourceKey}
        >
          {value}
        </SWordButton>
      </SWordRandomInnerBlock>
    </SWordRandomBlock>
  );
};

export default WordBlock;

function randomAlignSelf() {
  const aligns = ['flex-start', 'center', 'flex-end'];
  return aligns[Math.floor(Math.random() * 3)];
}

const SWordRandomBlock = styled.div`
  display: flex;
  padding: 0.8rem;
  height: 5rem;
  box-sizing: content-box;

  @media (min-width: ${({ theme }) => theme.linguBptSm}) {
    padding: 1rem;
    height: 4rem;
  }

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    padding-left: 3rem;
    padding-right: 3rem;
    height: 6rem;
  }
`;

const SWordRandomInnerBlock = styled.div<{ alignSelf: string }>`
  align-self: ${({ alignSelf }) => alignSelf};
`;

const SWordButton = styled(ButtonGeneral)<{ hide: boolean }>`
  background-color: #ffffff;
  color: #37295c;
  box-shadow: 0 4px 0 #00000035;
  border: none;
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.375rem;
  border-radius: 10px;
  opacity: ${({ hide }) => (hide ? 0 : 100)} !important;

  ${styleInnerButton()} {
    padding: 0.875rem;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(46, 33, 98, 0.5), 0 8px 0 rgba(46, 33, 98, 0.5);
  }

  @media (min-width: ${({ theme }) => theme.linguBptSm}) {
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
`;
