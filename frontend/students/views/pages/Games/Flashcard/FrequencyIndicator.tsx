import React from 'react';
import styled from 'styled-components';
import _times from 'lodash/times';
import { t } from 'i18n';

interface IProps {
  frequency: number;
}
const FrequencyIndicator: React.FC<IProps> = ({ frequency }) => {
  return (
    <Container>
      <SDescriptionText
        title={t('frontend.games.flashcard.frequency_of_word_usage', {
          language: 'English'
        })}
      >
        {descriptions[frequency]} &nbsp;
      </SDescriptionText>
      <SFrequencyRow>
        {_times(6, (i) => (
          <SPoint key={i} className={i < frequency ? 'checked' : ''}></SPoint>
        ))}
      </SFrequencyRow>
    </Container>
  );
};

export default FrequencyIndicator;

const descriptions = [
  'Used nowhere',
  t('frontend.games.flashcard.word_frequency.level1'),
  t('frontend.games.flashcard.word_frequency.level2'),
  t('frontend.games.flashcard.word_frequency.level3'),
  t('frontend.games.flashcard.word_frequency.level4'),
  t('frontend.games.flashcard.word_frequency.level5'),
  t('frontend.games.flashcard.word_frequency.level6')
];

const SDescriptionText = styled.span`
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #00688e;
  opacity: 0.6;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SPoint = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 16px;
  margin-right: 5px;
  background: #00688e;
  opacity: 0.16;
  &.checked {
    background: #0094c5;
    opacity: 1;
  }
`;

const SFrequencyRow = styled.div`
  white-space: nowrap;
`;
