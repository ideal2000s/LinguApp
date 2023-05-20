import { useContext, useEffect } from 'react';
import { IEventListener } from 'students/views/shared/bundles/events/EventDispatcher';
import LessonsCatalogContext from '../LessonsCatalogContext';

const useFilterEventListener = (
  eventName: IEventListener['eventName'],
  listener: IEventListener['listener']
) => {
  const { addFilterListener } = useContext(LessonsCatalogContext);

  useEffect(() => {
    const removeListener = addFilterListener?.(eventName, listener);

    return () => {
      removeListener?.();
    };
  }, [addFilterListener, eventName, listener]);
};

export default useFilterEventListener;
