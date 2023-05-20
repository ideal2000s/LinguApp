import { RefObject, useEffect } from 'react';

function useScrollIntoOnMount(ref: RefObject<HTMLElement>): void {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView && ref.current.scrollIntoView();
    }
  }, [ref]);
}

export default useScrollIntoOnMount;
