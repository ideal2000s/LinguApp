import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { ILesson } from 'students/models';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import avatar from 'students/views/shared/assets/avatar.svg';
import { Translate } from 'i18n';
import lessonPlaceholder from 'students/views/shared/assets/lesson_placeholder.png';

interface IProps {
  lesson: ILesson | null;
  className?: string;
}
const LessonCard: React.FC<IProps> = ({ lesson, className }) => {
  if (!lesson) return null;

  const image = (
    <UrlIcon
      url={lesson.imageURL || lessonPlaceholder}
      className="mb-3 mb-md-0"
      width="100px"
      height="84px"
    />
  );
  const owner = getLessonAuthor(lesson);

  return (
    <SLessonCard className={cn(className, 'flex-md-row-reverse')}>
      {image}
      <div className="d-flex flex-column align-items-center align-items-md-start">
        <SLessonTitle>{lesson.title}</SLessonTitle>
        <SOwnerBlock>
          <SAvatar url={owner.imgUrl} width="26px" height="26px" />
          <SOwnerName>
            <Translate
              str="frontend.idle_screen.by_author"
              params={{ authorName: owner.name }}
            />
          </SOwnerName>
        </SOwnerBlock>
      </div>
    </SLessonCard>
  );
};

export default LessonCard;

function getLessonAuthor(lesson: ILesson) {
  const { team, author } = lesson;
  const isPerson = team?.status === 'personal';
  const lessonOwner = {
    imgUrl: (isPerson ? author?.avatarURL : team?.imageURL) || avatar,
    name: (isPerson ? author?.name : team?.name) || ''
  };
  return lessonOwner;
}

const SLessonCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 26px;
  background: #1c103733;
  color: #fbfcff;
  border-radius: 14px;
`;

const SLessonTitle = styled.span`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.375rem;
    line-height: 1.75rem;
  }
`;

const SAvatar = styled(UrlIcon)`
  height: 26px;
  width: 26px;
  border-radius: 100%;
  background-size: cover;
  margin-right: 0.8rem;
`;

const SOwnerBlock = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
`;

const SOwnerName = styled.span`
  font-size: 16px;
  line-height: 24px;
  opacity: 0.5;
`;
