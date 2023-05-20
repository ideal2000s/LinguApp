import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SChoiceAnswerContainer = styled.div`
  min-height: 54px;
  border-radius: 6px;
  background: #e6e6f077;
  position: relative;

  padding: 18px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  ${customMediaQuery('desktop')} {
    min-height: 76px;
    margin-bottom: 0.75rem;
  }

  label {
    font-family: ${({ theme }) => theme.linguTextFontFamily};
    font-weight: 500;
    font-size: 1rem;
    line-height: 1rem;

    ${customMediaQuery('desktop')} {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }
  }

  &:not(.disabled) {
    cursor: pointer;
    label {
      cursor: pointer;
    }

    &:hover,
    &:focus {
      background: #e6e6f0cc;
    }
  }
`;

export default SChoiceAnswerContainer;
