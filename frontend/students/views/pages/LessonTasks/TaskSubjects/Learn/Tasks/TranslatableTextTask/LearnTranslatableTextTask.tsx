import React, { useState, SyntheticEvent, useEffect, useRef } from 'react';
import cn from 'classnames';
import { ILearnTaskProps } from '../';
import { ITranslatableTextTask } from 'students/models/lessonTasks';
import ImageContent from 'students/views/shared/components/ImageContent';
import languageFlags from 'i18n/languageFlags';
import { locales, t } from 'i18n';
import {
  STextTaskWrapper,
  STitle,
  SMediaWrapper,
  SStickyHeader,
  SToggleWrapper,
  SContentWrapper,
  SFinishTaskButton,
  SButtonBlock,
  STextContentBlock,
  SLangButton,
  SFlag
} from './styled';

import translationBadge from './assets/cloud-translation-badge.png';
import translationBadgeWebp from './assets/cloud-translation-badge.webp';

const LearnTranslatableTextTask: React.FC<ILearnTaskProps<ITranslatableTextTask>> = ({
  task,
  onFinish,
  lightFont,
  isCompleting
}) => {
  const [showOriginal, setShowOriginal] = useState(true);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  useStickyHeader(stickyHeaderRef);

  const {
    title,
    imageURL,
    mobileImageURL,
    coverImg,
    giphyImage,
    items: [
      {
        content,
        translation,
        sourceLanguage: sourceLang,
        targetLanguage,
        fallbackTargetLanguageCode
      }
    ]
  } = task;
  const fallbackLocale = locales.find(({ lKey }) => lKey === fallbackTargetLanguageCode);
  const targetLang = targetLanguage || {
    code: fallbackTargetLanguageCode,
    name: t(fallbackLocale?.labelKey || '')
  };
  const lang = showOriginal ? targetLang : sourceLang;

  function createMarkup() {
    return { __html: showOriginal ? content : translation };
  }

  function handleFinish(e: SyntheticEvent): void {
    e.preventDefault();
    onFinish();
  }
  const hasImageContent = !!imageURL || !!coverImg || giphyImage;

  const handleLanguageToggle = () => {
    setShowOriginal((showOriginal) => !showOriginal);
  };

  function getTranslateButtonLabelText() {
    if (showOriginal) {
      return lang.name
        ? t('frontend.lesson_task.tasks.learn.translatable_text.translate_into', {
            languageName: lang.name
          })
        : t(
            'frontend.lesson_task.tasks.learn.translatable_text.translate_into_your_lang'
          );
    } else {
      return t('frontend.lesson_task.tasks.learn.translatable_text.show_original');
    }
  }

  return (
    <STextTaskWrapper>
      <STitle light={lightFont}>{title}</STitle>

      <SMediaWrapper className={cn({ combined: hasImageContent })}>
        {hasImageContent ? (
          <ImageContent
            image={imageURL}
            smallImage={mobileImageURL}
            cover={coverImg}
            giphyImage={giphyImage}
          />
        ) : null}
      </SMediaWrapper>

      <SStickyHeader ref={stickyHeaderRef}>
        {lang && targetLang.code !== sourceLang.code && (
          <SToggleWrapper className={cn({ combined: hasImageContent })}>
            <SLangButton type="button" onClick={handleLanguageToggle}>
              <SFlag
                url={languageFlags.get(lang.code) || ''}
                height="28px"
                width="28px"
              />
              {getTranslateButtonLabelText()}
            </SLangButton>
          </SToggleWrapper>
        )}
      </SStickyHeader>

      <SContentWrapper>
        <SButtonBlock>
          <SFinishTaskButton onClick={handleFinish} isCompleting={isCompleting} />
        </SButtonBlock>

        <STextContentBlock>
          <div
            lang={
              !showOriginal ? `${targetLang.code}-x-mtfrom-${sourceLang.code}` : undefined
            }
            dangerouslySetInnerHTML={createMarkup()}
          />
          {!showOriginal && (
            <a
              aria-label="Translate"
              href="http://translate.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
                <source srcSet={translationBadgeWebp} type="image/webp" />
                <img src={translationBadge} alt="Google Translate" />
              </picture>
            </a>
          )}
        </STextContentBlock>
      </SContentWrapper>
    </STextTaskWrapper>
  );
};

export default LearnTranslatableTextTask;

const useStickyHeader = (myRef: React.RefObject<HTMLElement>) => {
  const headerTop = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      if (myRef.current && headerTop.current) {
        if (window.pageYOffset > headerTop.current) {
          myRef.current.classList.add('sticky');
        } else {
          myRef.current.classList.remove('sticky');
          headerTop.current = myRef.current.offsetTop;
        }
      }
    };
    if (myRef.current) headerTop.current = myRef.current.offsetTop;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [myRef]);
  return headerTop;
};
