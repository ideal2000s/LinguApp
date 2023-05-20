import React from 'react';
import styled from 'styled-components';
import ProgressButton from 'students/views/shared/components/ProgressButton';

interface IProps {
  progress?: number;
  onNextClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const OnboardingFooter: React.FC<IProps> = ({ progress, onNextClick }) => {
  return (
    <SFooter>
      <SProgressButton progress={progress} onClick={onNextClick} />
    </SFooter>
  );
};

export default OnboardingFooter;

const SFooter = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 0;
  background: linear-gradient(0deg, #0094c5ff 0%, #0094c5bb 70%, #0094c500 100%); ;
`;

const SProgressButton = styled(ProgressButton)`
  align-self: center;
`;
