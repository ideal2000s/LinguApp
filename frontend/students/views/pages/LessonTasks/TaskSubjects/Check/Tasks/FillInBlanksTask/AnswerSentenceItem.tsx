import React from 'react';
import AnswerSentenceGap from './AnswerSentenceGap';
import { SItem } from './SentenceItem';

interface IProps {
  answer: string[];
  solution: string[][];
  sentence: string;
}

const AnswerSentenceItem: React.FC<IProps> = ({ answer, solution, sentence }) => {
  const sentenceSections = sentence.split('**');

  return (
    <SItem>
      {sentenceSections.map((section, idx) => (
        <span key={idx}>
          {section}
          {sentenceSections.length > idx + 1 && (
            <AnswerSentenceGap
              isCorrect={solution[idx].includes(answer[idx])}
              solutions={solution[idx]}
            >
              {answer[idx]}
            </AnswerSentenceGap>
          )}
        </span>
      ))}
    </SItem>
  );
};

export default AnswerSentenceItem;
