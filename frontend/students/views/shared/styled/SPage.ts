import styled from 'styled-components';

export const SPage = styled.div<{ background?: string }>`
  min-height: 100vh;
  min-width: 320px;
  max-width: 100vw;
  background: ${({ background }) => background};
  transition: background 0.5s ease;
  display: flex;
  flex-direction: column;
`;

export const SPageContainer = styled.div<{ noPadding?: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  max-width: ${({ theme }) => theme.linguBptSm};
  padding: ${({ noPadding }) => (noPadding ? 'initial' : '1rem')};

  @media (min-width: ${({ theme }) => theme.linguBptSm}) {
    padding: 1rem;
    max-width: ${({ theme }) => theme.linguBptXl};
  }

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    padding: 1rem 3rem;
    max-width: ${({ theme }) => theme.linguBptXl};
  }

  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    padding: 1rem 4rem;
  }

  @media (min-width: ${({ theme }) => theme.linguBptXl}) {
    padding: 1rem 5rem;
  }
`;
