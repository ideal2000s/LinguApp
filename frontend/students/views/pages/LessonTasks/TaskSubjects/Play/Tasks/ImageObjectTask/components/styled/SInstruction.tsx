import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SInstruction = styled.div`
  position: absolute;
  width: 85vw;
  display: flex;
  font-size: 1.25rem;
  align-items: center;
  justify-content: center;

  ${customMediaQuery('tablet')} {
    width: 65vw;
    font-size: 1.5rem;
  }
`;

export default SInstruction;
