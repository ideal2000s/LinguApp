import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { lessonTaskActions } from 'students/stores/lessonTask';
import { tAppDispatch } from 'students/stores/rootStore';

function useHeartBeatPing(): () => void {
  const dispatch = useDispatch<tAppDispatch>();
  const pingAction = useCallback(() => {
    dispatch(lessonTaskActions.heartBeat());
  }, [dispatch]);
  return pingAction;
}

export default useHeartBeatPing;
