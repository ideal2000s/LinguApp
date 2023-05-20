import React, { useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { SNoStyleButton } from 'students/views/shared/styled';
import languageFlags from 'i18n/languageFlags';

interface IProps {
  flagCode: string;
  name?: string;
  payload?: any;
  checked?: boolean;
  onSelect?: (payload?: any) => void;
}
const FlagCard: React.FC<IProps> = ({ name, flagCode, payload, checked, onSelect }) => {
  const buttonClickHandler = useCallback(() => {
    if (onSelect) {
      onSelect(payload);
    }
  }, [payload, onSelect]);

  const flagImageUrl = languageFlags.get(flagCode);

  return (
    <SLangRadioButton
      type="button"
      onClick={buttonClickHandler}
      role={'radio'}
      className={cn({ checked })}
      aria-checked={checked}
      title={name}
    >
      <SFLagCard>
        {!!flagImageUrl && <SFlag width="54px" height="38px" url={flagImageUrl} />}
        <SLangName>{name}</SLangName>
      </SFLagCard>
    </SLangRadioButton>
  );
};

export default React.memo(FlagCard);

const SLangRadioButton = styled(SNoStyleButton)`
  padding: 0;
  &:focus {
    outline: none;
    outline-color: transparent;
  }

  &.checked > div {
    background: rgba(255, 255, 255, 0.4);
    border: 3px solid #66d6f3;
    padding: 10px;
  }
`;
const SFLagCard = styled.div`
  width: 144px;
  height: 123px;
  padding: 13px;
  text-align: center;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const SFlag = styled(UrlIcon)`
  margin-bottom: 10px;
  border-radius: 8px;
`;

const SLangName = styled.div`
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
