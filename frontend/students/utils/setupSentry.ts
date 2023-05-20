import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const sentryFilter = new RegExp(/^production|staging$/);

export default function (): void {
  Sentry.init({
    dsn: 'https://477e0bc1ebd24f4497e8c26ddc5cedd1@o503631.ingest.sentry.io/5589986',
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    beforeSend(event) {
      if (!sentryFilter.test(`${process.env.RAILS_ENV}`)) return null;
      return event;
    },
    tracesSampleRate: 1.0
  });
}
