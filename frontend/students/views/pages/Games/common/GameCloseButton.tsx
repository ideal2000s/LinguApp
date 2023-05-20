import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  ICircle,
  SCircleButton
} from 'students/views/shared/components/CircleButton/CircleButton';

interface IProps extends ICircle {
  onTap: () => void;
}

const GameCloseButton: React.FC<IProps> = ({
  onTap,
  onClick,
  size,
  disabled,
  className,
  title
}) => {
  return (
    <SCloseButton
      as={motion.button}
      onTap={onTap}
      size={size}
      shadowColor="none"
      onClick={onClick}
      bgColor="transparent"
      disabled={disabled}
      className={cn(className)}
      title={title}
    >
      <svg
        width="88"
        height="89"
        viewBox="0 0 88 89"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44 88.6953C68.3005 88.6953 88 68.9958 88 44.6953C88 20.3948 68.3005 0.695312 44 0.695312C19.6995 0.695312 0 20.3948 0 44.6953C0 68.9958 19.6995 88.6953 44 88.6953ZM29.3114 26.3139C30.0896 25.5542 31.3515 25.5542 32.1297 26.3139L43.9992 38.1834L55.8687 26.3139C56.6469 25.5542 57.9088 25.5542 58.687 26.3139L61.5053 29.0652C62.2835 29.8249 62.2835 31.0566 61.5053 31.8164L49.5687 43.7529L61.5276 55.7118C62.2797 56.4907 62.2771 57.7467 61.52 58.5223L58.7688 61.3405C58.0091 62.1187 56.7773 62.119 56.0176 61.3408L43.9992 49.3224L31.9809 61.3408C31.2211 62.119 29.9894 62.1187 29.2297 61.3405L26.4784 58.5223C25.7213 57.7467 25.7187 56.4907 26.4708 55.7118L38.4297 43.7529L26.4931 31.8164C25.7149 31.0566 25.7149 29.8248 26.4931 29.0651L29.3114 26.3139Z"
          fill="white"
        />
      </svg>
    </SCloseButton>
  );
};

const SCloseButton = styled(SCircleButton)`
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default GameCloseButton;
