import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';
import background from './assets/background.svg';

export const Container = styled.div`
  background: linear-gradient(180deg, #0ca2cc 0%, #4dc1e2 35.42%, #0790c0 100%);
  ${customMediaQuery('tablet')} {
    background: url(${background}) center/cover,
      linear-gradient(180deg, #58bbd8 19.79%, #1086b0 100%);
  }
`;
