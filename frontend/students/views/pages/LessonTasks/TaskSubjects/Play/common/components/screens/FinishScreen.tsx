import React, { useEffect } from 'react';
import styled from 'styled-components';
import { t, Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { withFade2 } from 'students/views/shared/HOCs';
import { NextButton } from 'students/views/shared/components/Buttons';
import { usePlayAudioPlayer } from '../../hooks';
import { setFinishButtonPosition } from 'students/views/shared/bundles/bubbleAnimationManager';

interface IProps {
  isCompleting: boolean;
  onFinish: () => void;
}
const FinishScreen: React.FC<IProps> = ({ isCompleting, onFinish }) => {
  const { playFinishSound } = usePlayAudioPlayer();

  useEffect(() => {
    playFinishSound();
  }, [playFinishSound]);

  const handleFinish = (e: React.MouseEvent<HTMLElement>) => {
    const viewportOffset = e.currentTarget.getBoundingClientRect();
    setFinishButtonPosition(
      viewportOffset.left,
      viewportOffset.top,
      e.currentTarget.offsetWidth,
      e.currentTarget.offsetHeight
    );
    onFinish();
  };

  return (
    <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
      <SHeading>
        <Translate str="frontend.lesson_task.tasks.play.finish_screen.go_to_next_exercise" />
      </SHeading>
      <NextButton
        size="100px"
        className="m-0"
        title={t('frontend.lesson_task.finish_button')}
        onClick={handleFinish}
        disabled={isCompleting}
        showSpinner={isCompleting}
      />
    </div>
  );
};

export default withFade2<IProps>({ duration: 800, className: 'd-flex flex-grow-1' })(
  FinishScreen
);
const SHeading = styled.h2`
  color: #fbfcff;
  margin: 0 0 50px;
  padding: 0;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.625rem;
  text-align: center;

  ${customMediaQuery('tablet')} {
    font-size: 2.375rem;
    line-height: 3.125rem;
    margin: 0 0 90px;
  }
`;
