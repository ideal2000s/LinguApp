import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';

const SImgContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: auto;
  max-height: none;

  ${customMediaQuery('tablet')} {
    position: relative;
    height: auto !important;
    width: 100% !important;
  }
  ${customMediaQuery('tablet')} {
    position: relative;
    height: 100% !important;
    width: auto !important;
  }
`;

export default SImgContainer;
