import { t } from 'i18n';

export const SORT_BY_CONFIG = [
  // {
  //   title: t('frontend.course.filter_settings.sort_by.popularity'),
  //   fields: 'popularity'
  // },
  {
    title: t('frontend.course.filter_settings.sort_by.newest'),
    fields: 'updated_at desc'
  },
  {
    title: t('frontend.course.filter_settings.sort_by.most_rated'),
    fields: 'ratings_count desc'
  }
];
