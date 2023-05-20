import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';

interface IProps {
  fullNameLocaleKey?: string;
  providerName?: string;
  logo: string;
  fallbackLogo: string;
  link?: string;
  className?: string;
  onClick?: (link?: string) => void;
}
const SocialButton: React.FC<IProps> = ({
  providerName,
  fullNameLocaleKey,
  logo,
  fallbackLogo,
  link,
  className,
  onClick
}) => {
  const handleClick = () => {
    onClick && onClick(link);
  };

  const text = fullNameLocaleKey ? (
    <Translate str={fullNameLocaleKey} />
  ) : (
    <Translate
      str="frontend.auth.continue_with_provider"
      params={{ provider: providerName }}
    />
  );
  return (
    <SSocialButton
      variant="outline-primary"
      className={cn('w-100', className)}
      onClick={handleClick}
    >
      <picture>
        <source srcSet={logo} type="image/webp" />
        <SLogo src={fallbackLogo} alt={providerName} />
      </picture>
      <SButtonText>{text}</SButtonText>
    </SSocialButton>
  );
};

export default SocialButton;

const SLogo = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  display: block;
  margin-right: 1rem;
  position: absolute;
  top: 10px;
  left: 10px;

  ${customMediaQuery('desktop')} {
    width: 2rem;
    height: 2rem;
  }
`;

const SSocialButton = styled(Button)`
  border-color: #e6e6f0;
  border-width: 2px;
  border-radius: 0.875rem;
  min-height: 3.5rem;
  color: #2d2d3a;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.25rem;
  padding: 0.875rem;
  display: flex;
  align-items: center;
  position: relative;

  &:focus,
  &:active,
  &:hover {
    background-color: white !important;
    color: #2d2d3a !important;
  }
`;

const SButtonText = styled.div`
  text-align: center;
  flex-grow: 1;
`;
