import { t } from 'i18n';

const DURATION_CONFIG = [
  {
    title: t('frontend.course.filter_settings.durations.t0_600'),
    fields: '0-600'
  },
  {
    title: t('frontend.course.filter_settings.durations.t600_1800'),
    fields: '600-1800'
  },
  {
    title: t('frontend.course.filter_settings.durations.t1800_3600'),
    fields: '1800-3600'
  },
  {
    title: t('frontend.course.filter_settings.durations.t3600_86400'),
    fields: '3600-86400'
  }
];

export { DURATION_CONFIG };
