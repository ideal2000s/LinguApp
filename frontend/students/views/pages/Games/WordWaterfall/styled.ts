import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

export const wordPadding = {
  horizontal: 20,
  vertical: 15
};

export const BackgroundDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  ${customMediaQuery('tablet')} {
    top: auto;
  }
  .gradient-background {
    z-index: 1;
  }
  .circle-gradient {
    z-index: 2;
    display: none;
  }
  .green {
    background: linear-gradient(180deg, #6944af 0%, #3ec2b9 100%), #c4c4c4;
    ${customMediaQuery('tablet')} {
      background: linear-gradient(180deg, #6944af 0%, #3ec2b9 100%), #ffffff;
    }
  }
  .blue {
    background: linear-gradient(180deg, #6944af 0%, #65aadc 100%), #c4c4c4;
    ${customMediaQuery('tablet')} {
      background: linear-gradient(180deg, #6944af 0%, #65aadc 100%),
        linear-gradient(180deg, #6944af 0%, #3ec2b9 100%), #ffffff;
    }
  }
  .orange {
    background: linear-gradient(180deg, #6944af 0%, #fdc49b 100%),
      linear-gradient(180deg, #6944af 0%, #3ec2b9 100%), #c4c4c4;
    ${customMediaQuery('tablet')} {
      background: linear-gradient(180deg, #6944af 0%, #fdc49b 100%),
        linear-gradient(180deg, #6944af 0%, #3ec2b9 100%), #ffffff;
    }
  }
  .pink {
    background: linear-gradient(180deg, #6944af 0%, #ffb6be 100%), #c4c4c4;
    ${customMediaQuery('tablet')} {
      background: linear-gradient(180deg, #6944af 0%, #ffb6be 100%),
        linear-gradient(180deg, #6944af 0%, #3ec2b9 100%), #ffffff;
    }
  }
  .yellow {
    background: linear-gradient(180deg, #6944af 0%, #ffed8f 100%), #c4c4c4;
    ${customMediaQuery('tablet')} {
      background: linear-gradient(180deg, #6944af 0%, #ffed8f 100%),
        linear-gradient(180deg, #6944af 0%, #ffb6be 100%),
        linear-gradient(180deg, #6944af 0%, #3ec2b9 100%), #ffffff;
    }
  }
`;

export const BackgroundImage = styled.div<{ $topIndent: number }>`
  display: none;

  ${customMediaQuery('tablet')} {
    width: 100vw;
    height: ${({ $topIndent }) => `calc(100vh + ${$topIndent}px)`};
    position: relative;
    z-index: 3;
    display: block;
  }
`;

export const StretchingDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const Container = styled.div`
  text-align: center;
  position: relative;
  overflow: hidden;

  .foreground-wrapper {
    position: absolute;
    z-index: 5;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding-bottom: 100px;
    box-sizing: border-box;
    ${customMediaQuery('tablet')} {
      padding-bottom: 0;
      box-sizing: content-box;
    }
  }
  .title-heading {
    font-weight: bold;
    color: #fbfcff;
    font-size: 46px;
    line-height: 110%;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    ${customMediaQuery('tablet')} {
      font-size: 48px;
      line-height: 130%;
      text-shadow: none;
    }
  }
  .subtitle-heading {
    font-weight: bold;
    color: #fbfcff;
    margin: 0 0.5rem 1rem;
    font-size: 38px;
    line-height: 91.02%;

    ${customMediaQuery('tablet')} {
      font-size: 44px;
      line-height: 55px;
      margin-top: 0;
    }

    &.final-message {
      max-width: 450px;
    }
  }
  .desc-heading {
    margin-top: 30px;
    font-weight: bold;
    font-size: 24px;
    line-height: 120%;
    color: #fbfcff;
  }
  .sub-heading {
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    color: #fbfcff;
    opacity: 0.5;
    margin-top: 0.5rem;
    ${customMediaQuery('tablet')} {
      font-size: 26px;
      line-height: 30px;
    }
  }
  .right-arrow-wrapper {
    display: inline-block;
    border-radius: 50%;
    background-color: #fff;
    padding: 1.5rem;
    box-shadow: 0px 4px 0px rgba(53, 34, 108, 0.3);
    cursor: pointer;
  }
  .question-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    ${customMediaQuery('mobile')} {
      margin-top: 0px;
    }
  }
  .words-wrapper {
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    .word-block {
      padding: ${wordPadding.vertical}px ${wordPadding.horizontal}px;
      border-radius: 10px;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      position: absolute;
      color: #252121;
      z-index: 9;
      opacity: 0;
      cursor: pointer;
      &.yellow {
        background: #f3eeb4;
      }
      &.orange {
        background: #fdc49b;
      }
      &.pink {
        background: #ffcad0;
      }
      &.blue {
        background: #93b9ff;
      }
      &.green {
        background: #91eae4;
      }
      &.clicked {
        display: none;
      }
      ${customMediaQuery('tablet')} {
        font-size: 20px;
        line-height: 24px;
      }
      &:before {
        position: absolute;
        content: '';
        top: -16px;
        right: -16px;
        left: -16px;
        bottom: -16px;
      }
    }
  }
  .game-progress-bar {
    position: absolute;
    z-index: 7;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);

    ${customMediaQuery('tablet')} {
      bottom: 22px;
    }
  }
`;
