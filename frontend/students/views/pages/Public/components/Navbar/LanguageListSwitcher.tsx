import React, { FC, useCallback, useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { locales, Translate, I18nContext, t } from 'i18n';
import { SRootStyle } from 'students/views/shared/styled';
import ArrowIcon from 'students/views/shared/assets/icons/light_back_arrow_icon.svg';
import AngleArrowIcon from 'students/views/shared/assets/icons/angle_arrow.svg';
import { ILocaleOption } from 'students/views/shared/components/LangSwitcher/LangSwitcher';
import UrlIcon from 'students/views/shared/components/UrlIcon';

const LanguageListSwitcher: FC = () => {
  const { locale, setLocale } = useContext(I18nContext);
  const [show, setShow] = useState(false);

  const currentOption = locales.find(({ lKey }) => lKey === locale);

  const openSelect = useCallback(() => {
    setShow(true);
  }, []);

  const closeSelect = useCallback(() => {
    setShow(false);
  }, []);

  const handleLocaleChange = useCallback(
    (locale: ILocaleOption) => {
      if (locale && 'lKey' in locale) {
        setLocale(locale.lKey);
        closeSelect();
      }
    },
    [closeSelect, setLocale]
  );

  return (
    <div>
      <SButton variant="link" onClick={openSelect}>
        {currentOption ? <Translate str={currentOption.labelKey} /> : ''}
      </SButton>

      <SModal show={show} dialogClassName="100w 100h m-0">
        <SRootStyle>
          <Modal.Body>
            <SMenuBody>
              <Button
                aria-label={t('frontend.course.navbar.select_language')}
                variant="link"
                onClick={closeSelect}
                className="align-self-start"
              >
                <UrlIcon url={ArrowIcon} color="#2d2d3a" height="2rem" width="2rem" />
              </Button>

              <SList>
                {locales.map((locale: ILocaleOption) => (
                  <SListItem key={locale.lKey} onClick={() => handleLocaleChange(locale)}>
                    <SFlag url={locale.flagSrc} height="28px" width="28px" />

                    <SLang active={!!currentOption && currentOption.lKey === locale.lKey}>
                      <Translate str={locale.labelKey} />
                    </SLang>

                    {!!currentOption && currentOption.lKey === locale.lKey ? (
                      <SFontAwesomeIcon size="1x" icon={faCheck} color="#00a5d7" />
                    ) : null}
                  </SListItem>
                ))}
              </SList>
            </SMenuBody>
          </Modal.Body>
        </SRootStyle>
      </SModal>
    </div>
  );
};

const SModal = styled(Modal)`
  .modal-dialog,
  .modal-body {
    max-width: 100vw;
    min-width: 100vw;
    max-height: 100vh;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
  }

  .modal-content {
    border: none;
    border-radius: 0;
  }
`;

const SMenuBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SButton = styled(Button)`
  color: #2d2d3a;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  position: relative;
  padding: 0.5rem 1rem;

  &:focus,
  &:active {
    text-decoration: none;
  }

  &:after {
    content: url(${AngleArrowIcon});
    display: block;
    height: 12px;
    width: 12px;
    position: absolute;
    top: 9px;
    right: 1px;
  }
`;

const SList = styled.ul`
  margin: 1rem 0;
  padding: 0 1rem;
  list-style: none;
  overflow: auto;
`;

const SListItem = styled.li`
  margin: 0 0 1rem;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const SFlag = styled(UrlIcon)`
  margin-right: 0.75rem;
`;

const SLang = styled.p<{ active: boolean }>`
  color: #2d2d3a;
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  line-height: 1.25rem;
  position: relative;
  padding: 0;
  margin: 0;
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
  top: 4px;
`;

export default LanguageListSwitcher;
