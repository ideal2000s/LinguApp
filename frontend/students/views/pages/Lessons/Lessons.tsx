import React from 'react';
import { fetchLesson } from 'students/stores/lesson';
import { authActions } from 'students/stores/auth';
import { BigStatefulSpinner } from 'students/views/shared/components/Spinner';

import LessonsRoutes from './LessonsRoutes';

const Lessons: React.FC = () => (
  <main>
    <LessonsRoutes />

    <BigStatefulSpinner
      actionsToSubscribe={[fetchLesson.typePrefix, authActions.checkAuth.typePrefix]}
    />
  </main>
);

export default Lessons;
