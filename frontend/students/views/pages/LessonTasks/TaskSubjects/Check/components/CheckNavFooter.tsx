import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Translate } from 'i18n';
import { SPrimaryButton, STransparentButton } from 'students/views/shared/styled/SButton';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { Spinner } from 'students/views/shared/components/Spinner';
import ArrowRightIcon from 'students/views/shared/assets/icons/arrow_right_icon.svg';
import { customMediaQuery } from 'students/views/shared/styled';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';

interface IProps {
  onNext?: () => void;
  onSkip?: () => void;
  // onPrev: () => void;
  isCompleting: boolean;
}
const CheckNavFooter: FC<IProps> = ({ onNext, onSkip, isCompleting }) => {
  const [nextBtnCompleting, setNextBtnCompleting] = useState<boolean>(false);
  const [skipBtnCompleting, setSkipBtnCompleting] = useState<boolean>(false);

  useEffect(() => {
    if (!isCompleting) {
      setNextBtnCompleting(false);
      setSkipBtnCompleting(false);
    }
  }, [isCompleting]);

  const handleNext = () => {
    onNext?.();
    setNextBtnCompleting(true);
  };

  const handleSkip = () => {
    onSkip?.();
    setSkipBtnCompleting(true);
  };

  const renderNextBtnContent = () =>
    nextBtnCompleting ? (
      <Spinner />
    ) : (
      <>
        <Translate str="frontend.lesson_task.check.navigation_next" />

        <SIcon url={ArrowRightIcon} height="1.5rem" width="1.5rem" color="#ffffff" />
      </>
    );

  const renderSkipBtnContent = () =>
    skipBtnCompleting ? (
      <Spinner />
    ) : (
      <Translate str="frontend.lesson_task.check.navigation_skip" />
    );

  return (
    <SCheckNavFooter className="row">
      {/* <SButtonWrapper className="d-flex col-md-3 col-sm-4 p-md-1 p-sm-0 justify-content-end">
        <SSecondaryBtn onClick={onPrev}>
          <T str="frontend.lesson_task.check.navigation_previous" />
        </SSecondaryBtn>
      </SButtonWrapper> */}

      {onSkip ? (
        <SButtonWrapper>
          <SSecondaryBtn disabled={isCompleting} onClick={handleSkip}>
            {renderSkipBtnContent()}
          </SSecondaryBtn>
        </SButtonWrapper>
      ) : null}

      {onNext ? (
        <SButtonWrapper>
          <SPrimaryBtn disabled={isCompleting} onClick={handleNext}>
            {renderNextBtnContent()}
          </SPrimaryBtn>
        </SButtonWrapper>
      ) : null}
    </SCheckNavFooter>
  );
};

export default CheckNavFooter;

const SCheckNavFooter = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  & > div {
    margin: 0 7.5px;
  }

  ${customMediaQuery('tablet')} {
    & > div {
      margin: 0 16px;
    }
  }
`;

const SPrimaryBtn = styled(SPrimaryButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  ${styleInnerButton()} {
    padding: 0 2rem;
  }
`;

const SSecondaryBtn = styled(STransparentButton)`
  font-weight: 400;
  ${styleInnerButton()} {
    padding: 0 2rem;
  }
`;

const SButtonWrapper = styled.div`
  & > * {
    min-height: 3.75rem;

    ${customMediaQuery('tablet')} {
      width: 100%;
      min-width: 180px;
    }
  }
`;

export const SIcon = styled(UrlIcon)`
  margin-left: 1.4rem;
  margin-right: -1rem;

  ${customMediaQuery('tablet')} {
    margin-left: 0.75rem;
    margin-right: 0;
  }
`;
