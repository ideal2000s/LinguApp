import React from 'react';
import { Alert as BAlert, AlertProps } from 'react-bootstrap';
import { Translate } from 'i18n';

interface IProps extends AlertProps {
  textLocaleKey?: string;
}
const Alert: React.FC<IProps> = ({ textLocaleKey, children, ...props }) => {
  const value = textLocaleKey ? <Translate str={textLocaleKey} /> : children;
  return <BAlert {...props}>{value}</BAlert>;
};

export default Alert;
