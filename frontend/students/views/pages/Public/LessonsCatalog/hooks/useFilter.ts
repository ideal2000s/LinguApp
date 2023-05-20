import { useCallback, useContext, useEffect, useState } from 'react';

import LessonsCatalogContext from '../LessonsCatalogContext';

type tReturnedObject = [string[], (list: string[]) => void];

const useFilter = (paramName: string): tReturnedObject => {
  const [options, _setOptions] = useState<string[]>([]);
  const { dispatchFilterEvent } = useContext(LessonsCatalogContext);

  const setOptions = useCallback(
    (list: string[]) => {
      _setOptions(list);

      const url = new URL(window.location.href);
      url.searchParams.delete(paramName);
      if (list.length) {
        list.forEach((item) => {
          url.searchParams.append(paramName, item);
        });
      }

      window.history.pushState({}, '', url.toString());

      dispatchFilterEvent?.(paramName, { eventName: paramName, data: list });
    },
    [dispatchFilterEvent, paramName]
  );

  useEffect(() => {
    const url = new URL(window.location.href);

    const list = url.searchParams.getAll(paramName);
    if (list) {
      _setOptions(list);
    }
  }, [paramName]);

  return [options, setOptions];
};

export default useFilter;
