import React from 'react';
import _shuffle from 'lodash/shuffle';
import _deburr from 'lodash/deburr';
import _sampleSize from 'lodash/sampleSize';
import _uniq from 'lodash/uniq';
import _without from 'lodash/without';
import _flatMap from 'lodash/flatMap';
import { IWordNodesItem } from 'students/models';
import { IGameContainerProps } from 'students/views/pages/Games';
import NodeGame from './NodeGame';

const MIN_NODES_COUNT = 6;
const MAX_WORDS_COUNT = 10;

const WordNodesContainer: React.FC<IGameContainerProps> = ({
  phrases,
  maxRounds,
  showTutorial,
  onRoundComplete = () => {},
  onNext = () => {},
  onExit
}) => {
  let questions: IWordNodesItem[] = _flatMap(phrases, (phrase, index) => {
    const syllables = generateSyllables(phrase.body);
    if (syllables.length <= 1) return [];

    return [
      {
        id: index,
        question: phrase.wordTranslation,
        answer: phrase.body,
        phrase: phrase,
        list: _uniq(syllables)
      }
    ];
  });
  const allSyllables = _uniq(
    questions.reduce((a, { list }) => a.concat(list), [] as string[])
  );
  questions = _sampleSize(questions, maxRounds || MAX_WORDS_COUNT);
  questions.forEach((question, index, theArray) => {
    theArray[index].list = createNodeVariants(question.list, allSyllables);
  });
  if (!questions.length) {
    onNext();
    return null;
  }
  return (
    <NodeGame
      questions={questions}
      showTutorial={showTutorial}
      onRoundComplete={onRoundComplete}
      onFinish={onNext}
      onExit={onExit}
    />
  );
};

export default WordNodesContainer;

function createNodeVariants(syllables: string[], choices: string[]) {
  const additional =
    syllables.length >= MIN_NODES_COUNT ? 1 : MIN_NODES_COUNT - syllables.length;
  return _shuffle(
    syllables.concat(_sampleSize(_without(choices, ...syllables), additional))
  );
}

function generateSyllables(word: string) {
  const deburred = _deburr(word);
  const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
  const syllables = deburred.match(syllableRegex);
  if (syllables) {
    let start = 0;
    for (let i = 0; i < syllables.length; i++) {
      let length = syllables[i].length;
      for (; length > 0; length--) {
        if (_deburr(word.substr(start, length)) == syllables[i]) {
          break;
        }
      }
      syllables[i] = word.substr(start, length);
      start += length;
    }
    return syllables;
  } else {
    return [word];
  }
}
