import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-grow: 1;

  ${customMediaQuery('mobile')} {
    justify-content: flex-start;
  }
`;

export default SItemContainer;
