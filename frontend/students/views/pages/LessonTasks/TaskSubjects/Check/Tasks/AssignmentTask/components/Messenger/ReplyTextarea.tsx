import React, { FC, ChangeEvent, useState, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import TextareaAutosize from 'react-autosize-textarea';
import { Translate, t } from 'i18n';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';
import ShortAssayConfirmationModal from '../ShortAssayConfirmationModal';

import SendIcon from '../../assets/send_icon.svg';
import DoneIcon from '../../assets/done_icon.svg';

interface IReplyTextarea {
  onSend: (answer: string) => void;
  minimumWordsCount: number;
  defaultValue?: string;
  className?: string;
}

const ReplyTextarea: FC<IReplyTextarea> = ({
  onSend,
  minimumWordsCount,
  defaultValue,
  className
}) => {
  const isMobile = useBreakPoint('md', true);
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');
  const [showModal, setShowModal] = useState(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(event.target.value);
    },
    [setInputValue]
  );

  const handleSend = () => {
    if (currentWordsCount < minimumWordsCount) {
      setShowModal(true);
    } else {
      onSend(inputValue);
    }
  };

  const currentWordsCount = inputValue.match(/[^\s]+/g)?.length || 0;

  return (
    <>
      <SWrapper className={cn(className)}>
        <STextareaWrapper>
          <TextareaAutosize
            async
            rows={isMobile ? 1 : 5}
            value={inputValue}
            onChange={handleChange}
            placeholder={`${t(
              'frontend.lesson_task.tasks.check.assignment.type_your_answer'
            )}...`}
          />
        </STextareaWrapper>

        <SFooter>
          <SRequirementText>
            <Translate
              str="frontend.lesson_task.tasks.check.assignment.minimum_words_amount"
              params={{
                minimumAmount: minimumWordsCount
              }}
            />
          </SRequirementText>

          <SRequirementBlock>
            <SSendButton disabled={!currentWordsCount} onClick={handleSend}>
              <UrlIcon url={SendIcon} height="28px" width="28px" color="#00A5D7" />
            </SSendButton>

            <SRequiredSymbols>
              {currentWordsCount >= minimumWordsCount && (
                <SCheckIcon>
                  <UrlIcon url={DoneIcon} color="#ffffff" height="9px" width="9px" />
                </SCheckIcon>
              )}

              <SRequiredSymbolsText
                $notEmpty={currentWordsCount > 0}
                $correct={currentWordsCount >= minimumWordsCount}
              >
                {currentWordsCount}/{minimumWordsCount}
              </SRequiredSymbolsText>
            </SRequiredSymbols>
          </SRequirementBlock>
        </SFooter>
      </SWrapper>
      <ShortAssayConfirmationModal
        onSend={() => onSend(inputValue)}
        show={showModal}
        close={() => setShowModal(false)}
        currentWordsNumber={currentWordsCount}
        minWordsNumber={minimumWordsCount}
      />
    </>
  );
};

export default ReplyTextarea;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  background-color: #ffffff;
  padding: 16px 52px 16px 16px;

  ${customMediaQuery('tablet')} {
    background-color: rgba(193, 192, 210, 0.5);
    border-radius: 14px;
    padding: 24px;
  }
`;

const STextareaWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  z-index: 1;

  & > textarea {
    width: 100%;
    background: transparent;
    border: none;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: #2d2d3a;

    &:focus,
    &:active {
      outline: none;
    }

    &::-webkit-input-placeholder {
      color: rgba(45, 45, 58, 0.5);
    }

    ${customMediaQuery('tablet')} {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

const SFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
`;

const SRequirementText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  color: rgba(167, 170, 182, 0.8);

  ${customMediaQuery('tablet')} {
    color: rgba(93, 98, 124, 0.8);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`;

const SRequirementBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  ${customMediaQuery('tablet')} {
    flex-direction: row-reverse;

    & > div {
      margin-right: 20px;
    }
  }
`;

const SRequiredSymbols = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & > div:first-child {
    margin-right: 4px;
  }
`;

const SCheckIcon = styled.div`
  background: #39b54a;
  border-radius: 50%;
  padding: 3px;

  ${customMediaQuery('tablet')} {
    height: 15px;
    width: 15px;
  }
`;

const SRequiredSymbolsText = styled.p<{ $notEmpty: boolean; $correct: boolean }>`
  margin: 0;
  padding: 0;
  color: ${({ $notEmpty }) => ($notEmpty ? '#5E5D71' : '#A7AAB6')};
  ${({ $correct }) => ($correct ? 'color: #39B54A;' : '')}
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1rem;

  ${customMediaQuery('tablet')} {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: ${({ $notEmpty }) => ($notEmpty ? '#5E5D71' : '#5D627C')};
    ${({ $correct }) => ($correct ? 'color: #39B54A;' : '')}
    font-weight: ${({ $notEmpty }) => ($notEmpty ? 600 : 400)};
  }
`;

const SSendButton = styled.button<{ disabled: boolean }>`
  background: transparent;
  border: none;
  margin: 0 0 14px;
  padding: 0;

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }

  &:disabled {
    filter: grayscale(1);
  }

  ${customMediaQuery('tablet')} {
    margin: 0;
  }
`;
