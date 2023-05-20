import styled from 'styled-components';
import { customMediaQuery, SYellowButton } from 'students/views/shared/styled';
import ButtonGeneral, {
  styleInnerButton
} from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import Picture from 'students/views/shared/components/Picture';

export const lessonXIndent = 1.25;

export const SLesson = styled.article`
  padding: 1.2rem ${lessonXIndent}rem;
  margin: 0 auto;
  max-width: 100%;
  color: ${({ theme }) => theme.linguLessonColor};
`;

export const SLessonTitle = styled.h1`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-size: 2.125rem;
  font-weight: bold;
  line-height: 2.375rem;
  text-align: center;
  margin-top: 1.8rem;
  margin-bottom: 2.25rem;

  ${customMediaQuery('tablet')} {
    font-size: 3.375rem;
    line-height: 3.625rem;
  }
`;

export const SLessonNumbers = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(28, 16, 55, 0.2);
  margin: 1.4rem -${lessonXIndent}rem;
  padding: 0 ${lessonXIndent}rem;

  & > .numbers_item {
    min-height: 2.75rem;
    width: 33.3%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.625rem;
    font-weight: 400;
    letter-spacing: -0.41px;
    position: relative;

    ${customMediaQuery('tablet')} {
      font-size: 1rem;
    }

    &.lesson-numbers_progress--faded {
      opacity: 0.2;
    }
  }

  @media (min-width: ${({ theme }) => theme.linguBptSm}) {
    margin: 1.4rem -${lessonXIndent * 2}rem;
  }

  ${customMediaQuery('tablet')} {
    background: transparent;
    margin: 0;
    padding: 0 ${lessonXIndent + 1}rem;

    .bordered {
      &:before {
        content: '';
        height: 50%;
        width: 1px;
        background: rgba(255, 255, 255, 0.1);
        position: absolute;
        top: 25%;
        left: -8%;
      }

      &:after {
        content: '';
        height: 50%;
        width: 1px;
        background: rgba(255, 255, 255, 0.1);
        position: absolute;
        top: 25%;
        right: -8%;
      }
    }
  }
`;

export const SDescriptionList = styled.div`
  margin-top: 0.625rem;
  opacity: 0.9;
  letter-spacing: -0.02rem;
  font-size: 1rem;
  line-height: 1.375rem;

  ${customMediaQuery('tablet')} {
    font-size: 1.125rem;
  }

  & > .description_item {
    display: flex;
  }

  .description_check-icon {
    margin-top: 0.25rem;
    margin-right: 0.625rem;
    font-size: 0.75rem;
  }
`;

export const SLessonButton = styled(SYellowButton)`
  height: 3.75rem;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.625rem;
  margin-top: 1.75rem;
  max-width: 25.5rem;
  min-width: 15rem;
  width: max-content;
  border-radius: 3.875rem;
  box-shadow: 0 4px 10px rgba(13, 97, 120, 0.2);

  ${styleInnerButton()} {
    padding: 1rem 4rem;
  }

  ${customMediaQuery('tablet')} {
    margin: 4.125rem auto;
    font-size: 1.125rem;
    min-height: unset;
  }
`;

// [TODO] Move it to the SButton.tsx as a new common component.
// Right now there are no suitable components there.
export const SLessonSecondaryButton = styled(ButtonGeneral)`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.625rem;
  margin-top: 1.75rem;
  max-width: 25.5rem;
  border-radius: 3.875rem;
  display: flex;
  height: 3.75rem;

  ${styleInnerButton()} {
    padding: 1rem 2.375rem;
  }

  &,
  &:hover,
  &:active,
  ${styleInnerButton('focus')} {
    color: ${({ theme }) => theme.linguLessonButtonColor} !important;
    border: none;
    border-color: transparent;
  }

  & {
    background: ${({ theme }) => theme.linguLightBtnBg.default};
    box-shadow: 0 4px 10px rgba(13, 97, 120, 0.2);
  }

  &:hover {
    background: ${({ theme }) => theme.linguLightBtnBg.hover};
  }

  &:active {
    background: ${({ theme }) => theme.linguLightBtnBg.active};
    border-color: transparent;
    opacity: 0.6;
    outline: none !important;
    box-shadow: none !important;
  }

  ${styleInnerButton('focus')} {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
      ${({ theme }) => theme.linguLightBtnBg.focus};
    border: 3px solid #fbfcff;
    box-shadow: none;
    padding: calc(1rem - 3px) calc(2.375rem - 3px);
    box-sizing: border-box;
  }

  img {
    margin-right: 0.625rem;
  }
`;

export const SLessonBtnBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.75rem 0 0;
  min-height: 60px;

  & > * {
    margin: 0;
  }

  & > span {
    display: inline-block;
    text-transform: uppercase;
    margin: 1rem 0;

    ${customMediaQuery('tablet')} {
      margin: 0 1.875rem;
    }
  }

  ${customMediaQuery('tablet')} {
    margin: 4.125rem auto 0;
    flex-direction: row;
  }
`;

