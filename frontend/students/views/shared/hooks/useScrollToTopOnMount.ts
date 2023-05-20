import { useEffect } from 'react';

function useScrollToTopOnMount(): void {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default useScrollToTopOnMount;
