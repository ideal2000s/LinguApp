import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import LessonTasksRoutes from './LessonTasksRoutes';
import { tAppState } from 'students/stores/rootStore';
import { fetchLesson, lessonSelectors, fetchLessonSession } from 'students/stores/lesson';

type tProps = ConnectedProps<typeof connector>;

const LessonTasksContainer: React.FC<tProps> = ({
  lessonStore,
  fetchLesson,
  fetchLessonSession
}) => {
  const hasLessonInStore = lessonStore.data && lessonStore.session;
  const { lessonId: currentLessonId } = useParams<{ lessonId: string }>();

  useEffect(() => {
    const currentLessonIdNumber = parseInt(currentLessonId);
    if (!hasLessonInStore) {
      fetchLesson(currentLessonIdNumber);
      fetchLessonSession(currentLessonIdNumber);
    }
  }, [hasLessonInStore, currentLessonId, fetchLesson, fetchLessonSession]);

  return <LessonTasksRoutes />;
};

function mapStateToProps(state: tAppState) {
  return { lessonStore: lessonSelectors.selectLessonStore(state) };
}
const mapDispatchToProps = { fetchLesson, fetchLessonSession };

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(LessonTasksContainer);
