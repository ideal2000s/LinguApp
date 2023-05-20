import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { customMediaQuery } from 'students/views/shared/styled';

export const SFaddedText = styled.span`
  color: ${({ theme }) => theme.linguGrey};
`;

export const SArticle = styled.article`
  font-family: ${({ theme }) => theme.linguFontFamily};
  padding: 1.5rem 1.875rem;
  min-width: 18.75rem;

  ${customMediaQuery('tablet')} {
    padding: 2.75rem 1.75rem;
  }
`;

export const SHeader = styled.h1`
  font-size: 1.25rem;
  line-height: 2.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;

  ${customMediaQuery('tablet')} {
    font-size: 1.75rem;
  }
`;

export const SSubHeader = styled.h2`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 1.5rem;

  ${customMediaQuery('tablet')} {
    margin-bottom: 3.25rem;
  }
`;

export const SFooter = styled.div`
  font-family: 'Inter', 'Product Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: normal;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const SFooterButton = styled(Button)<{ color: string }>`
  text-decoration: none;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: ${({ color }) => color};
  }

  div {
    margin-right: 8px;
  }
`;

export const SFormControl = styled(Form.Control)`
  border-radius: 10px;
  min-height: 3.5rem;
  margin-bottom: 1.25rem;
  border-color: #e6e6f0;
`;

export const SFormControlFeedback = styled(Form.Control.Feedback)`
  margin-top: -1.25rem;
  margin-bottom: 1.25rem;
`;

export const SFormGroup = styled(Form.Group)``;

export const SOtpInputWrapper = styled.div`
  margin-bottom: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .otp-container {
  }

  .otp-input {
    border: 1px solid #e6e6f0;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.5rem;
    color: #2d2d3a;
    width: 44px !important;
    height: 46px;
    margin: 5px;
    padding: 12px;

    ${customMediaQuery('tablet')} {
      width: 60px !important;
      height: 66px;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #2d2d3a;
    }
  }
`;
