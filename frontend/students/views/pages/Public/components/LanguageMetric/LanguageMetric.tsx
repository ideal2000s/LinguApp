import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { locales, Translate, t } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { ILanguage } from 'students/models';

interface ILanguageMetric {
  language?: ILanguage;
  level: string;
  className?: string;
}

const LanguageMetric: FC<ILanguageMetric> = ({ language, level, className }) => {
  const code = language?.code || '';
  const flag = locales.find((locale) => locale.lKey === code);

  return (
    <SWrapper className={cn(className)} title={t('frontend.course.course_language')}>
      {flag ? (
        <>
          <SFlag flagSrc={flag.flagSrc} />

          <SLangName>
            {language?.name ? language.name : <Translate str={flag.labelKey} />}
          </SLangName>
        </>
      ) : (
        '-'
      )}

      {level !== 'undefined' && (
        <>
          <SBullet>•</SBullet>

          <SText>
            <Translate str={`frontend.course.short_levels.${level}`} />
          </SText>
        </>
      )}
    </SWrapper>
  );
};

export default LanguageMetric;

const SWrapper = styled.div`
  background: #f0f0f3;
  border-radius: 6px;
  padding: 5px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
`;

const SFlag = styled.div<{ flagSrc: string }>`
  display: inline-block;
  background-image: url(${({ flagSrc }) => flagSrc});
  margin-right: 8px;
  height: 13px;
  width: 18px;
  min-width: 18px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const SText = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: #5e5d71;
  margin: 0;
  padding: 0;
  max-width: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    font-size: 0.9rem;
    line-height: 1.25rem;
  }
`;

const SBullet = styled.span`
  font-size: 0.5rem;
  line-height: 1rem;
  display: inline-block;
  margin: 0 4px 0 8px;

  ${customMediaQuery('tablet')} {
    line-height: 1.25rem;
    font-size: 0.6rem;
  }
`;

const SLangName = styled(SText)`
  overflow: hidden;
  text-overflow: ellipsis;
`;
