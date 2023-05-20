import { useCallback, useEffect, useRef, useState } from 'react';

export default function useSubmitOnComplete(callback: () => void): () => void {
  const isPostedRef = useRef(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const markCompleted = useCallback(() => {
    setIsCompleted(true);
  }, []);

  useEffect(() => {
    if (isCompleted && !isPostedRef.current) {
      callback();

      isPostedRef.current = true;
    }
  }, [callback, isCompleted]);

  return markCompleted;
}
