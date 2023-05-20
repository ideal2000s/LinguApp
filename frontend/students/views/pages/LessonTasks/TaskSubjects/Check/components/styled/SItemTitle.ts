import styled from 'styled-components';

const SItemTitle = styled.h3`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-style: normal;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.5rem;
  margin-bottom: 0.75rem;
  color: #2d2d3a;
  letter-spacing: -0.01em;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin-bottom: 1rem;
    font-size: 1.625rem;
    line-height: 2.25rem;
  }
`;

export default SItemTitle;
