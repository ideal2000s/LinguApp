import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SImg = styled.img`
  border-radius: 14px;
  width: 100%;

  ${customMediaQuery('tablet')} {
    height: auto !important;
    width: 100% !important;
  }
  ${customMediaQuery('tablet')} {
    height: 100% !important;
    width: auto !important;
  }
`;

export default SImg;
