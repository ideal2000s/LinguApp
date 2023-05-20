import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';
import background from './assets/bg-image.png';
import backgroundWebp from './assets/bg-image.webp';

export const Container = styled.div`
  ${customMediaQuery('mobile')} {
    background: linear-gradient(180deg, #005c97 0%, #0d0e4e 100%);
  }
  .no-webp & {
    background: url(${background}) center,
      linear-gradient(180deg, #064f92 0%, #0d0e4e 100%);
  }
  .webp & {
    background: url(${backgroundWebp}) center,
      linear-gradient(180deg, #064f92 0%, #0d0e4e 100%);
  }
`;

export const SuccessText = styled.p`
  font-weight: bold;
  font-size: 44px;
  line-height: 55px;
  color: #fbfcff;
  max-width: 500px;
  ${customMediaQuery('mobile')} {
    font-size: 30px;
    line-height: 37px;
  }
`;
