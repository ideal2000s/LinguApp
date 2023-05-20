import React, { useEffect, useRef } from 'react';

const withScrollToTopOnMount = (WrappedComponent: any): ((props: any) => JSX.Element) => {
  function Component(props: any) {
    const wrapper = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (wrapper && wrapper.current) {
        wrapper.current.scrollIntoView && wrapper.current.scrollIntoView();
      }
    }, []);
    return (
      <div ref={wrapper}>
        <WrappedComponent {...props} />
      </div>
    );
  }

  Component.displayName = `withScrollToTopOnMount(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return Component;
};
export default withScrollToTopOnMount;
