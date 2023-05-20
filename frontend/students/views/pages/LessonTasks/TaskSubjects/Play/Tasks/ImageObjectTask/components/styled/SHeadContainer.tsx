import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SHeadContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  overflow: hidden;

  ${customMediaQuery('mobile')} {
    flex-grow: 1;
  }
`;

export default SHeadContainer;
