import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLesson, fetchLessonSessionIfAuthorized } from 'students/stores/lesson';

import LessonRoutes from './LessonRoutes';
import { userSelectors } from 'students/stores/user';

const LessonContainer: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(userSelectors.selectProfile);
  const { lessonId } = useParams<{ lessonId: string }>();
  const lessonIdNumber = parseInt(lessonId);

  useEffect(() => {
    dispatch(fetchLesson(lessonIdNumber));
  }, [lessonIdNumber, dispatch]);

  useEffect(() => {
    dispatch(fetchLessonSessionIfAuthorized(lessonIdNumber));
  }, [lessonIdNumber, dispatch, profile?.id]);

  return <LessonRoutes />;
};

export default LessonContainer;
