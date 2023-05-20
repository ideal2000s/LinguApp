import React from 'react';
import cn from 'classnames';
import { Translate } from 'i18n';
import { SPrimaryButton } from 'students/views/shared/styled/SButton';
import { IButtonGeneral } from '../ButtonGeneral/ButtonGeneral';

interface IProps extends IButtonGeneral {
  text?: string;
  textLocaleKey?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  className?: string;
}
const PrimarySubmitButton: React.FC<IProps> = ({
  text,
  textLocaleKey,
  onClick,
  disabled = false,
  type = 'submit',
  className
}) => {
  const textValue = text || (textLocaleKey ? <Translate str={textLocaleKey} /> : '');
  return (
    <SPrimaryButton
      variant="primary"
      type={type}
      block
      disabled={disabled}
      onClick={onClick}
      className={cn(className)}
    >
      {textValue}
    </SPrimaryButton>
  );
};

export default PrimarySubmitButton;
