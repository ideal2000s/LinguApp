import React, { Suspense, lazy } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

const LessonContainer = lazy(() => import('./Lesson'));
const LessonTasksContainer = lazy(() => import('../LessonTasks'));

const LessonsRoutes: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Suspense fallback="">
      <Switch>
        <Route path={`${path}/:lessonId(\\d+)/tasks`} component={LessonTasksContainer} />
        <Route path={`${path}/:lessonId(\\d+)`} component={LessonContainer} />
        {/* TODO: Remove temporary redirect to demo lesson */}
        <Redirect to={`${path}/13`} />
      </Switch>
    </Suspense>
  );
};

export default LessonsRoutes;
