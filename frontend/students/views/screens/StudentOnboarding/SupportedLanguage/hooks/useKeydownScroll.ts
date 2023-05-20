import React from 'react';
import { useMemo, useCallback, useEffect } from 'react';
import { ILanguage } from 'students/stores/user';

type tRef = React.RefObject<HTMLDivElement>;

export const useKeydownScroll = (items: ILanguage[]): Record<string, tRef> => {
  const refs = useMemo(
    () =>
      items.reduce((languages: Record<string, tRef>, item) => {
        languages[item.id] = React.createRef();
        return languages;
      }, {}),
    [items]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const userInput = e.key.toLowerCase();
      const matchingLang = items.find((item) =>
        item.systemName.toLowerCase().trim().startsWith(userInput)
      );

      matchingLang &&
        refs[matchingLang.id].current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    },
    [items, refs]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return refs;
};
