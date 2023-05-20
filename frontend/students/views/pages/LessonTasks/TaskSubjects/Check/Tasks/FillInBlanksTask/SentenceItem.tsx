import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { t } from 'i18n';

export interface ISelectAnswerPayload {
  value: string;
  itemId: number;
  wordIndex: number;
}

interface IProps {
  options: {
    id: number;
    sentence: string;
  };
  value?: string[];
  onSelectAnswer: ({ value, itemId, wordIndex }: ISelectAnswerPayload) => void;
}

const SentenceItem: React.FC<IProps> = ({ value, options, onSelectAnswer }) => {
  const { id, sentence } = options;

  const sentenceSections = sentence.split('**');

  const handleSelectAnswer = (
    event: ChangeEvent<HTMLInputElement>,
    wordIndex: number
  ) => {
    onSelectAnswer({
      value: event.target.value,
      itemId: id,
      wordIndex
    });
  };

  return (
    <SItem>
      {sentenceSections.map((section, index) => (
        <span key={index}>
          {section}
          {sentenceSections.length > index + 1 && (
            <SInputBox
              type="text"
              aria-label={t(
                'frontend.lesson_task.tasks.check.fill_in_blanks.sentence_gap'
              )}
              value={value?.[index] || ''}
              onChange={(event) => handleSelectAnswer(event, index)}
            />
          )}
        </span>
      ))}
    </SItem>
  );
};

export const SItem = styled.p`
  line-height: 2rem;
  font-size: 1rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.375rem;
  }
`;

const SInputBox = styled.input`
  border: none;
  text-align: center;
  border-bottom: 1px solid #344050;
  width: 7.5rem;

  :read-only {
    cursor: not-allowed;
  }
`;

export default SentenceItem;
