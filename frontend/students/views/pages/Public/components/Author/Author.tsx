import React, { FC, useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';
import Picture from 'students/views/shared/components/Picture';
import avatarImg from 'students/views/shared/assets/avatar.svg';

interface ILessonAuthor {
  author: { avatarURL: string | null; name: string };
  className?: string;
}

const LessonAuthor: FC<ILessonAuthor> = ({ author, className }) => {
  const [imageSrc, setImageSrc] = useState(author.avatarURL || avatarImg);

  const handleError = (): void => {
    setImageSrc(avatarImg);
  };

  return (
    <SWrapper className={cn(className)}>
      <SAvatar>
        <Picture lazy src={imageSrc} alt={author.name} onError={handleError} />
      </SAvatar>

      <SText>{author.name}</SText>
    </SWrapper>
  );
};

export default LessonAuthor;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: max-content;
`;

const SAvatar = styled.div<{ colored?: boolean }>`
  display: inline-block;
  background-color: #e6e6f0;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 6px;
  height: 25px;
  width: 25px;
  min-width: 25px;

  ${customMediaQuery('tablet')} {
    height: 30px;
    width: 30px;
    min-width: 30px;
  }
`;

const SText = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  color: #5e5d71;
  margin: 0;
  padding: 0;

  ${customMediaQuery('desktop')} {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }
`;
