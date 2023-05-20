import React, { FC, useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Accordion, Button } from 'react-bootstrap';
import { Translate } from 'i18n';
import { ICourseDetailsLesson } from 'students/models';

import LessonCard from './LessonCard';

interface ILessonsAccordion {
  lessons: ICourseDetailsLesson[];
  className?: string;
}

const LessonsAccordion: FC<ILessonsAccordion> = ({ lessons, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  return (
    <SWrapper className={cn(className)}>
      <Accordion>
        {lessons.slice(0, 2).map((lesson: ICourseDetailsLesson) => (
          <LessonCard lesson={lesson} key={lesson.id} />
        ))}

        <Accordion.Collapse eventKey="0">
          <>
            {lessons.slice(2).map((lesson: ICourseDetailsLesson) => (
              <LessonCard lesson={lesson} key={lesson.id} />
            ))}
          </>
        </Accordion.Collapse>

        <Accordion.Toggle
          as={Button}
          variant="link"
          eventKey="0"
          onClick={toggleAccordion}
        >
          {isOpen ? (
            <Translate str="frontend.course.hide_lessons" />
          ) : (
            <Translate str="frontend.course.show_all_lessons" />
          )}
        </Accordion.Toggle>
      </Accordion>
    </SWrapper>
  );
};

export default LessonsAccordion;

const SWrapper = styled.div`
  .btn {
    text-decoration: none;
  }
`;
