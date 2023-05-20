import { init } from '@sentry/browser';

init({
  dsn: 'https://539b9d6e84eb436ab5c1fb2c19710090@bug.railsme.ninja/6',
  beforeSend(event) {
    if (`${process.env.RAILS_ENV}` !== 'production') return;
    return event;
  }
});
