import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';
import background from '../assets/bg-image.png';
import backgroundWebp from '../assets/bg-image.webp';

const PAGINATION_HEIGHT = '68px';

export const Container = styled.div`
  padding: 16px;

  ${customMediaQuery('mobile')} {
    background: linear-gradient(180deg, #26989b 0%, #82cdaf 100%);
  }
  .no-webp & {
    background: url(${background}) center,
      linear-gradient(180deg, #26989b 0%, #82cdaf 100%),
      linear-gradient(180deg, #c7367d 0%, #e467a2 100%);
  }
  .webp & {
    background: url(${backgroundWebp}) center,
      linear-gradient(180deg, #26989b 0%, #82cdaf 100%),
      linear-gradient(180deg, #c7367d 0%, #e467a2 100%);
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

export const SPaginationContainer = styled.div`
  bottom: 16px;
  position: absolute;
  height: ${PAGINATION_HEIGHT};
  z-index: 999;
`;

export const SViewport = styled.div`
  width: 100%;
  height: calc(100% - ${PAGINATION_HEIGHT});
  max-width: 550px;
  max-height: 650px;
  position: relative;
  margin-bottom: ${PAGINATION_HEIGHT};
`;
