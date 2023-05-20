import React, {
  useCallback,
  forwardRef,
  KeyboardEvent,
  ChangeEvent,
  RefObject
} from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import TextareaAutosize from 'react-autosize-textarea';
import { t } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';

interface IWordInput {
  value: string;
  onChange: (value: string) => void;
  onEnterKeyPress: () => void;
  animationRef: RefObject<HTMLDivElement>;
  isCorrect: boolean;
  isFinished: boolean;
  highlightHint: boolean;
  className?: string;
}

const WordInput = forwardRef<HTMLTextAreaElement | null, IWordInput>(
  (
    {
      value,
      onChange,
      onEnterKeyPress,
      animationRef,
      isCorrect,
      isFinished,
      highlightHint,
      className
    },
    forwardedRef
  ) => {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    const handleKeyDown = useCallback(
      (key: KeyboardEvent<HTMLTextAreaElement>) => {
        if (key.key === 'Enter') {
          key.preventDefault();

          onEnterKeyPress();
        }
      },
      [onEnterKeyPress]
    );

    return (
      <SWordInputBlock
        ref={animationRef}
        className={cn(className)}
        $correct={isCorrect}
        $finished={isFinished}
        $highlightHint={highlightHint}
      >
        <STextareaAutosize
          ref={forwardedRef}
          rows={1}
          value={value}
          readOnly={isFinished}
          $correct={isCorrect}
          $finished={isFinished}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t('frontend.lesson_task.tasks.play.dictation.input_placeholder')}
          title={t('frontend.lesson_task.tasks.play.dictation.input_placeholder')}
        />
      </SWordInputBlock>
    );
  }
);

export default WordInput;

const RESULT_BLOCK_HOVER_CLASS_NAME = 'resultHoverAnimation';

const SWordInputBlock = styled.div<{
  $finished: boolean;
  $correct: boolean;
  $highlightHint: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  background: #7a4388;
  padding: 0.5rem 0.25rem;
  min-height: 66px;
  width: 100%;
  border-radius: 12px;
  box-shadow: inset 0 -1px 0 #c27acb, inset 0 4px 0 #61326d;
  color: ${({ theme }) => theme.linguLightFont};
  transition: transform 0.2s, background 0.5s;
  position: relative;

  @keyframes wrongTypoAnimation {
    0% {
      box-shadow: inset 0 -1px 0 #c27acb, inset 0 4px 0 #61326d;
    }

    20% {
      box-shadow: inset 0 -1px 0 #c27acb, inset 0 4px 0 #61326d, 0 0 0 3px #e8819b;
    }

    40% {
      box-shadow: inset 0 -1px 0 #c27acb, inset 0 4px 0 #61326d, 0 0 0 4px #e8819b;
    }

    80% {
      box-shadow: inset 0 -1px 0 #c27acb, inset 0 4px 0 #61326d, 0 0 0 3px #e8819b;
    }

    100% {
      box-shadow: inset 0 -1px 0 #c27acb, inset 0 4px 0 #61326d;
    }
  }

  ${({ $correct, $highlightHint }) =>
    !$highlightHint && !$correct ? 'animation: wrongTypoAnimation 1.5s;' : ''}
  ${({ $finished, $correct, $highlightHint }) =>
    !$finished && $highlightHint && !$correct
      ? 'box-shadow: inset 0 -1px 0 #c27acb, inset 0 4px 0 #61326d, 0 0 0 4px #E8819B;'
      : ''};
  ${({ $finished, $correct, $highlightHint }) =>
    !$finished && $highlightHint && $correct
      ? 'box-shadow: inset 0 -1px 0 #c27acb, inset 0 4px 0 #61326d, 0 0 0 4px rgba(255, 255, 255, 0.5);'
      : ''};

  ${customMediaQuery('tablet')} {
    font-size: 2.25rem;
  }

  &.${RESULT_BLOCK_HOVER_CLASS_NAME} {
    transform: scale(0.94);
  }
`;

const STextareaAutosize = styled(TextareaAutosize)<{
  $finished: boolean;
  $correct: boolean;
}>`
  width: 100%;
  margin: -0.375rem;
  min-height: 58px;
  padding: 0 16px;
  color: ${({ $correct }) => ($correct ? '#FFFFFF' : '#FF7678')};
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 58px;
  background: ${({ $finished }) =>
    $finished ? 'linear-gradient(0deg, #39B54A 6.9%, #27A939 94.83%)' : 'transparent'};
  border-radius: 10px;
  border: none;
  text-align: center;

  ${({ $finished }) =>
    $finished ? 'box-shadow: inset 0 4px 0 #58CD68, inset 0 -4px 0 #0B9444' : ''};

  ${customMediaQuery('tablet')} {
    line-height: 66px;
  }

  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 58px;

    ${customMediaQuery('tablet')} {
      line-height: 66px;
    }
  }

  ${({ $finished }) =>
    $finished
      ? `
    @keyframes correctAnimation {
      20% {
        background: linear-gradient(0deg, #39B54A 6.9%, #27A939 94.83%);
      }
      
      50% {
        background: linear-gradient(0deg, #34B046 6.9%, #23A535 94.83%);
      }

      100% {
        background: linear-gradient(0deg, #39B54A 6.9%, #27A939 94.83%);
      }
    }
    
    animation: correctAnimation 2s ease-out 0s alternate infinite;
  `
      : ''}

  &:focus {
    outline: none;
  }
`;
