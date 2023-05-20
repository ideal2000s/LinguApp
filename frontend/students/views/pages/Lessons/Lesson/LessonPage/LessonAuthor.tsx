import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ILesson } from 'students/models';
import lessonImg from 'students/views/shared/assets/icons/lesson.svg';
import subscribeImg from 'students/views/shared/assets/icons/subscribe.svg';
import avatar from 'students/views/shared/assets/avatar.svg';

import {
  SLessonAuthor,
  SLessonAuthorAvatar,
  SLessonAuthorInfo,
  SLessonAuthorName,
  SLessonIcons
} from './styled';
import LessonAuthorIconProp from './LessonAuthorIconProp';
import LessonFollowButton from './LessonFollowButton';

interface IProps {
  lesson: ILesson;
}

const LessonAuthor: React.FC<IProps> = ({ lesson }) => {
  const { team, author } = lesson;
  const isPerson = team?.status === 'personal';
  const lessonOwner = {
    imgUrl: (isPerson ? author?.avatarURL : team?.imageURL) || avatar,
    name: (isPerson ? author?.name : team?.name) || ''
  };

  return (
    <SLessonAuthor>
      <Row noGutters className="align-items-center">
        <Col xs={3} sm={3} md={1} lg={1}>
          <SLessonAuthorAvatar src={lessonOwner.imgUrl} alt={'avatar'} />
        </Col>

        <Col xs={9} sm={9} md={8} lg={9}>
          <SLessonAuthorInfo>
            <SLessonAuthorName>{lessonOwner.name}</SLessonAuthorName>

            <SLessonIcons>
              <LessonAuthorIconProp
                icon={lessonImg}
                localeTextKey="frontend.lesson_page.lesson_given"
                value={team?.lessonsCount}
              />

              <LessonAuthorIconProp
                icon={subscribeImg}
                localeTextKey="frontend.lesson_page.subscribers"
                value={team?.followersCount}
              />
            </SLessonIcons>
          </SLessonAuthorInfo>
        </Col>

        <Col xs={12} sm={12} md={3} lg={2} className="d-flex justify-content-end">
          <LessonFollowButton />
        </Col>
      </Row>
    </SLessonAuthor>
  );
};

export default LessonAuthor;
