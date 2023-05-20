import React from 'react';
import { Redirect, Switch, useRouteMatch } from 'react-router-dom';
import LessonTaskContainer from './LessonTask/LessonTaskContainer';
import ProtectedRoute from 'students/views/shared/components/ProtectedRoute';
import { getLessonPathFromUrl } from 'students/views/shared/helpers';
import LessonFinishedRouteContainer from './LessonIsFinished/LessonFinishedRoute';

const LessonTasksRoutes: React.FC = () => {
  const { path, url } = useRouteMatch();
  const lessonPath = getLessonPathFromUrl(url);

  return (
    <Switch>
      <ProtectedRoute
        authenticationPath={lessonPath}
        path={`${path}/finished`}
        component={LessonFinishedRouteContainer}
      />
      <ProtectedRoute
        authenticationPath={lessonPath}
        path={`${path}/:taskId(\\d+)`}
        component={LessonTaskContainer}
      />
      <Redirect to={lessonPath} />
    </Switch>
  );
};

export default LessonTasksRoutes;
