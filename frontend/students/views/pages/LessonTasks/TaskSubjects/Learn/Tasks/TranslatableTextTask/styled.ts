import styled from 'styled-components';
import { customMediaQuery, SNoStyleButton } from 'students/views/shared/styled';
import FinishTaskButton from '../../components/FinishTaskButton';
import UrlIcon from 'students/views/shared/components/UrlIcon/UrlIcon';

export const STextTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  ${customMediaQuery('desktop')} {
    max-width: 921px;
    align-self: center;
  }
`;

export const STitle = styled.h1<{ light: boolean }>`
  color: ${({ light, theme }) => (light ? theme.linguLightFont : theme.linguDarkFont)};
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.625rem;
  text-align: left;

  ${customMediaQuery('desktop')} {
    text-align: center;
  }
`;

export const SMediaWrapper = styled.div`
  background: white;
  margin: 0 -1rem;
  position: relative;

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  &.combined {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: 0;
  }

  ${customMediaQuery('desktop')} {
    margin: 0;
    border-radius: 20px;
    overflow: hidden;
  }
`;

export const SStickyHeader = styled.div`
  &.sticky {
    position: fixed;
    top: 0;
    left: 1rem;
    right: 1rem;
    + div {
      padding-top: 76px;
    }
    > div {
      display: flex;
      justify-content: center;
    }

    ${customMediaQuery('desktop')} {
      max-width: 921px;
      width: 100%;
      left: auto;
      right: auto;
    }
  }
`;

export const SToggleWrapper = styled.div`
  background-color: white;
  margin: 0 -1rem;
  padding: 1rem;
  border-radius: 20px 20px 0 0;

  &.combined {
    border-radius: 0;
  }

  ${customMediaQuery('desktop')} {
    margin: 0;
    padding: 1rem 3rem;
  }
`;

export const SContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 -1rem -1rem -1rem;
  flex-grow: 1;
  background: white;
  padding-bottom: 2rem;

  ${customMediaQuery('desktop')} {
    margin: 0;
    background: transparent;
    padding-bottom: 0;
  }
`;

export const SFinishTaskButton = styled(FinishTaskButton)`
  margin: 0;
`;

export const SButtonBlock = styled.div`
  margin: 0;
  order: 3;
  padding: 0 5%;
  width: 100%;
  background: white;

  ${customMediaQuery('desktop')} {
    width: 340px;
    padding: 40px 0;
    background: transparent;
  }
`;

export const STextContentBlock = styled.div`
  order: 2;
  background: white;
  padding: 1rem;
  width: 100%;

  /* rewrite inline text coloring from reach editor */
  span[style] {
    background-color: ${({ theme }) => theme.linguLessonColor} !important;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  table[style] {
    width: 100% !important;
  }

  ${customMediaQuery('desktop')} {
    padding: 1.625rem 3.125rem;
    border-radius: 0 0 20px 20px;
    min-height: max-content;
  }
`;

export const SLangButton = styled(SNoStyleButton)`
  padding: 0.5rem;
  display: flex;
  background-color: #f5f5f8;
  font-weight: 600;
  font-size: 0.8125rem;
  line-height: 0.875rem;
  align-items: center;
  border-radius: 10px;

  &:hover,
  &:focus,
  &:active,
  &:disabled {
    background-color: #f5f5f8;
  }
  &:focus {
    outline: none;
    outline-color: transparent;
  }
`;

export const SFlag = styled(UrlIcon)`
  margin-right: 0.5rem;
`;
