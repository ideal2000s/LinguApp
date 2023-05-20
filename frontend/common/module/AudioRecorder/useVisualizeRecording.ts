import { useRef, useEffect, RefObject, useCallback } from 'react';

/**
 * @param {function} cb - if cb triggers hook re-render, return false from cb to stop animation.
 */
export function useReqAnimFr(
  cb: () => void | boolean,
  render: boolean,
  clear?: () => void
): void {
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    if (render && cb) {
      const draw = () => {
        const next = cb();
        if (next === undefined || next) {
          requestRef.current = requestAnimationFrame(draw);
        }
      };
      draw();
      return () => {
        clear && clear();

        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      };
    } else return () => {};
  }, [cb, render, clear]);
}

export function useVisualizeRecording(
  render: boolean,
  visualizeElement: RefObject<HTMLDivElement | HTMLButtonElement | null>,
  volumeGetter: () => number
): void {
  const visualizeFn = useCallback(() => {
    if (visualizeElement.current) {
      const volume = (volumeGetter() / 128) * 100;
      const scale = (volume * volume) / 100;
      visualizeElement.current.style.background = `radial-gradient(circle, ${'#e63757'} ${scale}%, #ffffff 100%)`;
    }
  }, [visualizeElement, volumeGetter]);
  const clearVisualizeFn = useCallback(() => {
    if (visualizeElement.current) {
      visualizeElement.current.style.background = '';
    }
  }, [visualizeElement]);

  useReqAnimFr(visualizeFn, render, clearVisualizeFn);
}
