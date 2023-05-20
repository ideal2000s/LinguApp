import { t } from 'i18n';

export const FILTERS_CONFIG = {
  shortList: [
    {
      title: t('frontend.course.filter_settings.levels.short.beginner'),
      fields: 'zero_level,a1,a2',
      prefix: 'zero_level,a1,a2'
    },
    {
      title: t('frontend.course.filter_settings.levels.short.intermediate'),
      fields: 'b1,b2',
      prefix: 'b1,b2'
    },
    {
      title: t('frontend.course.filter_settings.levels.short.advanced'),
      fields: 'c1',
      prefix: 'c1'
    }
  ],
  longList: [
    {
      title: t('frontend.course.filter_settings.levels.long.no_knowledge'),
      fields: 'zero_level',
      prefix: '0'
    },
    {
      title: t('frontend.course.filter_settings.levels.long.elementary'),
      fields: 'a1',
      prefix: 'a1'
    },
    {
      title: t('frontend.course.filter_settings.levels.long.pre_intermediate'),
      fields: 'a2',
      prefix: 'a2'
    },
    {
      title: t('frontend.course.filter_settings.levels.long.intermediate'),
      fields: 'b1',
      prefix: 'b1'
    },
    {
      title: t('frontend.course.filter_settings.levels.long.upper_intermediate'),
      fields: 'b2',
      prefix: 'b2'
    },
    {
      title: t('frontend.course.filter_settings.levels.long.advanced'),
      fields: 'c1',
      prefix: 'c1'
    }
  ]
};
