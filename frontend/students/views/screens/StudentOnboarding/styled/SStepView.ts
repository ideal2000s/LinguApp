import styled from 'styled-components';

const SStepView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px 20px 160px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    height: 100%;
    justify-content: center;
    flex-grow: 1;
  }
`;
export default SStepView;
