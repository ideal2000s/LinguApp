import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SBodyContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  border-radius: 14px;
  width: 100%;
  max-width: 90vw;
  overflow: auto;

  ${customMediaQuery('tablet')} {
    width: auto !important;
    height: auto;
  }
  ${customMediaQuery('tablet')} {
    height: 472px;
  }

  ${customMediaQuery('mobile')} {
    width: 90vw;
    height: 100%;
    justify-content: center;
    max-height: none;
    max-width: 100vw;
    flex-grow: 4;
    scroll-behavior: smooth;
    margin-bottom: -2rem;
  }
`;

export default SBodyContainer;
