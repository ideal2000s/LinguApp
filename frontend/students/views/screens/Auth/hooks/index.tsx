import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { authActions } from 'students/stores/auth';

function useAuthModalOpen(): () => void {
  const dispatch = useDispatch();

  const open = useCallback(() => {
    dispatch(authActions.open());
  }, [dispatch]);

  return open;
}

export { useAuthModalOpen };
