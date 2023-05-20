import React, { FC } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

function withErrorBoundary<P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>
): FC<P> {
  const hocComponent: FC<P> = ({ ...props }) => (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  return hocComponent;
}

export default withErrorBoundary;
