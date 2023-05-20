import React, { FC } from 'react';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ILesson } from 'students/models';
import { Translate } from 'i18n';

import { SLessonNumbers } from './styled';

interface IProps {
  lesson: ILesson;
}

const LessonNumbers: FC<IProps> = ({ lesson }) => (
  <SLessonNumbers className="lesson-numbers">
    <div className="numbers_item time">
      <FontAwesomeIcon icon={faClock} />
      &nbsp;
      <Translate str="frontend.lesson_page.time_min" params={{ minutesNumber: '-' }} />
    </div>

    <div className="numbers_item new-words-number bordered">
      <FontAwesomeIcon icon={faComment} />
      &nbsp;
      <Translate
        str="frontend.lesson_page.words_number"
        params={{ wordsNumber: lesson?.phrasesCount }}
      />
    </div>

    <div className="numbers_item lesson-numbers_progress--faded">
      <Translate str="frontend.lesson_page.not_started" />
    </div>
  </SLessonNumbers>
);

export default LessonNumbers;
