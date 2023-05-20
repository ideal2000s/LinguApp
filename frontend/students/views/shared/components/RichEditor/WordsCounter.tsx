import React from 'react';
import { EditorState } from 'draft-js';
import styled from 'styled-components';
import { t } from 'i18n';
import { theme } from '../../HOCs/withSRootStyle';

//TODO: remove "string" type when minimum_words become a number in server response
interface IWordsCounterProps {
  editorState: EditorState;
  targetNumber: number | string;
}

interface ISWordNumberTextProps {
  success: boolean;
}
const SWordNumberText = styled.span<ISWordNumberTextProps>`
  color: ${(props) => (props.success ? 'green' : theme.linguDarkRed || '#E60000')};
  letter-spacing: 0.3px;
`;

const WordsCounter: React.FC<IWordsCounterProps> = ({ editorState, targetNumber }) => {
  const { wordsNumber, requiredNumber } = countWords(editorState, targetNumber);
  const success = wordsNumber >= requiredNumber;
  const description = t('frontend.old.words_count_to_required_count', {
    wordsNumber,
    requiredNumber
  });

  return (
    <div className="d-flex justify-content-end">
      <SWordNumberText success={success} title={description} aria-label={description}>
        {`${wordsNumber}/${requiredNumber}`}
      </SWordNumberText>
    </div>
  );
};

export default WordsCounter;

function countWords(editorState: EditorState, targetNumber: number | string) {
  const requiredNumber: number =
    typeof targetNumber === 'string' ? parseInt(targetNumber) : targetNumber;
  const plainText = editorState.getCurrentContent().getPlainText().trim();
  const wordsNumber = plainText.length > 0 ? plainText.split(/\s+/).length : 0;
  return { wordsNumber, requiredNumber };
}

export function hasEnoughWords(
  editorState: EditorState,
  targetNumber: number | string
): boolean {
  const { wordsNumber, requiredNumber } = countWords(editorState, targetNumber);
  return wordsNumber >= requiredNumber;
}