export const SLessonSectionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 6px 0;
  align-items: flex-start;

  ${customMediaQuery('tablet')} {
    margin: 2.25rem 0 0;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const SLessonSectionItem = styled.div<{
  $opened: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.25rem;
  width: 100%;
  cursor: pointer;

  ${customMediaQuery('tablet')} {
    background: ${(props) =>
      props.$opened ? 'rgba(28, 16, 55, 0.1)' : 'rgba(28, 16, 55, 0.2)'};
    border-radius: 0.875rem;
    padding: 1.375rem 1.2rem;
    width: 30%;
    justify-content: flex-start;
    transition: background 0.3s ease;
  }
`;

export const SLessonSectionItemsSeparator = styled.div`
  border-left: 4px dotted #ffffff;
  transform: scale(0.5);
  height: 1.4rem;
  opacity: 0.5;
  margin-left: 1.625rem;
  margin-top: -0.2rem;
  margin-bottom: -0.1rem;

  ${customMediaQuery('tablet')} {
    border-top: 5px dotted #ffffff;
    transform: scale(0.5);
    border-left: none;
    height: 0;
    margin: 2.5rem 0;
    flex-grow: 1;
  }
`;

export const SLessonAuthor = styled.div`
  width: 100%;
  max-width: 26.5rem;
  margin: 2.5rem auto;
  background: rgba(28, 16, 55, 0.2);
  border-radius: 0.875rem;
  order: 2;
  padding: 1rem;

  ${customMediaQuery('tablet')} {
    max-width: 100%;
    padding: 1.2rem 2rem 1.25rem 1.5rem;
  }
`;

export const SLessonAuthorName = styled.h2`
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: ${({ theme }) => theme.linguLightFont};
  white-space: nowrap;
  margin: 0 0 0.5rem;

  ${customMediaQuery('tablet')} {
    font-size: 1.25rem;
    line-height: 1.5625rem;
    margin: 0;
  }
`;

export const SLessonAuthorCertificate = styled.h1`
  font-family: ${({ theme }) => theme.linguTextFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #e6e6f0;
  opacity: 0.5;
  margin-bottom: 1.0625rem;
`;

export const SLessonAuthorAvatar = styled.img`
  align-self: center;
  max-width: 4.375rem;
  max-height: 4.375rem;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0.625rem;

  ${customMediaQuery('tablet')} {
    max-width: 3.75rem;
    max-height: 3.75rem;
  }
`;

export const SLessonAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${customMediaQuery('tablet')} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 0 0 1rem;
  }

  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    padding: 0;
  }
`;

export const SLessonAuthorIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

export const SLessonAuthorImg = styled.img`
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
`;

export const SLessonAuthorIconNum = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.linguLightFont};
  white-space: pre;

  ${customMediaQuery('tablet')} {
    font-size: 0.875rem;
  }
`;

export const SLessonAuthorIconDesc = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.linguLightFont};

  ${customMediaQuery('tablet')} {
    font-size: 0.875rem;
  }
`;

export const SLessonIcons = styled.div`
  font-family: ${({ theme }) => theme.linguTextFontFamily};
  font-style: normal;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
`;

export const SLessonSubscribeButton = styled(ButtonGeneral)<{ isFollowing?: boolean }>`
  width: 100%;
  border: 1px solid #ffffff;
  background: transparent;
  border-radius: 0.625rem;
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.25rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;

  ${({ isFollowing }) => isFollowing && 'background: rgba(0, 0, 0, 0.2);'}

  ${styleInnerButton()} {
    padding: 1.125rem 1.25rem;

    ${customMediaQuery('tablet')} {
      padding: 0.75rem 1.25rem 0.75rem 1.35rem;
    }
  }

  ${customMediaQuery('tablet')} {
    background: ${({ isFollowing }) => (isFollowing ? 'rgba(0, 0, 0, 0.2)' : 'white')};
    border: none;
    color: ${({ isFollowing }) => (isFollowing ? 'white' : '#2d2d3a')};
    margin-top: 0;
    width: unset;

    ${styleInnerButton('focus')} {
      box-shadow: 0 0 0 2px #66d6f3;
    }

    &:hover {
      ${({ isFollowing }) =>
        !isFollowing
          ? 'box-shadow: 0 0 0 2px white; transition: box-shadow 0.5s;'
          : 'background: rgba(0, 0, 0, 0.4);'}
    }
  }

  div:not(.inner) {
    margin-right: 0.5rem;
    background-color: #ffffff;

    ${customMediaQuery('tablet')} {
      background-color: #2d2d3a;
    }
  }

  svg {
    margin-right: 8px;
  }
`;

export const SPicture = styled(Picture)`
  & > img {
    width: auto;
    object-fit: cover;
    border-radius: 14px;
    max-width: 100%;
    max-height: 16.5rem;
  }
`;
