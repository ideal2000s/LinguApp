import styled from 'styled-components';

const STaskTitle = styled.h1<{ extraSpace: boolean }>`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-style: normal;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-bottom: ${({ extraSpace }) => (extraSpace ? '2.375rem' : '0.5rem')};
  color: #2d2d3a;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.875rem;
    line-height: 2.3125rem;
    margin-bottom: ${({ extraSpace }) => (extraSpace ? '2rem' : '1.25rem')};
  }
`;

export default STaskTitle;
