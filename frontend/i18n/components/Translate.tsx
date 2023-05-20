import React, { useContext, FC } from 'react';
import I18nContext from '../I18nContext';
import { t } from '../index';
import { tProps } from '../Types';

const Translate: FC<tProps> = ({ str, params, scope }) => {
  const { locale } = useContext(I18nContext);

  return <span>{t(str, { ...params, scope: scope, locale: locale })}</span>;
};

export default Translate;
