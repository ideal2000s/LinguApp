import React from 'react';
import { Translate } from 'i18n';

import restartIcon from 'students/views/shared/assets/icons/restart_icon.svg';
import { SLessonButton, SLessonSecondaryButton } from './styled';
import { tShowActionButtons } from './LessonPageContainer';

export interface ILessonStartButtons {
  status: tShowActionButtons;
  startLesson: () => void;
  restartLesson: () => void;
  startLessonIsLoading: boolean;
}

const LessonStartButtons: React.FC<ILessonStartButtons> = ({
  status,
  startLesson,
  restartLesson,
  startLessonIsLoading
}) => {
  switch (status) {
    case 'start':
      return (
        <SLessonButton
          onClick={startLesson}
          disabled={startLessonIsLoading}
          showSpinner={startLessonIsLoading}
          block
        >
          <Translate str="frontend.lesson_page.start_lesson" />
        </SLessonButton>
      );

    case 'continue':
      return (
        <>
          <SLessonButton onClick={startLesson} block>
            <Translate str="frontend.lesson_page.continue_lesson" />
          </SLessonButton>

          <span>
            <Translate str="frontend.lesson_page.or" />
          </span>

          <SLessonSecondaryButton
            onClick={restartLesson}
            disabled={startLessonIsLoading}
            showSpinner={startLessonIsLoading}
          >
            <img src={restartIcon} alt="" />
            <Translate str="frontend.lesson_page.restart_lesson" />
          </SLessonSecondaryButton>
        </>
      );

    case 'hide':
    default:
      return null;
  }
};

export default LessonStartButtons;
