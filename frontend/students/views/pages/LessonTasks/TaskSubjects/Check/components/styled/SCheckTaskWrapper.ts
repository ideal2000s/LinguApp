import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SCheckTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 920px;

  ${customMediaQuery('desktop')} {
    margin: 40px 0 30px;
    align-items: center;
    align-self: center;
  }
`;

export default SCheckTaskWrapper;
