import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILessonSession } from 'students/models';
import { ITaskResultsResponse } from 'students/models/lessonTasks/results';
import { lessonSelectors, resultsActions } from 'students/stores/lesson';
import { requestingSelectors } from 'students/stores/requesting';
import { tAppDispatch } from 'students/stores/rootStore';

interface IUseLoadCheckResults {
  isLoading: boolean;
  showSpinner: boolean;
  lessonSession: ILessonSession | null;
  sessionResults: ITaskResultsResponse;
}

export function useLoadCheckResults(): IUseLoadCheckResults {
  const [showSpinner, setShowSpinner] = useState(true);
  const lessonSession = useSelector(lessonSelectors.selectLessonSession);
  const sessionResults = useSelector(lessonSelectors.selectSessionResults);
  const isLoading = useSelector(
    requestingSelectors.selectHasRequestingActions([
      resultsActions.fetchLessonSessionResults.typePrefix
    ])
  );

  const dispatch = useDispatch<tAppDispatch>();

  useEffect(() => {
    if (lessonSession?.id && !sessionResults.tasks.length) {
      dispatch(resultsActions.fetchLessonSessionResults(lessonSession.id));
      setShowSpinner(false);
    }
    if (sessionResults.tasks.length) {
      setShowSpinner(false);
    }
  }, [lessonSession?.id, dispatch, sessionResults.tasks.length]);

  return {
    isLoading,
    showSpinner,
    lessonSession,
    sessionResults
  };
}
