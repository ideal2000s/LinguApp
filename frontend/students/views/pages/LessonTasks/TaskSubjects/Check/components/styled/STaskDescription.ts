import styled from 'styled-components';

const STaskDescription = styled.h3`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 2.375rem;
  color: rgba(45, 45, 58, 0.8);

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin-bottom: 2rem;
    font-size: 1.375rem;
    line-height: 2.1875rem;
  }
`;

export default STaskDescription;
