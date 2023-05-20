import React, { Suspense, lazy } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

const LessonPageContainer = lazy(() => import('./LessonPage/LessonPageContainer'));

const LessonRoutes: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Suspense fallback="">
      <Switch>
        <Redirect from={`${path}/:notTasks`} to={`${path}`} />
        <Route path={`${path}`} component={LessonPageContainer} />
      </Switch>
    </Suspense>
  );
};

export default LessonRoutes;
