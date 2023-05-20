import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { t } from 'i18n';
import CircleButton from '../CircleButton';
import { styleInnerButton } from '../ButtonGeneral/ButtonGeneral';

type IProps = {
  className?: string;
  onNext: () => void;
};

const SkipItemButton: React.FC<IProps> = ({ className, onNext }) => {
  const handleClick = () => {
    onNext();
  };

  return (
    <SButton
      onClick={handleClick}
      size="36px"
      title={t('frontend.lesson_task.check.navigation_skip')}
      className={cn(className)}
      bgColor="rgba(0, 0, 0, 0.3);"
      shadowColor="none"
      color="#fff"
    >
      <FontAwesomeIcon className="ml-auto" icon={faArrowRight} />
    </SButton>
  );
};

export default SkipItemButton;

const SButton = styled(CircleButton)`
  color: #ffffff;
  font-size: 20px;

  ${styleInnerButton()} {
    padding: 0 10px;
  }
`;
