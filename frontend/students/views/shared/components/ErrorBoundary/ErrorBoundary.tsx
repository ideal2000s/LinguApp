import React, { ReactNode } from 'react';
import { withScope, captureException, showReportDialog } from '@sentry/browser';

type tState = {
  hasError: boolean;
  eventId: string | undefined;
};

class ErrorBoundary extends React.PureComponent<Record<string, unknown>, tState> {
  state = {
    hasError: false,
    eventId: undefined
  };

  static getDerivedStateFromError(): tState {
    return {
      hasError: true,
      eventId: undefined
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error);
    withScope((scope) => {
      scope.setExtras(errorInfo as Record<string, any>);
      const eventId = captureException(error);
      this.setState({ eventId });
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button
            className={'btn btn-warning white'}
            onClick={() => showReportDialog({ eventId: this.state.eventId })}
          >
            Report feedback
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
