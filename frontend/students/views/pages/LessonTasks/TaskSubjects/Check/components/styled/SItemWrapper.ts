import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SItemWrapper = styled.div`
  margin-bottom: 1.75rem;

  ${customMediaQuery('desktop')} {
    margin-bottom: 2rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default SItemWrapper;
