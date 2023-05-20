import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

interface IProps {
  rating?: number;
  className?: string;
}

const LessonRating: React.FC<IProps> = ({ rating, className }) => (
  <SLessonRating className={cn(className)}>
    <SFontAwesomeIcon icon={faStar} />
    {rating || 0}
  </SLessonRating>
);

export default LessonRating;

const SLessonRating = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  font-size: 0.75rem;
  color: white;
  display: flex;
  min-width: 4.75rem;
  padding: 0.5rem 0.625rem;
  line-height: 1;
  justify-content: center;
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #fed02d;
  margin-right: 0.25rem;
  margin-top: -1px;
`;
