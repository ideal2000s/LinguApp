import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';

export default function useOptionResize(
  callback: (node: HTMLElement) => void
): (node: HTMLElement | null) => void {
  const [optionNode, setOptionNode] = useState<HTMLElement | null>(null);
  const ref = useCallback((node: HTMLElement | null) => {
    setOptionNode(node);
  }, []);

  const handleResize = useCallback(() => {
    if (optionNode) callback(optionNode);
  }, [callback, optionNode]);

  useEffect(() => {
    handleResize();
    const debouncedHandler = debounce(handleResize, 500);
    window.addEventListener('resize', debouncedHandler);
    return () => window.removeEventListener('resize', debouncedHandler);
  }, [handleResize]);

  return ref;
}
